/*****************************************************************************
 * Import package                                                            *
 *****************************************************************************/
import express = require ('express');
import {Request, Response} from 'express';
const cors = require('cors');
const history = require('connect-history-api-fallback');
import crypto = require("crypto")
import {Connection, FieldInfo, MysqlError, OkPacket, Pool} from "mysql";
import mysql = require ("mysql");      // handles database connections
import session = require ("cookie-session");

// import models
import {User} from './models/user';

const database: Pool = mysql.createPool({
    connectionLimit: 5,
    //online
    host: 'sql733.main-hosting.eu',
    user: 'u468072002_mycargonaut',
    password: 'mycargonautThmKms2022',
    database: 'u468072002_mycargonaut',
    multipleStatements: true,
});

/*****************************************************************************
 * Define and start web-app server, define json-Parser                       *
 *****************************************************************************/
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(history());
let server = app.listen(port, () => {
    console.log('Server started');
    //---- connect to database ----------------------------------------------------
    database.getConnection((err: MysqlError) => {
        if (err) {
            console.log('Database connection failed: ', err);
        } else {
            console.log('Database is connected');
            console.log('Server started.\nOpen Local under: http://localhost:3001')
        }
    });
});
app.use(express.json());
/*****************************************************************************
 * session management configuration                                          *
 *****************************************************************************/
app.use(session({
    // save session even if not modified
    //resave: true,
    // save session even if not used
    //saveUninitialized: true,
    // forces cookie set on every response needed to set expiration (maxAge)
    //rolling: true,
    // encrypt session-id in cookie using "secret" as modifier
    secret: "geheim",
    // name of the cookie set is set by the server
    name: "mySessionCookie",
    // set some cookie-attributes. Here expiration-date (offset in ms)
    //cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true}
}));

declare module 'express-session' {
    interface SessionData {
        user: User
    }
}

/*****************************************************************************
 * STATIC ROUTES                                                             *
 *****************************************************************************/
const basedir: string = __dirname + '/../..';  // get rid of /backend/src
app.use('/', express.static(basedir + '/frontend/build'));

/*****************************************************************************
 * Routes for chats                                                          *
 *****************************************************************************/

// Get own chats
app.get('/chats', (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT m.message_id AS chat_id, m.chat_session_id, u1.first_name AS sender_first_name, u1.last_name AS sender_last_name, u2.first_name AS receiver_first_name, u2.last_name AS receiver_last_name, u2.user_id AS partnerId FROM ( SELECT LEAST(sender_id, receiver_id) AS user_id1, GREATEST(sender_id, receiver_id) AS user_id2 FROM messages WHERE sender_id = ? OR receiver_id = ? ) c JOIN messages m ON m.sender_id = c.user_id1 AND m.receiver_id = c.user_id2 JOIN User u1 ON c.user_id1 = u1.user_id JOIN User u2 ON c.user_id2 = u2.user_id GROUP BY m.chat_session_id;"
    const data : [number, number] = [req.session.user.uId, req.session.user.uId]
    database.query(query, data, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {

            const chats = rows.map(row => row = {
                chatId: row.chat_session_id,
                partnerId: row.partnerId,
                chatPartner: row.receiver_first_name + ' ' + row.receiver_last_name,
            });
                res.status(200).send({
                    chats,
                    message: 'Successfully requested Ride'
                });
        }
    });
});

// Get own chats
app.post('/chat', (req: Request, res: Response) => {
    // Create database query and id
    let chatSessionId = req.body.sessionId.toString()
    //if empty, generate new sessionID
    if (chatSessionId===""){
        chatSessionId = Math.random().toString().slice(2,11);
    }
    const message = req.body.message
    const receiverId:number = +req.body.receiverId

    const query: string = "INSERT INTO `messages` (`message_id`, `chat_session_id`, `sender_id`, `receiver_id`, `message`, `created_at`) VALUES (NULL, ?, ?, ?, ?, NOW())"
    const data : [string, number, number, string, ] = [chatSessionId, req.session.user.uId, receiverId, message]
    database.query(query, data, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully send Message'
            });
        }
    });
});

// Get single chat by id
app.get('/chat/:id', (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT m.message_id AS chat_id, m.chat_session_id, m.message, m.created_at, u1.user_id AS sender_id, u1.first_name AS sender_first_name, u1.last_name AS sender_last_name, u2.user_id AS receiver_id, u2.first_name AS receiver_first_name, u2.last_name AS receiver_last_name FROM messages m JOIN User u1 ON m.sender_id = u1.user_id JOIN User u2 ON m.receiver_id = u2.user_id WHERE m.chat_session_id = ? ORDER BY m.created_at ASC;"

    database.query(query, req.params.id, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {

            const messages = rows.map(row => row = {
                chatId: row.chat_session_id,
                youId: row.sender_id,
                partnerId: row.receiver_id,
                chatPartner: row.sender_first_name + ' ' + row.sender_last_name,
                message: row.message,
                date: row.created_at
            });
                res.status(200).send({
                    messages,
                    message: 'Successfully requested Ride'
                });
        }
    });
});

/*****************************************************************************
 * Routes for rides                                                          *
 *****************************************************************************/

// Get single ride
app.get('/rides/:id', (req: Request, res: Response) => {
    // Create database query and id
    // const query: string = "SELECT * FROM Ride WHERE ride_id = ?"
   const query: string = " SELECT `Ride`.*, `Ride`.`ride_id`, `Vehicle`.* FROM `Ride` LEFT JOIN `Vehicle` ON `Ride`.`vehicle_id` = `Vehicle`.`vehicle_id` WHERE ride_id = ?"


    database.query(query, req.params.id, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            if (rows.length === 1){
                const ride = {
                    rideId: rows[0].ride_id,
                    driverId: rows[0].driver_id,
                    vehicleId: rows[0].vehicle_id,
                    vehicleImage: rows[0].car_image,
                    vehicleSeats: rows[0].seats,
                    vehicleStorage: rows[0].storage,
                    start: rows[0].start,
                    destination: rows[0].destination,
                    dateTime: rows[0].dateTime,
                    price: rows[0].price,
                    description: rows[0].description,
                    open: rows[0].open,
                    posLongitude: rows[0].pos_long,
                    posLatitude: rows[0].pos_lat
                };

                res.status(200).send({
                    ride,
                    message: 'Successfully requested Ride'
                });
            } else {
                res.status(404).send({
                    message: 'Cannot resolve Ride'
                });
            }
        }
    });
});

// Get all rides
app.get('/rides', (req: Request, res: Response) => {
    // Create database query
    const query: string = "SELECT `Ride`.*, `User`.*, `Vehicle`.* FROM `Ride` LEFT JOIN `User` ON `Ride`.`driver_id` = `User`.`user_id` LEFT JOIN `Vehicle` ON `Vehicle`.`user_id` = `User`.`user_id`;"


    database.query(query, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            const rideList = rows.map(row => row = {
                rideId: row.ride_id,
                driverId: row.driver_id,
                vehicleId: row.vehicle_id,
                start: row.start,
                destination: row.destination,
                dateTime: row.dateTime,
                price: row.price,
                description: row.description,
                open: row.open,
                posLongitude: row.pos_long,
                posLatitude: row.pos_lat,
                driverImage: row.profile_picture,
                driverName: row.first_name+' '+row.last_name,
                vehicleSeats: row.seats,
                vehicleStorage: row.storage,
                vehicleImage: row.car_image
            });

            res.status(200).send({
                rideList,
                message: 'Successfully requested Rides'
            });
        }
    });
});

// Create new ride
app.post('/rides', isLoggedIn(), (req: Request, res: Response) => {
    // Permission checking
    if (req.session.user.uId !== req.body.driverId && req.session.user.groupId > 2) {
        res.status(403).send({
            message: 'You are not allowed to create a ride for another user'
        });
        return;
    }

    // Create database query and data
    const query: string = "INSERT INTO Ride (driver_id, vehicle_id, start, destination, dateTime, price, description, open, pos_long, pos_lat) VALUES (?, ?, ?, ?, ?, ?, ?, true, null, null)"
    const { driverId, vehicleId, start, destination, dateTime, price, description } = req.body
    const data = [ driverId, vehicleId, start, destination, dateTime, price, description ]

    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully created Ride'
            });
        }
    });
});

// Update ride
app.put('/rides/:id', isLoggedIn(), (req: Request, res: Response) => {
    // Permission checking
    if (req.session.user.uId !== req.body.driverId && req.session.user.groupId > 2) {
        res.status(403).send({
            message: 'You are not allowed to update a ride for another user'
        });
        return;
    }

    // Create database query and data
    const query: string = "UPDATE Ride SET driver_id = ?, vehicle_id = ?, start = ?, destination = ?, dateTime = ?, price = ?, description = ?, open = ?, pos_long = ?, pos_lat = ? WHERE ride_id = ?"
    const { driverId, vehicleId, start, destination, dateTime, price, description, open, posLongitude, posLatitude } = req.body
    const data = [ driverId, vehicleId, start, destination, dateTime, price, description, open, posLongitude, posLatitude, req.params.id ]

    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully updated Ride'
            });
        }
    });
});

// Delete ride
app.delete('/rides/:id', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "DELETE FROM Ride WHERE ride_id = ?"

    database.query(query, req.params.id, (err: MysqlError, rows: any) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully deleted Ride'
            });
        }
    });
});

/*****************************************************************************
 * Routes for bookings                                                       *
 *****************************************************************************/


// Get single booking
app.get('/bookings/:id', (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT * FROM booking WHERE booking_id = ?"

    database.query(query, req.params.id, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            if (rows.length === 1) {
                const booking = rows.map(row => row = {
                    bookingId: row.booking_id,
                    customerId: row.customer_id,
                    rideId: row.ride_id,
                    status: row.status,
                    rating: row.rating,
                    comment: row.comment
                });

                res.status(200).send({
                    booking,
                    message: 'Successfully requested Bookings'
                });
            } else {
                res.status(404).send({
                    message: 'Cannot resolve Ride'
                });
            }
        }
    });
});

//Get bookinIds where userId
app.get('/bookedRides', (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT `ride_id` FROM `booking` WHERE `customer_id` = ?"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {

                const booking_rideIds =[];
                for (const row of rows){
                    booking_rideIds.push(row.ride_id)
                }
                res.status(200).send({
                    booking_rideIds,
                    message: 'Successfully requested Bookings'
                });

        }
    });
});

// Get bookings for customer
app.get('/profile/bookings', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT `booking`.*, `booking`.`ride_id`, `Ride`.* FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` WHERE `booking`.`status` = 4 AND `booking`.`customer_id` = ?;"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            const bookingList = rows.map(row => row = {
                bookingId: row.booking_id,
                customerId: row.customer_id,
                rideId: row.ride_id,
                status: row.status,
                rating: row.rating,
                comment: row.comment,
                start: row.start,
                destination: row.destination
            });

            res.status(200).send({
                bookingList,
                message: 'Successfully requested Bookings'
            });
        }
    });
});

// Get booking requests for ride
app.get('/rides/:id/bookings', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT * FROM booking WHERE ride_id = ?"

    database.query(query, req.params.id, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            const bookingList = rows.map(row => row = {
                bookingId: row.booking_id,
                customerId: row.customer_id,
                rideId: row.ride_id,
                status: row.status,
                rating: row.rating,
                comment: row.comment
            });

            res.status(200).send({
                bookingList,
                message: 'Successfully requested Bookings'
            });
        }
    });
});

// Create new booking
app.post('/bookings', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const query: string = "INSERT INTO booking (customer_id, ride_id, status, rating, comment) VALUES (?, ?, ?, NULL, NULL)"
    const {rideId} = req.body
    const data = [ req.session.user.uId, rideId, 1 ]

    database.query(query, data, (err, rows) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully created Booking'
            });
        }
    });
});

// Update booking
app.put('/bookings/:id', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const query: string = "UPDATE booking SET customer_id = ?, ride_id = ?, status = ?, rating = ?, comment = ? WHERE booking_id = ?"
    const { customerId, rideId, status, rating, comment } = req.body
    const data = [ customerId, rideId, status, rating, comment, req.params.id ]

    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully updated Booking'
            });
        }
    });
});

// Delete booking
app.delete('/bookings/:id', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "DELETE FROM booking WHERE booking_id = ?"

    database.query(query, req.params.id, (err: MysqlError, rows: any) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully deleted Booking'
            });
        }
    });
});

/*****************************************************************************
 * Routes for rating                                                         *
 *****************************************************************************/

// Get bookings where user can rate
app.get('/rateable', (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT `booking`.*, `booking`.`customer_id`, `booking`.`rating`, `booking`.`status`, `Ride`.*, User.* FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN User ON Ride.driver_id = User.user_id WHERE `booking`.`customer_id` = ? AND `booking`.`rating`IS NULL AND `booking`.`status` = '5';"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
                const rateables = rows.map(row => row = {
                    bookingId : row.booking_id,
                    rideId: row.ride_id,
                    driverId: row.driver_id,
                    start: row.start,
                    destination: row.destionation,
                    driverName: row.first_name + ' ' + row.last_name
                });

                res.status(200).send({
                    rateables,
                    message: 'Successfully requested Vehicle'
                });
        }
    });
});


// Update booking comment and rating
app.put('/sendRating', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const query: string = "UPDATE booking SET rating = ?, comment = ? WHERE booking_id = ?"
    const { rating, comment, bookingId } = req.body
    const data = [ rating, comment, bookingId ]

    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully updated Booking'
            });
        }
    });
});

// Update user profile rating
app.put('/updateUserRating', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    //get avg where driver has a rating
    const query: string = "SELECT AVG(booking.rating) AS avg, `booking`.*, `Ride`.`driver_id` FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` WHERE Ride.driver_id = ?"
    const driverId = req.body.driverId
    database.query(query, driverId, (err: MysqlError, rows: any) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            //update user rating avg
            const avg = rows[0].avg
            const queryupdate : string = "UPDATE `User` SET `rating` = ? WHERE `User`.`user_id` = ?"
            const data : [number, number] = [avg, driverId]
            database.query(queryupdate, data, (err: MysqlError, rows: any) => {

                if (err) {
                    // Database operation has failed
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                } else {
                    res.status(200).send({
                        message: 'Successfully update user rating'
                    });
                }
            })
        }
    });
});




/*****************************************************************************
 * Routes for vehicles                                                       *
 *****************************************************************************/

// Get single vehicle
app.get('/vehicles/:id', (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT * FROM Vehicle WHERE vehicle_id = ?"

    database.query(query, req.params.id, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            if (rows.length === 1) {
                const vehicle = rows.map(row => row = {
                    vehicleId: row.vehicle_id,
                    userId: row.user_id,
                    brand: row.brand,
                    model: row.model,
                    seats: row.seats,
                    storage: row.storage,
                    image: row.car_image
                });

                res.status(200).send({
                    vehicle,
                    message: 'Successfully requested Vehicle'
                });
            } else {
                res.status(404).send({
                    message: 'Cannot resolve Vehicle'
                });
            }
        }
    });
});

// Create new vehicle
app.post('/vehicles', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const query: string = "INSERT INTO Vehicle (user_id, brand, model, seats, storage, car_image) VALUES (?, ?, ?, ?, ?, ?)"
    const { brand, model, seats, storage, image } = req.body
    const data = [ req.session.user.uId, brand, model, seats, storage, image ]

    database.query(query, data, (err, rows) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully created Vehicle'
            });
        }
    });
});

// Update vehicle
app.put('/vehicles', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const query: string = "UPDATE Vehicle SET seats = ?, storage = ? WHERE vehicle_id = ?"
    const {seats, storage, vehicleId } = req.body
    const data = [seats, storage, vehicleId ]

    database.query(query, data, (err, rows) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully updated Vehicle'
            });
        }
    });
});

// Delete vehicle
app.delete('/vehicles/:id', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "DELETE FROM Vehicle WHERE vehicle_id = ?"

    database.query(query, req.params.id, (err: MysqlError, rows: any) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully deleted Vehicle'
            });
        }
    });
});

/*****************************************************************************
 * Routes for Tracking                                                       *
 *****************************************************************************/

// Update position of driver where status = 4
app.put('/updatePos', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const rideId = req.body.rideId
    const long = req.body.long
    const lat = req.body.lat

    const query : string = "UPDATE `Ride` SET `pos_long` = ?, `pos_lat` = ? WHERE `Ride`.`ride_id` = ?;"
    const data : [number, number, number] = [long, lat, rideId]

    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            res.status(200).send({
                message: 'Successfully updated Position'
            });
        }
    });
});

// Update status of ride
app.put('/changeStatusRide', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const rideId = req.body.id
    const changeTo = req.body.changeTo
    const bookingId = req.body.bookingId
    console.log('Changeto: '+changeTo)
    console.log('rideId: '+rideId)

    if (changeTo===5){

        const queryride:string='UPDATE `Ride` SET `open` = 0 WHERE `Ride`.`ride_id` = ?;'
        database.query(queryride, rideId, (err: MysqlError, rows: any) => {
            if (err) {
                // Database operation has failed
                res.status(500).send({
                    message: 'Database request failed: ' + err
                });
            }else{
                let query : string = "UPDATE `booking` SET `status` = ? WHERE `booking`.`booking_id` = ?"
                const data : [number, number] = [changeTo, bookingId]

                database.query(query, data, (err: MysqlError, rows: any) => {
                    if (err) {
                        // Database operation has failed
                        res.status(500).send({
                            message: 'Database request failed: ' + err
                        });
                    } else {
                        res.status(200).send({
                            message: 'Successfully changed ride status',
                            changedTo: changeTo
                        });
                    }
                });
            }
        });
    }else{
        let query : string = "UPDATE `booking` SET `status` = ? WHERE `booking`.`booking_id` = ?"
        const data : [number, number] = [changeTo, rideId]

        database.query(query, data, (err: MysqlError, rows: any) => {
            if (err) {
                // Database operation has failed
                res.status(500).send({
                    message: 'Database request failed: ' + err
                });
            } else {
                res.status(200).send({
                    message: 'Successfully changed ride status',
                    changedTo: changeTo
                });
            }
        });
    }


});

// Get active rides
app.get('/activeRides', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT `booking`.*, `Ride`.*, `booking`.`status`, `Ride`.`driver_id` FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` WHERE `booking`.`status` = '4' AND `Ride`.`driver_id` = ?;"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            if (rows.length>0){
                const activeRides =  {
                    bookingId: rows[0].booking_id,
                    customerId: rows[0].customer_id,
                    rideId: rows[0].ride_id,
                    start: rows[0].start,
                    destination: rows[0].destination,
                    customerName: rows[0].first_name + ' ' + rows[0].last_name
                };

                res.status(200).send({
                    activeRides,
                    message: 'Successfully requested Accepted Bookings'
                });
            } else {
                res.status(204).send({
                    message: 'No active rides'
                });
            }
        }
    });
});

// Get rides for driver wehere status = 2
app.get('/ridesAccepted', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT `booking`.*, `Ride`.*, `User`.*, `booking`.`status`, `Ride`.`driver_id` FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `booking`.`status` = '2' AND `Ride`.`driver_id` = ?;"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            const acceptedList = rows.map(row => row = {
                bookingId: row.booking_id,
                customerId: row.customer_id,
                rideId: row.ride_id,
                status: row.status,
                rating: row.rating,
                comment: row.comment,
                start: row.start,
                destination: row.destination,
                customerName: row.first_name + ' ' + row.last_name
            });

            res.status(200).send({
                acceptedList,
                message: 'Successfully requested Accepted Bookings'
            });
        }
    });
});

// Get rides for driver wehere status = 2
app.get('/requestedRides', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT `booking`.*, `Ride`.*, `User`.*, `booking`.`status`, `Ride`.`driver_id` FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `booking`.`status` = '1' AND `Ride`.`driver_id` = ?;"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            const requestList = rows.map(row => row = {
                bookingId: row.booking_id,
                customerId: row.customer_id,
                rideId: row.ride_id,
                status: row.status,
                rating: row.rating,
                comment: row.comment,
                start: row.start,
                destination: row.destination,
                price: row.price,
                customerName: row.first_name + ' ' + row.last_name,
                customerImage: row.profile_picture
            });

            res.status(200).send({
                requestList,
                message: 'Successfully requested  requests'
            });
        }
    });
});


/*****************************************************************************
 * Routes for Profile                                                        *
 *****************************************************************************/

// Get profile
app.get('/profile', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query
    const query: string = "SELECT * FROM User WHERE user_id = ?"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            if (rows.length === 1){
                const user ={
                    uId: rows[0].user_id,
                    name: rows[0].first_name,
                    nachname: rows[0].last_name,
                    loginname: rows[0].loginname,
                    email: rows[0].email,
                    mobilenr: rows[0].mobile_nr,
                    birthdate: rows[0].birthdate,
                    gender: rows[0].gender,
                    address: rows[0].address,
                    profilePicture: rows[0].profile_picture,
                    description: rows[0].description,
                    rating: rows[0].rating,
                    currency: rows[0].currency
                }

                res.status(200).send({
                    user,
                    message: 'Successfully requested user'
                });
            }else{

                res.status(404).send({
                    message: 'Cannot resolve User'
                });
            }
        }
    });
});

// Get only ID of logged in user
app.get('/onlyUserId', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query
    const query: string = "SELECT user_id FROM User WHERE user_id = ?"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            if (rows.length === 1){
                const id = rows[0].user_id

                res.status(200).send({
                    id,
                    message: 'Successfully requested user'
                });
            }else{

                res.status(404).send({
                    message: 'Cannot resolve User'
                });
            }
        }
    });
});

// Get profile by id
app.get('/user/:id', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query
    const query: string = "SELECT * FROM User WHERE user_id = ?"

    database.query(query, req.params.id, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            if (rows.length === 1){
                const user ={
                    uId: rows[0].user_id,
                    name: rows[0].first_name,
                    nachname: rows[0].last_name,
                    loginname: rows[0].loginname,
                    email: rows[0].email,
                    mobilenr: rows[0].mobile_nr,
                    birthdate: rows[0].birthdate,
                    gender: rows[0].gender,
                    address: rows[0].address,
                    profilePicture: rows[0].profile_picture,
                    description: rows[0].description,
                    rating: rows[0].rating,
                    currency: rows[0].currency
                }

                res.status(200).send({
                    user,
                    message: 'Successfully requested user'
                });
            }else{

                res.status(404).send({
                    message: 'Cannot resolve User'
                });
            }
        }
    });
});

// Get vehicles of user
app.get('/profile/vehicles', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query
    const query: string= "SELECT * FROM Vehicle WHERE user_id = ?"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            const vehicleList  = [];
            for (const row of rows) {

                const vehicle= {
                    vehicleId: row.vehicle_id,
                    brand: row.brand,
                    model: row.model,
                    seats: row.seats,
                    storage: row.storage,
                    carImage: row.car_image,
                };
                vehicleList.push(vehicle);
            }

            // Send recipe list to client
            res.status(200).send({
                vehicleList,
                message: 'Successfully requested cars'
            });
        }
    });
});

// Get ratings
app.get('/profile/ratings', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query
    const query: string= "SELECT `Ride`.*, `Ride`.`driver_id`, `booking`.*, `User`.`user_id`, `User`.`first_name`, `User`.`profile_picture` FROM `Ride` LEFT JOIN `booking` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `driver_id` = ?"

    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else{
            const ratingList  = [];
            for (const row of rows) {

                const rating = {
                    customerId: row.customer_id,
                    customerImage: row.profile_picture,
                    customerName: row.first_name,
                    rating: row.rating,
                    start: row.start,
                    destination: row.destination,
                    comment: row.comment
                };
                ratingList.push(rating);
            }
            // Send recipe list to client
            res.status(200).send({
                ratingList,
                message: 'Successfully requested comments'
            });
        }
    });
});

// Get rating from profile by Id
app.get('/profile/ratings/:id', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query
    const query: string= "SELECT `Ride`.*, `Ride`.`driver_id`, `booking`.*, `User`.`user_id`, `User`.`first_name`, `User`.`profile_picture` FROM `Ride` LEFT JOIN `booking` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `driver_id` = ?"

    database.query(query, req.params.id, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else{
            const ratingList  = [];
            for (const row of rows) {

                const rating = {
                    customerId: row.customer_id,
                    customerImage: row.profile_picture,
                    customerName: row.first_name,
                    rating: row.rating,
                    start: row.start,
                    destination: row.destination,
                    comment: row.comment
                };
                ratingList.push(rating);
            }
            // Send recipe list to client
            res.status(200).send({
                ratingList,
                message: 'Successfully requested comments'
            });
        }
    });
});

// Update profile
app.put('/profile', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const query: string = "UPDATE `User` SET `first_name` = ?, `last_name` = ?, `email` = ?, `mobile_nr` = ?, `birthdate` = ?, `gender` = ?, `address` = ?, `profile_picture` = ?, `description` = ? WHERE `User`.`user_id` = ?"
    const user: any = req.body.user
    const data = [ user.name, user.nachname, user.email, user.mobilenr, user.birthdate, user.gender, user.address, user.profilePicture, user.description, req.session.user.uId ]

    database.query(query, data, (err: MysqlError, rows: any[]) => {
        if (err){
            res.status(500).send({
                message: 'Database request failed',
            });
        }
        else{
            res.status(200).send({
                message: 'Successfully updated user profile',
            });
        }
    });
});

// Update currency
app.put('/currency', isLoggedIn(), (req: Request, res: Response) => {
    const change = req.body.change
    let offerer = req.body.offerer
    let user = req.session.user.uId
    const reason:string = req.body.reason
    let userCurrency: number;
    //check if the reason is to top up account, if not, it's a booking
    if (reason === 'topUp'){
        const query : string= 'UPDATE `User` SET `currency` = `currency` + ? WHERE `User`.`user_id` = ?'
        const data: [number, number] = [change, user]
        database.query(query, data, (err: MysqlError, rows: any[]) => {
            if (err){
                res.status(500).send({
                    message: 'Database request failed',
                });
            }
            else{
                res.status(200).send({
                    message: 'Successfully updated currency',
                });
            }
        });
    }
    if(reason==='booking' || reason ==='declined'){
        //checking if user is able to pay
        const query : string = 'SELECT currency FROM User WHERE user_id = ?'
        database.query(query, user, (err: MysqlError, rows: any[]) => {
            if (err){
                res.status(500).send({
                    message: 'Database request failed',
                });
            }
            else{
                userCurrency = rows[0].currency
                if (userCurrency>=change){
                    //setting the value of the drivers profile + the change
                    const query:string = 'UPDATE `User` SET `currency` = `currency` + ? WHERE `User`.`user_id` = ?'
                    const data: [number, number] = [change, offerer]
                    database.query(query, data, (err: MysqlError, rows: any[]) => {
                        if (err){
                            res.status(500).send({
                                message: 'Database request failed',
                            });
                        }
                        else{

                            //setting value of user - the price
                            const query:string = 'UPDATE `User` SET `currency` = `currency` - ? WHERE `User`.`user_id` = ?'
                            const data: [number, number] = [change, user]
                            database.query(query, data, (err: MysqlError, rows: any[]) => {
                                if (err){
                                    res.status(500).send({
                                        message: 'Database request failed',
                                    });
                                }
                                else{

                                    res.status(200).send({
                                        message: 'Successfully changed currency',
                                    });
                                }
                            });
                        }
                    });
                }else{
                    res.status(203).send({
                        message: 'Not enough Coins',
                    });
                }
            }
        });


    }

});

app.put('/currencyBack', isLoggedIn(), (req: Request, res: Response) => {
    const change = req.body.change
    let customer = req.body.customer
    //setting the value of the drivers profile - the change
    const query:string = 'UPDATE `User` SET `currency` = `currency` - ? WHERE `User`.`user_id` = ?'
    const data: [number, number] = [change, req.session.user.uId]
    database.query(query, data, (err: MysqlError, rows: any[]) => {
        if (err){
            res.status(500).send({
                message: 'Database request failed',
            });
        }
        else{
            //setting value of customer + the price
            const query:string = 'UPDATE `User` SET `currency` = `currency` + ? WHERE `User`.`user_id` = ?'
            const data: [number, number] = [change, customer]
            database.query(query, data, (err: MysqlError, rows: any[]) => {
                if (err){
                    res.status(500).send({
                        message: 'Database request failed',
                    });
                }
                else{

                    res.status(200).send({
                        message: 'Successfully changed currency',
                    });
                }
            });
        }
    });





});

// Update user password
app.put('/password', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const query : string = "UPDATE `User` SET `password` = ? WHERE `User`.`user_id` = ?"
    const password: string = req.body.password
    const passwordHashed :string = crypto.createHash("sha512").update(password).digest('hex')
    const data : [string, number] = [passwordHashed, req.session.user.uId]

    database.query(query, data, (err: MysqlError, rows: any[]) => {
        if (err){
            res.status(500).send({
                message: 'Database request failed',
            });
        }
        else{
            res.status(200).send({
                message: 'Successfully updated user password',
            });
        }
    });
});

/*****************************************************************************
 * Routes for the Login / Register                                           *
 *****************************************************************************/

function isLoggedIn() {
    // Abstract middleware route for checking login state of the user
    return (req: Request, res: Response, next) => {
        if (req.session.user) {
            // User has an active session and is logged in, continue with route
            next();
        } else {
            // User is not logged in
            res.status(401).send({
                message: 'Session expired, please log in again',
            });
        }
    };
}

// Login
app.post('/login', (req: Request, res: Response) => {
    // Read data from request
    const username: string = req.body.username;
    const password: string = req.body.password;

    // Create database query and data
    const data: [string, string] = [username, crypto.createHash("sha512").update(password).digest('hex')];
    const query: string = 'SELECT * FROM User WHERE loginname = ? AND password = ?';
    // request user from database
    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });
        } else {
            // Check if database response contains exactly one entry
            if (rows.length === 1) {
                // Login data is correct, user is logged in
                const user: User = {
                    uId: rows[0].user_id,
                    name: rows[0].first_name,
                    nachname: rows[0].last_name,
                    loginname: rows[0].loginname,
                    groupId: rows[0].group_id,
                };
                req.session.user = user; // Store user object in session for authentication
                res.status(200).send({
                    message: 'Successfully logged in',
                    user // Send user object to client for greeting message
                });
            } else {
                // Login data is incorrect, user is not logged in
                res.status(401).send({
                    message: 'Username or password is incorrect.',
                });
            }
        }
    });
});

// Register new user
app.post('/register', (req: Request, res: Response) => {
    // Read data from request
    const username: string = req.body.username;
    const password: string = req.body.password;
    const name: string = req.body.name;
    const lastname: string = req.body.lastname;
    const mail: string = req.body.mail
    const phone: string = req.body.phone

    const passwordHashed :string = crypto.createHash("sha512").update(password).digest('hex')

    //check if username already is taken
    const query: string = 'SELECT * FROM User WHERE loginname = ?';
    // request user from database
    database.query(query, username, (err: MysqlError, rows: any) => {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });
        } else {
            // Check if database response contains exactly one entry
            if (rows.length === 1) {
                res.status(409).send({
                    message: 'Username already exists',
                });
            }
            //Username is available
            else {

                //inserting values into user table
                const query : string = "INSERT INTO `User` (`user_id`, `group_id`, `first_name`, `last_name`, `loginname`, `email`, `password`, `mobile_nr`, `birthdate`, `gender`, `address`, `profile_picture`, `description`, `rating`, `currency`) VALUES (NULL, '3', ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, 0);"
                const data : [string, string, string, string, string, string] = [name, lastname, username, mail, passwordHashed, phone, ]

                database.query(query, data, (err: MysqlError, rows: any) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Database request failed: ' + err,
                        });
                    }
                    else{
                        res.status(201).send({
                            message: 'Successfully created User',
                        });
                    }
                })
            }
        }
    });
});

// Check if user is logged in
app.get('/login', isLoggedIn(), (req: Request, res: Response) => {
    res.status(200).send({
        message: 'User still logged in',
        user: req.session.user, // Send user object to client for greeting message
    });
});

// Logout the user
app.post('/logout', (req: Request, res: Response) => {
    // Log out user
    delete req.session.user; // Delete user from session
    res.status(200).send({
        message: 'Successfully logged out',
    });
});

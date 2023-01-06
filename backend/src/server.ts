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

//import models
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
        }
    });
});
app.use(express.json());
/*****************************************************************************
 * session management configuration                                          *
 *****************************************************************************/
app.use(session({
    // save session even if not modified
    resave: true,
    // save session even if not used
    saveUninitialized: true,
    // forces cookie set on every response needed to set expiration (maxAge)
    rolling: true,
    // encrypt session-id in cookie using "secret" as modifier
    secret: "geheim",
    // name of the cookie set is set by the server
    name: "mySessionCookie",
    // set some cookie-attributes. Here expiration-date (offset in ms)
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true}
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
 * Routes for rides                                                          *
 *****************************************************************************/

// Get single ride
app.get('/rides/:id', (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT * FROM Ride WHERE ride_id = ?"
    const rideId: string = req.params.id

    database.query(query, rideId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            if (rows.length === 1){
                const ride = rows.map(row => row = {
                    rideId: row.ride_id,
                    driverId: row.driver_id,
                    vehicleId: row.vehicle_id,
                    start: row.start,
                    destination: row.destination,
                    dateTime: row.dateTime,
                    price: row.price,
                    description: row.description,
                    open: row.open
                });

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
    const query: string = "SELECT * FROM Ride"

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
                open: row.open
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
    // Create database query and data
    const query: string = "INSERT INTO Ride (driver_id, vehicle_id, start, destination, dateTime, price, description, open) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    const { vehicleId, start, destination, dateTime, price, description, open } = req.body
    const data : [number, string, string, string, number, string, boolean] = [ vehicleId, start, destination, dateTime, price, description, open ]

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
    // Create database query and data
    const query: string = "UPDATE Ride SET driver_id = ?, vehicle_id = ?, start = ?, destination = ?, dateTime = ?, price = ?, description = ?, open = ? WHERE ride_id = ?"
    const { vehicleId, start, destination, dateTime, price, description, open } = req.body
    const rideId: number = +req.params.id
    const data : [number, number, string, string, string, number, string, boolean] = [ rideId, vehicleId, start, destination, dateTime, price, description, open ]

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
    const rideId: number = +req.params.id

    database.query(query, rideId, (err: MysqlError, rows: any) => {
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
    const bookingId: number = +req.params.id

    database.query(query, bookingId, (err: MysqlError, rows: any[]) => {
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

// Get booking requests for ride
app.get('/rides/:id/bookings', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT * FROM booking WHERE ride_id = ?"
    const rideId: number = +req.params.id

    database.query(query, rideId, (err: MysqlError, rows: any[]) => {
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
    const query: string = "INSERT INTO booking (customer_id, ride_id, status, NULL, NULL) VALUES (?, ?, ?, ?, ?)"
    const { customerId, rideId, status } = req.body
    const data : [number, number, string ] = [ customerId, rideId, status ]

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
    const bookingId: number = +req.params.id
    const data : [number, number, string, number, string] = [ customerId, rideId, status, rating, comment ]

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
    const bookingId: number = +req.params.id

    database.query(query, bookingId, (err: MysqlError, rows: any) => {
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
 * Routes for vehicles                                                       *
 *****************************************************************************/

// Get single vehicle
app.get('/vehicles/:id', (req: Request, res: Response) => {
    // Create database query and id
    const query: string = "SELECT * FROM Vehicle WHERE vehicle_id = ?"
    const vehicleId: number = +req.params.id

    database.query(query, vehicleId, (err: MysqlError, rows: any[]) => {
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
    const { userId, brand, model, seats, storage, image } = req.body
    const data : [number, string, string, number, number, string] = [ userId, brand, model, seats, storage, image ]

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
app.put('/vehicles/:id', isLoggedIn(), (req: Request, res: Response) => {
    // Create database query and data
    const query: string = "UPDATE Vehicle SET user_id = ?, brand = ?, model = ?, seats = ?, storage = ?, car_image = ? WHERE vehicle_id = ?"
    const { userId, brand, model, seats, storage, image } = req.body
    const vehicleId: number = +req.params.id
    const data : [number, string, string, number, number, string] = [ userId, brand, model, seats, storage, image ]

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
    const vehicleId: number = +req.params.id

    database.query(query, vehicleId, (err: MysqlError, rows: any) => {
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
 * Routes for profile                                                        *
 *****************************************************************************/

// Get profile
app.get('/profile', isLoggedIn(), (req: Request, res: Response) => {
    // Send recipe list to client
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
                    adress: rows[0].adress,
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

//Update profile
app.put('/profile', isLoggedIn(), (req: Request, res: Response) => {
    const user :any = req.body.user
    const query: string = "UPDATE `User` SET `first_name` = ?, `last_name` = ?, `email` = ?, `mobile_nr` = ?, `birthdate` = ?, `gender` = ?, `address` = ?, `profile_picture` = ?, `description` = ? WHERE `User`.`user_id` = ?"
    const data : [string, string, string, string, string, string, string, string, string, number] = [user.name, user.nachname, user.email, user.mobilenr, user.birthdate, user.gender, user.adress, user.profilePicture, user.description, req.session.user.uId ]

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

// Get cars of user
app.get('/cars', isLoggedIn(), (req: Request, res: Response) => {
    // Send recipe list to client
    const query: string= "SELECT * FROM Vehicle WHERE user_id = ?"
    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else {
            const carList  = [];
            for (const row of rows) {

                const car= {
                    vehicelId: row.vehicelId,
                    brand: row.brand,
                    model: row.model,
                    seats: row.seats,
                    storage: row.storage,
                    carImage: row.car_image,
                };
                carList.push(car);
            }

            // Send recipe list to client
            res.status(200).send({
                carList: carList,
                message: 'Successfully requested cars'
            });
        }
    });
});

// Get ratings
app.get('/comments', isLoggedIn(), (req: Request, res: Response) => {
    // Send recipe list to client
    const query: string= "SELECT `Ride`.*, `Ride`.`driver_id`, `booking`.*, `User`.`user_id`, `User`.`first_name`, `User`.`profile_picture` FROM `Ride` LEFT JOIN `booking` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `driver_id` = ?"
    database.query(query, req.session.user.uId, (err: MysqlError, rows: any[]) => {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        } else{
            const commentList  = [];
            for (const row of rows) {

                const comment= {
                    customerId: row.customer_id,
                    customerImage: row.profile_picture,
                    customerName: row.first_name,
                    rating: row.rating,
                    start: row.start,
                    destination: row.destination,
                    comment: row.comment

                };
                commentList.push(comment);
            }
            // Send recipe list to client
            res.status(200).send({
                commentList: commentList,
                message: 'Successfully requested comments'
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
                const query : string = "INSERT INTO `User` (`user_id`, `group_id`, `first_name`, `last_name`, `loginname`, `email`, `password`, `mobile_nr`, `birthdate`, `gender`, `address`, `profile_picture`, `description`, `rating`, `currency`) VALUES (NULL, '3', ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL);"
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

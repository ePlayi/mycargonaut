"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************************************************
 * Import package                                                            *
 *****************************************************************************/
var express = require("express");
var cors = require('cors');
var history = require('connect-history-api-fallback');
var crypto = require("crypto");
var mysql = require("mysql"); // handles database connections
var session = require("cookie-session");
var database = mysql.createPool({
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
var app = express();
var port = process.env.PORT || 3001;
app.use(cors());
app.use(history());
var server = app.listen(port, function () {
    console.log('Server started');
    //---- connect to database ----------------------------------------------------
    database.getConnection(function (err) {
        if (err) {
            console.log('Database connection failed: ', err);
        }
        else {
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
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true }
}));
/*****************************************************************************
 * STATIC ROUTES                                                             *
 *****************************************************************************/
var basedir = __dirname + '/../..'; // get rid of /backend/src
app.use('/', express.static(basedir + '/frontend/build'));
/*****************************************************************************
 * Routes for rides                                                          *
 *****************************************************************************/
// Get single ride
app.get('/rides/:id', function (req, res) {
    // Create database query and id
    // const query: string = "SELECT * FROM Ride WHERE ride_id = ?"
    var query = " SELECT `Ride`.*, `Ride`.`ride_id`, `Vehicle`.* FROM `Ride` LEFT JOIN `Vehicle` ON `Ride`.`vehicle_id` = `Vehicle`.`vehicle_id` WHERE ride_id = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            if (rows.length === 1) {
                var ride = {
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
                    ride: ride,
                    message: 'Successfully requested Ride'
                });
            }
            else {
                res.status(404).send({
                    message: 'Cannot resolve Ride'
                });
            }
        }
    });
});
// Get all rides
app.get('/rides', function (req, res) {
    // Create database query
    var query = "SELECT `Ride`.*, `User`.* FROM `Ride` LEFT JOIN `User` ON `Ride`.`driver_id` = `User`.`user_id`;";
    database.query(query, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var rideList = rows.map(function (row) { return row = {
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
                driverName: row.first_name + ' ' + row.last_name,
            }; });
            res.status(200).send({
                rideList: rideList,
                message: 'Successfully requested Rides'
            });
        }
    });
});
// Create new ride
app.post('/rides', isLoggedIn(), function (req, res) {
    // Permission checking
    if (req.session.user.uId !== req.body.driverId && req.session.user.groupId > 2) {
        res.status(403).send({
            message: 'You are not allowed to create a ride for another user'
        });
        return;
    }
    // Create database query and data
    var query = "INSERT INTO Ride (driver_id, vehicle_id, start, destination, dateTime, price, description, open, pos_long, pos_lat) VALUES (?, ?, ?, ?, ?, ?, ?, true, null, null)";
    var _a = req.body, driverId = _a.driverId, vehicleId = _a.vehicleId, start = _a.start, destination = _a.destination, dateTime = _a.dateTime, price = _a.price, description = _a.description;
    var data = [driverId, vehicleId, start, destination, dateTime, price, description];
    database.query(query, data, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully created Ride'
            });
        }
    });
});
// Update ride
app.put('/rides/:id', isLoggedIn(), function (req, res) {
    // Permission checking
    if (req.session.user.uId !== req.body.driverId && req.session.user.groupId > 2) {
        res.status(403).send({
            message: 'You are not allowed to update a ride for another user'
        });
        return;
    }
    // Create database query and data
    var query = "UPDATE Ride SET driver_id = ?, vehicle_id = ?, start = ?, destination = ?, dateTime = ?, price = ?, description = ?, open = ?, pos_long = ?, pos_lat = ? WHERE ride_id = ?";
    var _a = req.body, driverId = _a.driverId, vehicleId = _a.vehicleId, start = _a.start, destination = _a.destination, dateTime = _a.dateTime, price = _a.price, description = _a.description, open = _a.open, posLongitude = _a.posLongitude, posLatitude = _a.posLatitude;
    var data = [driverId, vehicleId, start, destination, dateTime, price, description, open, posLongitude, posLatitude, req.params.id];
    database.query(query, data, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully updated Ride'
            });
        }
    });
});
// Delete ride
app.delete('/rides/:id', isLoggedIn(), function (req, res) {
    // Create database query and id
    var query = "DELETE FROM Ride WHERE ride_id = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
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
app.get('/bookings/:id', function (req, res) {
    // Create database query and id
    var query = "SELECT * FROM booking WHERE booking_id = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            if (rows.length === 1) {
                var booking = rows.map(function (row) { return row = {
                    bookingId: row.booking_id,
                    customerId: row.customer_id,
                    rideId: row.ride_id,
                    status: row.status,
                    rating: row.rating,
                    comment: row.comment
                }; });
                res.status(200).send({
                    booking: booking,
                    message: 'Successfully requested Bookings'
                });
            }
            else {
                res.status(404).send({
                    message: 'Cannot resolve Ride'
                });
            }
        }
    });
});
// Get bookings for customer
app.get('/profile/bookings', isLoggedIn(), function (req, res) {
    // Create database query and id
    var query = "SELECT `booking`.*, `booking`.`ride_id`, `Ride`.* FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` WHERE `booking`.`customer_id` = ?;";
    database.query(query, req.session.user.uId, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var bookingList = rows.map(function (row) { return row = {
                bookingId: row.booking_id,
                customerId: row.customer_id,
                rideId: row.ride_id,
                status: row.status,
                rating: row.rating,
                comment: row.comment,
                start: row.start,
                destination: row.destination
            }; });
            res.status(200).send({
                bookingList: bookingList,
                message: 'Successfully requested Bookings'
            });
        }
    });
});
// Get booking requests for ride
app.get('/rides/:id/bookings', isLoggedIn(), function (req, res) {
    // Create database query and id
    var query = "SELECT * FROM booking WHERE ride_id = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var bookingList = rows.map(function (row) { return row = {
                bookingId: row.booking_id,
                customerId: row.customer_id,
                rideId: row.ride_id,
                status: row.status,
                rating: row.rating,
                comment: row.comment
            }; });
            res.status(200).send({
                bookingList: bookingList,
                message: 'Successfully requested Bookings'
            });
        }
    });
});
// Create new booking
app.post('/bookings', isLoggedIn(), function (req, res) {
    // Create database query and data
    var query = "INSERT INTO booking (customer_id, ride_id, status, rating, comment) VALUES (?, ?, ?, NULL, NULL)";
    var rideId = req.body.rideId;
    var data = [req.session.user.uId, rideId, 1];
    database.query(query, data, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully created Booking'
            });
        }
    });
});
// Update booking
app.put('/bookings/:id', isLoggedIn(), function (req, res) {
    // Create database query and data
    var query = "UPDATE booking SET customer_id = ?, ride_id = ?, status = ?, rating = ?, comment = ? WHERE booking_id = ?";
    var _a = req.body, customerId = _a.customerId, rideId = _a.rideId, status = _a.status, rating = _a.rating, comment = _a.comment;
    var data = [customerId, rideId, status, rating, comment, req.params.id];
    database.query(query, data, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully updated Booking'
            });
        }
    });
});
// Delete booking
app.delete('/bookings/:id', isLoggedIn(), function (req, res) {
    // Create database query and id
    var query = "DELETE FROM booking WHERE booking_id = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
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
app.get('/vehicles/:id', function (req, res) {
    // Create database query and id
    var query = "SELECT * FROM Vehicle WHERE vehicle_id = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            if (rows.length === 1) {
                var vehicle = rows.map(function (row) { return row = {
                    vehicleId: row.vehicle_id,
                    userId: row.user_id,
                    brand: row.brand,
                    model: row.model,
                    seats: row.seats,
                    storage: row.storage,
                    image: row.car_image
                }; });
                res.status(200).send({
                    vehicle: vehicle,
                    message: 'Successfully requested Vehicle'
                });
            }
            else {
                res.status(404).send({
                    message: 'Cannot resolve Vehicle'
                });
            }
        }
    });
});
// Create new vehicle
app.post('/vehicles', isLoggedIn(), function (req, res) {
    // Create database query and data
    var query = "INSERT INTO Vehicle (user_id, brand, model, seats, storage, car_image) VALUES (?, ?, ?, ?, ?, ?)";
    var _a = req.body, brand = _a.brand, model = _a.model, seats = _a.seats, storage = _a.storage, image = _a.image;
    var data = [req.session.user.uId, brand, model, seats, storage, image];
    database.query(query, data, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully created Vehicle'
            });
        }
    });
});
// Update vehicle
app.put('/vehicles', isLoggedIn(), function (req, res) {
    // Create database query and data
    var query = "UPDATE Vehicle SET seats = ?, storage = ? WHERE vehicle_id = ?";
    var _a = req.body, seats = _a.seats, storage = _a.storage, vehicleId = _a.vehicleId;
    var data = [seats, storage, vehicleId];
    database.query(query, data, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully updated Vehicle'
            });
        }
    });
});
// Delete vehicle
app.delete('/vehicles/:id', isLoggedIn(), function (req, res) {
    // Create database query and id
    var query = "DELETE FROM Vehicle WHERE vehicle_id = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
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
app.put('/updatePos', isLoggedIn(), function (req, res) {
    // Create database query and data
    var rideId = req.body.rideId;
    var long = req.body.long;
    var lat = req.body.lat;
    var query = "UPDATE `Ride` SET `pos_long` = ?, `pos_lat` = ? WHERE `Ride`.`ride_id` = ?;";
    var data = [long, lat, rideId];
    database.query(query, data, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully updated Position'
            });
        }
    });
});
// Update status of ride
app.put('/changeStatusRide', isLoggedIn(), function (req, res) {
    // Create database query and data
    var rideId = req.body.rideid;
    var changeTo = req.body.changeTo;
    var query = "UPDATE `booking` SET `status` = ? WHERE `booking`.`booking_id` = ?";
    var data = [changeTo, rideId];
    database.query(query, data, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully changed ride status',
                changedTo: changeTo
            });
        }
    });
});
// Get active rides
app.get('/activeRides', isLoggedIn(), function (req, res) {
    // Create database query and id
    var query = "SELECT `booking`.*, `Ride`.*, `booking`.`status`, `Ride`.`driver_id` FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` WHERE `booking`.`status` = '4' AND `Ride`.`driver_id` = ?;";
    database.query(query, req.session.user.uId, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            if (rows.length > 0) {
                var activeRides = {
                    bookingId: rows[0].booking_id,
                    customerId: rows[0].customer_id,
                    rideId: rows[0].ride_id,
                    start: rows[0].start,
                    destination: rows[0].destination,
                    customerName: rows[0].first_name + ' ' + rows[0].last_name
                };
                res.status(200).send({
                    activeRides: activeRides,
                    message: 'Successfully requested Accepted Bookings'
                });
            }
            else {
                res.status(204).send({
                    message: 'No active rides'
                });
            }
        }
    });
});
// Get rides for driver wehere status = 2
app.get('/ridesAccepted', isLoggedIn(), function (req, res) {
    // Create database query and id
    var query = "SELECT `booking`.*, `Ride`.*, `User`.*, `booking`.`status`, `Ride`.`driver_id` FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `booking`.`status` = '2' AND `Ride`.`driver_id` = ?;";
    database.query(query, req.session.user.uId, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var acceptedList = rows.map(function (row) { return row = {
                bookingId: row.booking_id,
                customerId: row.customer_id,
                rideId: row.ride_id,
                status: row.status,
                rating: row.rating,
                comment: row.comment,
                start: row.start,
                destination: row.destination,
                customerName: row.first_name + ' ' + row.last_name
            }; });
            res.status(200).send({
                acceptedList: acceptedList,
                message: 'Successfully requested Accepted Bookings'
            });
        }
    });
});
// Get rides for driver wehere status = 2
app.get('/requestedRides', isLoggedIn(), function (req, res) {
    // Create database query and id
    var query = "SELECT `booking`.*, `Ride`.*, `User`.*, `booking`.`status`, `Ride`.`driver_id` FROM `booking` LEFT JOIN `Ride` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `booking`.`status` = '1' AND `Ride`.`driver_id` = ?;";
    database.query(query, req.session.user.uId, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var requestList = rows.map(function (row) { return row = {
                bookingId: row.booking_id,
                customerId: row.customer_id,
                rideId: row.ride_id,
                status: row.status,
                rating: row.rating,
                comment: row.comment,
                start: row.start,
                destination: row.destination,
                price: row.price,
                customerName: row.first_name + ' ' + row.last_name
            }; });
            res.status(200).send({
                requestList: requestList,
                message: 'Successfully requested  requests'
            });
        }
    });
});
/*****************************************************************************
 * Routes for Profile                                                        *
 *****************************************************************************/
// Get profile
app.get('/profile', isLoggedIn(), function (req, res) {
    // Create database query
    var query = "SELECT * FROM User WHERE user_id = ?";
    database.query(query, req.session.user.uId, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            if (rows.length === 1) {
                var user = {
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
                };
                res.status(200).send({
                    user: user,
                    message: 'Successfully requested user'
                });
            }
            else {
                res.status(404).send({
                    message: 'Cannot resolve User'
                });
            }
        }
    });
});
// Get profile by id
app.get('/user/:id', isLoggedIn(), function (req, res) {
    // Create database query
    var query = "SELECT * FROM User WHERE user_id = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            if (rows.length === 1) {
                var user = {
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
                };
                res.status(200).send({
                    user: user,
                    message: 'Successfully requested user'
                });
            }
            else {
                res.status(404).send({
                    message: 'Cannot resolve User'
                });
            }
        }
    });
});
// Get vehicles of user
app.get('/profile/vehicles', isLoggedIn(), function (req, res) {
    // Create database query
    var query = "SELECT * FROM Vehicle WHERE user_id = ?";
    database.query(query, req.session.user.uId, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var vehicleList = [];
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                var vehicle = {
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
                vehicleList: vehicleList,
                message: 'Successfully requested cars'
            });
        }
    });
});
// Get ratings
app.get('/profile/ratings', isLoggedIn(), function (req, res) {
    // Create database query
    var query = "SELECT `Ride`.*, `Ride`.`driver_id`, `booking`.*, `User`.`user_id`, `User`.`first_name`, `User`.`profile_picture` FROM `Ride` LEFT JOIN `booking` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `driver_id` = ?";
    database.query(query, req.session.user.uId, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var ratingList = [];
            for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                var row = rows_2[_i];
                var rating = {
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
                ratingList: ratingList,
                message: 'Successfully requested comments'
            });
        }
    });
});
// Get rating from profile by Id
app.get('/profile/ratings/:id', isLoggedIn(), function (req, res) {
    // Create database query
    var query = "SELECT `Ride`.*, `Ride`.`driver_id`, `booking`.*, `User`.`user_id`, `User`.`first_name`, `User`.`profile_picture` FROM `Ride` LEFT JOIN `booking` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `driver_id` = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var ratingList = [];
            for (var _i = 0, rows_3 = rows; _i < rows_3.length; _i++) {
                var row = rows_3[_i];
                var rating = {
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
                ratingList: ratingList,
                message: 'Successfully requested comments'
            });
        }
    });
});
// Update profile
app.put('/profile', isLoggedIn(), function (req, res) {
    // Create database query and data
    var query = "UPDATE `User` SET `first_name` = ?, `last_name` = ?, `email` = ?, `mobile_nr` = ?, `birthdate` = ?, `gender` = ?, `address` = ?, `profile_picture` = ?, `description` = ? WHERE `User`.`user_id` = ?";
    var user = req.body.user;
    var data = [user.name, user.nachname, user.email, user.mobilenr, user.birthdate, user.gender, user.address, user.profilePicture, user.description, req.session.user.uId];
    database.query(query, data, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed',
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully updated user profile',
            });
        }
    });
});
// Update currency
app.put('/currency', isLoggedIn(), function (req, res) {
    var change = req.body.change;
    var offerer = req.body.offerer;
    var user = req.session.user.uId;
    var reason = req.body.reason;
    var userCurrency;
    //check if the reason is to top up account, if not, it's a booking
    if (reason === 'topUp') {
        var query = 'UPDATE `User` SET `currency` = `currency` + ? WHERE `User`.`user_id` = ?';
        var data = [change, user];
        database.query(query, data, function (err, rows) {
            if (err) {
                res.status(500).send({
                    message: 'Database request failed',
                });
            }
            else {
                res.status(200).send({
                    message: 'Successfully updated currency',
                });
            }
        });
    }
    if (reason === 'booking' || reason === 'declined') {
        //checking if user is able to pay
        var query = 'SELECT currency FROM User WHERE user_id = ?';
        database.query(query, user, function (err, rows) {
            if (err) {
                res.status(500).send({
                    message: 'Database request failed',
                });
            }
            else {
                userCurrency = rows[0].currency;
                if (userCurrency >= change) {
                    //setting the value of the drivers profile + the change
                    var query_1 = 'UPDATE `User` SET `currency` = `currency` + ? WHERE `User`.`user_id` = ?';
                    var data = [change, offerer];
                    database.query(query_1, data, function (err, rows) {
                        if (err) {
                            res.status(500).send({
                                message: 'Database request failed',
                            });
                        }
                        else {
                            //setting value of user - the price
                            var query_2 = 'UPDATE `User` SET `currency` = `currency` - ? WHERE `User`.`user_id` = ?';
                            var data_1 = [change, user];
                            database.query(query_2, data_1, function (err, rows) {
                                if (err) {
                                    res.status(500).send({
                                        message: 'Database request failed',
                                    });
                                }
                                else {
                                    res.status(200).send({
                                        message: 'Successfully changed currency',
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    res.status(203).send({
                        message: 'Not enough Coins',
                    });
                }
            }
        });
    }
});
app.put('/currencyBack', isLoggedIn(), function (req, res) {
    var change = req.body.change;
    var customer = req.body.customer;
    //setting the value of the drivers profile - the change
    var query = 'UPDATE `User` SET `currency` = `currency` - ? WHERE `User`.`user_id` = ?';
    var data = [change, req.session.user.uId];
    database.query(query, data, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed',
            });
        }
        else {
            //setting value of customer + the price
            var query_3 = 'UPDATE `User` SET `currency` = `currency` + ? WHERE `User`.`user_id` = ?';
            var data_2 = [change, customer];
            database.query(query_3, data_2, function (err, rows) {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed',
                    });
                }
                else {
                    res.status(200).send({
                        message: 'Successfully changed currency',
                    });
                }
            });
        }
    });
});
// Update user password
app.put('/password', isLoggedIn(), function (req, res) {
    // Create database query and data
    var query = "UPDATE `User` SET `password` = ? WHERE `User`.`user_id` = ?";
    var password = req.body.password;
    var passwordHashed = crypto.createHash("sha512").update(password).digest('hex');
    var data = [passwordHashed, req.session.user.uId];
    database.query(query, data, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed',
            });
        }
        else {
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
    return function (req, res, next) {
        if (req.session.user) {
            // User has an active session and is logged in, continue with route
            next();
        }
        else {
            // User is not logged in
            res.status(401).send({
                message: 'Session expired, please log in again',
            });
        }
    };
}
// Login
app.post('/login', function (req, res) {
    // Read data from request
    var username = req.body.username;
    var password = req.body.password;
    // Create database query and data
    var data = [username, crypto.createHash("sha512").update(password).digest('hex')];
    var query = 'SELECT * FROM User WHERE loginname = ? AND password = ?';
    // request user from database
    database.query(query, data, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });
        }
        else {
            // Check if database response contains exactly one entry
            if (rows.length === 1) {
                // Login data is correct, user is logged in
                var user = {
                    uId: rows[0].user_id,
                    name: rows[0].first_name,
                    nachname: rows[0].last_name,
                    loginname: rows[0].loginname,
                    groupId: rows[0].group_id,
                };
                req.session.user = user; // Store user object in session for authentication
                res.status(200).send({
                    message: 'Successfully logged in',
                    user: user // Send user object to client for greeting message
                });
            }
            else {
                // Login data is incorrect, user is not logged in
                res.status(401).send({
                    message: 'Username or password is incorrect.',
                });
            }
        }
    });
});
// Register new user
app.post('/register', function (req, res) {
    // Read data from request
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var lastname = req.body.lastname;
    var mail = req.body.mail;
    var phone = req.body.phone;
    var passwordHashed = crypto.createHash("sha512").update(password).digest('hex');
    //check if username already is taken
    var query = 'SELECT * FROM User WHERE loginname = ?';
    // request user from database
    database.query(query, username, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });
        }
        else {
            // Check if database response contains exactly one entry
            if (rows.length === 1) {
                res.status(409).send({
                    message: 'Username already exists',
                });
            }
            //Username is available
            else {
                //inserting values into user table
                var query_4 = "INSERT INTO `User` (`user_id`, `group_id`, `first_name`, `last_name`, `loginname`, `email`, `password`, `mobile_nr`, `birthdate`, `gender`, `address`, `profile_picture`, `description`, `rating`, `currency`) VALUES (NULL, '3', ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, 0);";
                var data = [name, lastname, username, mail, passwordHashed, phone,];
                database.query(query_4, data, function (err, rows) {
                    if (err) {
                        res.status(500).send({
                            message: 'Database request failed: ' + err,
                        });
                    }
                    else {
                        res.status(201).send({
                            message: 'Successfully created User',
                        });
                    }
                });
            }
        }
    });
});
// Check if user is logged in
app.get('/login', isLoggedIn(), function (req, res) {
    res.status(200).send({
        message: 'User still logged in',
        user: req.session.user, // Send user object to client for greeting message
    });
});
// Logout the user
app.post('/logout', function (req, res) {
    // Log out user
    delete req.session.user; // Delete user from session
    res.status(200).send({
        message: 'Successfully logged out',
    });
});

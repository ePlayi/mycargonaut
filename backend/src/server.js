"use strict";
exports.__esModule = true;
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
    multipleStatements: true
});
/*****************************************************************************
 * Define and start web-app server, define json-Parser                       *
 *****************************************************************************/
var app = express();
var port = process.env.PORT || 3001;
app.use(cors());
// app.use(history());
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
    var query = "SELECT * FROM Ride WHERE ride_id = ?";
    database.query(query, req.params.id, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            if (rows.length === 1) {
                var ride = rows.map(function (row) { return row = {
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
                    posLatitude: row.pos_lat
                }; });
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
    var query = "SELECT * FROM Ride";
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
                posLatitude: row.pos_lat
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
app["delete"]('/rides/:id', isLoggedIn(), function (req, res) {
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
    var query = "SELECT * FROM booking WHERE customer_id = ?";
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
                comment: row.comment
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
    var _a = req.body, customerId = _a.customerId, rideId = _a.rideId, status = _a.status;
    var data = [customerId, rideId, status];
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
app["delete"]('/bookings/:id', isLoggedIn(), function (req, res) {
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
    var _a = req.body, userId = _a.userId, brand = _a.brand, model = _a.model, seats = _a.seats, storage = _a.storage, image = _a.image;
    var data = [userId, brand, model, seats, storage, image];
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
app.put('/vehicles/:id', isLoggedIn(), function (req, res) {
    // Create database query and data
    var query = "UPDATE Vehicle SET user_id = ?, brand = ?, model = ?, seats = ?, storage = ?, car_image = ? WHERE vehicle_id = ?";
    var _a = req.body, userId = _a.userId, brand = _a.brand, model = _a.model, seats = _a.seats, storage = _a.storage, image = _a.image;
    var data = [userId, brand, model, seats, storage, image, req.params.id];
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
app["delete"]('/vehicles/:id', isLoggedIn(), function (req, res) {
    // Create database query and id
    var query = "DELETE FROM Vehicle WHERE vehicle_id = ?";
    var vehicleId = +req.params.id;
    database.query(query, vehicleId, function (err, rows) {
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
 * Routes for profile                                                        *
 *****************************************************************************/
// Get profile
app.get('/profile', isLoggedIn(), function (req, res) {
    // Send recipe list to client
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
                    adress: rows[0].adress,
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
app.get('/profile/:id', isLoggedIn(), function (req, res) {
    // Send recipe list to client
    var query = "SELECT * FROM User WHERE user_id = ?";
    var id = req.params.id;
    database.query(query, id, function (err, rows) {
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
                    adress: rows[0].adress,
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
// Update profile
app.put('/profile', isLoggedIn(), function (req, res) {
    var user = req.body.user;
    var query = "UPDATE `User` SET `first_name` = ?, `last_name` = ?, `email` = ?, `mobile_nr` = ?, `birthdate` = ?, `gender` = ?, `address` = ?, `profile_picture` = ?, `description` = ? WHERE `User`.`user_id` = ?";
    var data = [user.name, user.nachname, user.email, user.mobilenr, user.birthdate, user.gender, user.adress, user.profilePicture, user.description, req.session.user.uId];
    database.query(query, data, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed'
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully updated user profile'
            });
        }
    });
});
// Update user password
app.put('/password', isLoggedIn(), function (req, res) {
    var password = req.body.password;
    var passwordHashed = crypto.createHash("sha512").update(password).digest('hex');
    var query = "UPDATE `User` SET `password` = ? WHERE `User`.`user_id` = ?";
    var data = [passwordHashed, req.session.user.uId];
    database.query(query, data, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed'
            });
        }
        else {
            res.status(200).send({
                message: 'Successfully updated user password'
            });
        }
    });
});
// Get cars of user
app.get('/cars', isLoggedIn(), function (req, res) {
    // Send recipe list to client
    var query = "SELECT * FROM Vehicle WHERE user_id = ?";
    database.query(query, req.session.user.uId, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var carList = [];
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                var car = {
                    vehicelId: row.vehicelId,
                    brand: row.brand,
                    model: row.model,
                    seats: row.seats,
                    storage: row.storage,
                    carImage: row.car_image
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
app.get('/comments', isLoggedIn(), function (req, res) {
    // Send recipe list to client
    var query = "SELECT `Ride`.*, `Ride`.`driver_id`, `booking`.*, `User`.`user_id`, `User`.`first_name`, `User`.`profile_picture` FROM `Ride` LEFT JOIN `booking` ON `booking`.`ride_id` = `Ride`.`ride_id` LEFT JOIN `User` ON `booking`.`customer_id` = `User`.`user_id` WHERE `driver_id` = ?";
    database.query(query, req.session.user.uId, function (err, rows) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var commentList = [];
            for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                var row = rows_2[_i];
                var comment = {
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
    return function (req, res, next) {
        if (req.session.user) {
            // User has an active session and is logged in, continue with route
            next();
        }
        else {
            // User is not logged in
            res.status(401).send({
                message: 'Session expired, please log in again'
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
                message: 'Database request failed: ' + err
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
                    loginname: rows[0].loginname
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
                    message: 'Username or password is incorrect.'
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
                message: 'Database request failed: ' + err
            });
        }
        else {
            // Check if database response contains exactly one entry
            if (rows.length === 1) {
                res.status(409).send({
                    message: 'Username already exists'
                });
            }
            //Username is available
            else {
                //inserting values into user table
                var query_1 = "INSERT INTO `User` (`user_id`, `group_id`, `first_name`, `last_name`, `loginname`, `email`, `password`, `mobile_nr`, `birthdate`, `gender`, `address`, `profile_picture`, `description`, `rating`, `currency`) VALUES (NULL, '3', ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                var data = [name, lastname, username, mail, passwordHashed, phone,];
                database.query(query_1, data, function (err, rows) {
                    if (err) {
                        res.status(500).send({
                            message: 'Database request failed: ' + err
                        });
                    }
                    else {
                        res.status(201).send({
                            message: 'Successfully created User'
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
        user: req.session.user
    });
});
// Logout the user
app.post('/logout', function (req, res) {
    // Log out user
    delete req.session.user; // Delete user from session
    res.status(200).send({
        message: 'Successfully logged out'
    });
});

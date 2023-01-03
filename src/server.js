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
var basedir = __dirname + '/..'; // get rid of /server/src
app.use('/', express.static(basedir + '/frontend/build'));
/*****************************************************************************
 * Routes for offers                                                         *
 *****************************************************************************/
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
app.post('/register', function (req, res) {
    // Read data from request
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var lastname = req.body.lastname;
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
                var query_1 = "INSERT INTO `User` (`uId`, `name`, `nachname`, `username`, `password`) VALUES (NULL, ?, ?, ?, ?);";
                var data = [name, lastname, username, passwordHashed];
                database.query(query_1, data, function (err, rows) {
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
app.get('/login', isLoggedIn(), function (req, res) {
    res.status(200).send({
        message: 'User still logged in',
        user: req.session.user, // Send user object to client for greeting message
    });
});

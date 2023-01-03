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
const basedir: string = __dirname + '/..';  // get rid of /src
app.use('/', express.static(basedir + '/build'));


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
                    uId: rows[0].uId,
                    name: rows[0].name,
                    nachname: rows[0].nachname,
                    loginname: rows[0].loginname,
                };
                req.session.user = user; // Store user object in session for authentication
                res.status(200).send({
                    message: 'Successfully logged in',
                    user, // Send user object to client for greeting message
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

app.post('/register', (req: Request, res: Response) => {
    // Read data from request
    const username: string = req.body.username;
    const password: string = req.body.password;
    const name: string = req.body.name;
    const lastname: string = req.body.lastname;

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
                const query : string = "INSERT INTO `User` (`uId`, `name`, `nachname`, `loginname`, `password`) VALUES (NULL, ?, ?, ?, ?);"
                const data : [string, string, string, string] = [name, lastname, username, passwordHashed]

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

app.get('/login', isLoggedIn(), (req: Request, res: Response) => {
    res.status(200).send({
        message: 'User still logged in',
        user: req.session.user, // Send user object to client for greeting message
    });
});

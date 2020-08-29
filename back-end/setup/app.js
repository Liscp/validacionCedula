;
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
require('../config/database')

let app = express()

/**
 * Import Routes
 */
let congressRoutes = require('../routes/congress.routes')
let personRoutes = require('../routes/person.routes')
let postulationRoutes = require('../routes/postulation.routes')
let linksRoutes = require('../routes/links.routes')

let session = require('express-session')
let sess = {
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: 'sessionID',
    cookie: {
        httpOnly: false,
        maxAge: parseInt(process.env.TIME)
    }
}

/**
 * For access client
 *
 * @type {{origin: string, optionsSuccessStatus: number}}
 */
let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

/**
 * CORS
 */
app.use(cors(corsOptions))

/**
 * SESSION
 */
app.use(session(sess))

/**
 * PASSPORT
 */
app.use(passport.initialize())
app.use(passport.session())

/**
 * Export Routes
 */
app.use('/api', congressRoutes)
app.use('/api', personRoutes)
app.use('/api', postulationRoutes)
app.use('/api', linksRoutes)

module.exports = app

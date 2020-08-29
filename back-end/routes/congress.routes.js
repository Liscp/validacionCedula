;
'use strict'

const express = require('express')
let api = express.Router()

const congressController = require('../controllers/congress.controller')
const authenticate = require('../middlewares/authenticate')

api.get('/getCongress', [authenticate.tokenAuth], congressController.getCongress)
api.post('/postCongress', [authenticate.tokenAuth], congressController.postCongress)
api.put('/putCongress/:id', [authenticate.tokenAuth], congressController.putCongress)

module.exports = api

;
'use strict'

const express = require('express');
let api = express.Router();

const linksController = require('../controllers/links.controller')
const authenticate = require('../middlewares/authenticate');

api.get('/getLinks', [authenticate.tokenAuth], linksController.getLinks)
api.post('/postLink', [authenticate.tokenAuth], linksController.postLink)
api.put('/putLink/:id', [authenticate.tokenAuth], linksController.putLink)
api.delete('/deleteLink/:id', [authenticate.tokenAuth], linksController.deleteLink)

module.exports = api

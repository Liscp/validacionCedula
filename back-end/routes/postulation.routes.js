;
'use strict'
const express = require('express');
let api = express.Router()

const postulationController = require('../controllers/postulation.controller');
const authenticate = require('../middlewares/authenticate')

api.get('/getPostulationById/:id', [authenticate.tokenAuth], postulationController.getPostulationById)
api.get('/getPostulations', postulationController.getPostulations)
api.post('/postPostulation', [authenticate.tokenAuth], postulationController.postPostulation)
api.put('/putPostulation/:id', [authenticate.tokenAuth], postulationController.putPostulation)
api.delete('/deletePostulation/:id', [authenticate.tokenAuth], postulationController.deletePostulation)

module.exports = api;

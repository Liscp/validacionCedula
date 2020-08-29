;
'use strict'
const Postulation = require('../models/Postulation')

let getPostulationById = async (req, res) => {
    let id = req.params.id
    let postulation = await Postulation.findById({_id: id})
    if (postulation) {
        res.status(200).json({
            ok: true,
            postulation
        })
    } else if (postulation.length === 0) {
        res.send('La postulación no está registrada en el sistema')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let getPostulations = async (req, res) => {
    let postulations = await Postulation.find()
    if (postulations) {
        res.status(200).json({
            ok: true,
            postulations,
            sms: `Postulaciones registradas: ${postulations.length}`
        })
    } else if (postulations.length === 0) {
        res.send('No hay ningún congreso registrado')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let postPostulation = async (req, res) => {
    let postulation = req.body.postulation
    let newPostulation = new Postulation(postulation)
    await newPostulation.save()
        .then(() => {
            res.status(200).json({
                ok: true,
                newPostulation,
                sms: 'Postulación almacenada'
            })
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                data: null,
                sms: `El error es: ${err}`
            })
        })
}

let putPostulation = async (req, res) => {
    let id = req.params.id
    let postulation = req.body.postulation;
    let updatePostulation = await Postulation.updateOne({_id: id}, {$set: postulation})
    if (updatePostulation) {
        res.status(200).json({
            ok: true,
            postulation,
            sms: 'Postulación actualizada'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let deletePostulation = async (req, res) => {
    let id = req.params.id
    let deletePostulation = await Postulation.deleteOne({_id: id})
    if (deletePostulation) {
        res.status(200).json({
            ok: true,
            sms: 'Postulación eliminada'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

module.exports = {
    getPostulationById,
    getPostulations,
    postPostulation,
    putPostulation,
    deletePostulation
}

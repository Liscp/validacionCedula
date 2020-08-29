;
'use strict'
const Congress = require('../models/Congress')

let getCongress = async (req, res) => {
    let congress = await Congress.find()
    if (congress) {
        res.status(200).json({
            ok: true,
            congress
        })
    } else if (congress.length === 0) {
        res.send('No hay ningún congreso registrado')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let postCongress = async (req, res) => {
    let congress = req.body.congress
    let newCongress = new Congress(congress)
    await newCongress.save()
        .then(() => {
            res.status(200).json({
                ok: true,
                newCongress,
                sms: 'Congreso creado'
            })
        }).catch(e => {
            res.status(500).json({
                ok: false,
                data: null,
                sms: e
            })
        })
}

let putCongress = async (req, res) => {
    let id = req.params.id
    let congress = req.body.congress;
    let putCongress = await Congress.updateOne({_id: id}, {$set: congress})
    if (putCongress) {
        res.status(200).json({
            ok: true,
            congress,
            sms: 'Congreso actualizado'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

module.exports = {
    getCongress,
    postCongress,
    putCongress
}

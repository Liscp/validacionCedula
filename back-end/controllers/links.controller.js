;
'use strict'
const Links = require('../models/Links')

let getLinks = async (req, res) => {
    let links = await Links.find()
    if (links) {
        res.status(200).json({
            ok: true,
            links
        })
    } else if (links.length === 0) {
        res.send('No hay ningún link registrado')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let postLink = async (req, res) => {
    let link = req.body.link
    let newLink = new Links(link)
    await newLink.save()
        .then(() => {
            res.status(200).json({
                ok: true,
                newLink,
                sms: 'Link creado'
            })
        }).catch(e => {
            res.status(500).json({
                ok: false,
                data: null,
                sms: e
            })
        })
}

let putLink = async (req, res) => {
    let id = req.params.id
    let link = req.body.link;
    let putLink = await Links.updateOne({_id: id}, {$set: link})
    if (putLink) {
        res.status(200).json({
            ok: true,
            link,
            sms: 'Link actualizado'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}
let deleteLink = async (req, res) => {
    let id = req.params.id
    let deleteLink = await Links.deleteOne({'_id': id})
    if (deleteLink) {
        res.status(200).json({
            ok: true,
            sms: 'Link borrado'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }

}

module.exports = {
    getLinks,
    postLink,
    putLink,
    deleteLink
}

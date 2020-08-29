;
'use strict'
const jwt = require('jsonwebtoken')

let tokenAuth = (req, res, next) => {
    let token = req.headers.authorization || null
    jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
        if (err) {
            return res.status(400).json({
                data: err,
                sms: 'Token inválido'
            })
        } else {
            req.decode = decode
            console.log(decode)
            next()
        }
    })
}

let emailAuth = (req, res, next) => {
    let person = req.body.person
    let path = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    let validate = path.test(person.email)
    if (validate) {
        next()
    } else {
        res.status(200).send('El correo no es válido')
    }
}

module.exports = {
    tokenAuth,
    emailAuth
}

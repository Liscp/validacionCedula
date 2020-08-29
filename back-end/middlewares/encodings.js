;
'use strict'
const bcrypt = require('bcrypt')

let encodePassword = (req, res, next) => {
    let person = req.body.person || null
    if (!person || person.password === '' || !person.password) {
        return res.status(400).send('Usuario o contraseña inválidos')
    } else {
        let encodePassword = bcrypt.hashSync(person.password, bcrypt.genSaltSync(10))
        if (encodePassword) {
            req.body.person.password = encodePassword
            req.body.person.createAt = new Date()
            if (req.sessionID) {
                req.body.person.sessionID = req.sessionID
                next()
            } else {
                return res.status(200).send('No se encontró una sesión válida')
            }
        } else {
            return res.status(200).send('Contraseña no encriptada')
        }
    }
}

module.exports = {
    encodePassword
}

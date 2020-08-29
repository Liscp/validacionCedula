;
'use strict'

const mongoose = require('mongoose')
const {Schema} = mongoose

const Postulation = new Schema(
    {
        title_project: {type: String},
        summary_project: {type: String},
        summary_pdf: {type: String},
        knowledge_area: {
            type: String,
            enum: [
                'Artes y Humanidades',
                'Ciencias',
                'Ciencias de la Salud',
                'Ciencias Sociales y Jurídicas',
                'Ingeniería y Arquitectura'
            ]
        },
        files: {type: String},
        presentation_date: {type: Date},
        person_id: {type: String}
    }
);

module.exports = mongoose.model('postulations', Postulation)

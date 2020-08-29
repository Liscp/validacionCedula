;
'use strict'
const mongoose = require('mongoose');
const {Schema} = mongoose;

const Links = new Schema({
    link_video: {type: String}
});

module.exports = mongoose.model('links', Links);

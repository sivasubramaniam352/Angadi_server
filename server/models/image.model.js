const mongoose = require('mongoose');

//image schema
const imageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
})

const imageScm =mongoose.model('images', imageSchema);

module.exports = imageScm;
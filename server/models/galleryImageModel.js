const mongoose = require('mongoose');
const scheme = mongoose.Schema
//image schema
const galImageSchema = new scheme({
    url: {
        type: String,
        required: true
    },
    
})

const imgScheme =mongoose.model('gallery', galImageSchema);

module.exports = imgScheme;
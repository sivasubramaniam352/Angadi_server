const mongoose = require('mongoose');

const scheme = mongoose.Schema
const productSchema = new scheme({
    seller:{
        type:String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgPath:{
        type: Array,
        required: true
    },
    productType:{
        type:String,
        required: true
    },
    for:{
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    code:{
        type: String,
        required:true
    },
    offer:{
        type:Number,
        
    }
})
const ptModel = mongoose.model('products', productSchema)

module.exports =   ptModel;
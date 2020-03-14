const express = require('express')

const images = require('../models/image.model');

const createImage = (req, res) =>{
    const newImage = new images(req.body);
    newImage.save()
    .then(item => {
        res.send(`${item} saved to DB`);
    }).catch(err => {
        res.status(400).send('Unable to send ',err)
    })
}

const getImage =  (req, res) => {
    images.find({}, (err, docs) => {
        const imgs = docs;
        res.json(imgs);
    })
}

const deleteImage = (req, res) => {
    images.findByIdAndRemove(req.params.id,(err, result) => {
        if(err){
            res.json('error', err)
        }
      
        else{
            res.json(result)
        }

    })
   
}
module.exports = {
    createImage: createImage,
    deleteImage: deleteImage,
    getImage: getImage
}

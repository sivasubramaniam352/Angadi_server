const Gallery = require('../models/galleryImageModel');


const create = (req, res) => {
    const galImgs = new Gallery({
        url:req.body.url
    })
    galImgs.save()
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(400).send(err)
    })
}

const read = (req, res) => {
    Gallery.find({})
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

module.exports = {
    create:create,
    read:read
}
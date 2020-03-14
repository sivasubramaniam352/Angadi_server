const FilterModel = require('../models/productModel')
const jwt = require('jsonwebtoken')



const create = (req, res) => {
    const today = new Date()
    const newImage = new FilterModel({seller:req.body.seller,
        brand:req.body.brand,
        description:req.body.description,
        color:req.body.color,
        size:req.body.size,
        price:req.body.price,
        imgPath:req.body.imgPath,
        productType:req.body.productType,
        for:req.body.for,
        createdAt:today,
        code:req.body.code,
        offer:req.body.offer
       });
       var decoded = jwt.verify(req.headers['authorization'], 'secretnehvaida' );
    if(decoded.usertype = "admin"){
        FilterModel.create(newImage)
        .then(data => {
            res.json({data})
        })
        .catch(err =>{
            res.json({err:err})
        })
    }
}

const getPdt = (req, res) =>{
   
        
    
   
      FilterModel.find(req.body)
    .then(doc =>{
       return res.json(doc)
    })
    .catch(err =>{
        res.json(err)
    })

}

const get = (req, res) =>{
    FilterModel.find({})
    .then(data =>{
        return res.json(data)
    })
    .catch(err =>{
        res.json(err)
    })
}

const getWithId = (req, res)=>{

    FilterModel.findOne({code:req.params.code})
    .then(data =>{
        return res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports = {
    create:create,
    getPdt:getPdt,
    get:get,
    GBiD:getWithId
}
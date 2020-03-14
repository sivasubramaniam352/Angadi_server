const FilterModel = require('../models/productModel')
const User = require('../models/userModel')
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

const addProd = (req, res) =>{
    // FilterModel.findOne({code:req.body.code})
    // .then(proDoc =>{
    //     console.log(proDoc)
        var decoded = jwt.verify(req.headers['authorization'], 'secretnehvaida' );
    //     console.log(decoded.owned)
    //     User.findOne({owned:decoded.owned}).populate('products')
    // User.updateOne({email:decoded.email}, {$push:{owned:{$each: [ { _id: "5e679034442c59310e941370"}]}}})
    // .then(refd =>{
    //     res.status(200).json({refd})
    // }).catch(err =>{
    //     res.send(`${err}+ error updating`)
    // })

User.findOne({email:decoded.email}).populate('owned')
.exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story);
    // prints "The author is Ian Fleming"
  })

    
}
module.exports = {
    create:create,
    getPdt:getPdt,
    get:get,
    GBiD:getWithId,
    addProd:addProd
}
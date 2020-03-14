const Cart = require('../models/cartModel')
const jwt = require('jsonwebtoken')



exports.create = (req, res) =>{
     const datum = {
                user: req.body.user,
                product:req.body.product,
                size:req.body.size
                
            }
          Cart.create(datum).then(doc =>{
              res.status(200).json({msg:doc})
          })
        
        
           
  
}

exports.delete = (req, res) =>{
  
    Cart.deleteOne({_id:req.body._id })
    .then(dat =>{
        res.json(dat)
    })
    .catch(err =>[
        res.send(err)
    ])
}


exports.readprod = (req, res) =>{
    Cart.find({user: req.body.user}).populate('product')
    .then(dat =>{
        res.json(dat)
    })
    .catch(err =>[
        res.send(err)
    ])
}
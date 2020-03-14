const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSch = new Schema({

   user:{ type: Schema.Types.ObjectId, ref: 'user' },
   product: [
         {type: Schema.Types.ObjectId, ref: 'products' }
   ],
 size:{
    type: String
 }
   

})

module.exports = mongoose.model('cart',cartSch)
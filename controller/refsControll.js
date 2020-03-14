const refmod = require('../models/refs')
const mongoose = require('mongoose');
const reg = (req, res) =>{
  
  
  refmod.Story.
  findOne({ title: /casino royale/i }).
  populate('author', ['name', 'age']). // only return the Persons name
  then(data =>{
    console.log(data)
  })
  .catch(err =>{console.log(err)})
  // exec(function (err, story) {
  //   if (err) return handleError(err);

  //   console.log('The author is %s', story.author.name);
  //   // prints "The author is Ian Fleming"

  //   console.log('The authors age is %s', story.author.age);
  //   // prints "The authors age is null'
  // });

}

module.exports ={
    reg:reg
}
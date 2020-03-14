const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')




const register = async (req, res) => {
    const emailPatt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phPatt = /^\d{10}$/

    const today = new Date()
const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    userType: req.body.userType,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
    created: today
} 
    if(!emailPatt.test(req.body.email)){
        console.log(emailPatt.test(req.body.email))
        res.status(400).json({status:false, message:"enter valid email"})
    }
    else if(!phPatt.test(userData.mobile)){
        res.status(400).json({status:false, message:"enter valid mobile"})
    } 
   else if(req.body.userType == "admin"){
        userData.userType = "admin"
    }
   else if (req.body.userType == null || req.body.userType === 'undefined') {
       userData.userType = "user";
   }
    User.findOne({ mobile: req.body.mobile })
    .then(no => {
        if(no){
            res.status(400).json({status:false, message:"mobile number already exists"})
        }
        else if(!no){
             User.findOne({email:req.body.email})
             .then(async email =>{
                 if(email){ 
                    res.status(400).json({status:false, message:"email already taken"})
                 }
                 else{
                  
                    const salt = await bcrypt.genSalt(10);
                    userData.password = await bcrypt.hash(userData.password, salt);
                   await  User.create(userData)
                     .then(cData =>{
                        res.status(200).json({status:["success","registered successfully"], document:cData})
                     })
                     .catch(err =>{
                        res.status(404).json({status:["failed", err], })
                     })
                 }
             })
             .catch(err =>{
                 res.status(err)
             })
        }
    })
}; 



const read = async (req, res, next) => {



     var decoded = jwt.verify(req.headers['authorization'], 'secret' )
    
    User.findOne({_id:decoded._id})
      .then(user => {
          if(user){
              res.status(200).json(user)
          }
          else{
            res.status(500).json({error:'error'})
          }
        })
          .catch(err => {
              res.send(err)
          })
}

const login = (req, res) => {
    reqRegister = req.body;
    
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!pattern.test(reqRegister.email) && reqRegister.reqemail != ''){
        return res.status(400).json({success:false,
            message:'enter valid email'})
    }
    if(typeof reqRegister.password === 'undefined' || reqRegister.password === ''){
        return res.status(400).json({success:false,
            message:'enter valid password'})   
    }
   else{
    User.findOne({ email: reqRegister.email })
        .then(user => {
            console.log(user)
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // Passwords match
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        mobile:user.mobile,
                        location:user.location,
                        Gender:user.Gernder,
                        userType:user.userType,
                        owned:user.owned
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY || 'secretnehvaida', {
                        expiresIn: 14400
                    })
                    res.send(token)
                } else {
                    // Passwords don't match
                    res.json({ error: 'User does not exist' })
                }
            } else {
                res.json({ error: 'User does not exist 2' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
    }
    }


const update = async (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'] || req.body.token, 'secret')
    console.log(req.body.token); 
    const userData = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email,
        DOB:req.body.DOB,
        location:req.body.location
    }) 
    User.findOne({
        _id: decoded._id
    }).then(user => {
        if (typeof userData.first_name === 'undefined' || userData.first_name === '') {
            res.status(400).json({ message: 'First Name Was Not Entered' })
        }
        else if (userData.first_name.length < 2) {
            res.status(400).json({ message: 'first Name atleast contain three letters' })
        }
        else if (typeof userData.last_name === 'undefined' || userData.last_name === '') {
            res.status(400).json({ message: 'last Name Was Not Entered' })
        }
        else if (typeof userData.mobile === 'undefined' || userData.mobile === '') {
            res.status(400).json({ message: 'Phone Was Not Entered' })
        }
        else if (typeof userData.email === 'undefined' || userData.email === '') {
            res.status(400).json({ message: 'Email Was Not Entered' })
        }
        else if (userData.mobile.length > 10 || userData.mobile.length < 10) {
            res.status(400).json({ message: 'Please enter the valid phone number' })
        }

        else if(! /^\d{10}$/.test(userData.mobile )){
            return res.status(400).json({success:false,
               message:'enter valid PhoneNo'})
            }
        else if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email) && userData.reqemail != ''){
                    return res.status(400).json({success:false,
                            message:'enter valid email'})

            }
        else {
            if (user) {
                User.updateOne({ _id: decoded._id }, { $set: req.body }).then(users => { res.json(userData) })
                    .catch(err => { res.send('error: ' + err) })
            } else {
                res.json({ error: 'User does not exists' })
            }
        }
    })
        .catch(err => {
            res.send('error: ' + err)
        })
}
module.exports = {
    create: register,
    login: login,
    read: read,
    update: update
}
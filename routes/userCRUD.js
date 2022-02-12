const User = require('../DB models/User');
const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;

router.post('/editProfile', async (req, res) => {

    const newEmail = req.body.email;

    //get the currUser's id from the jwt 
    const token = req.cookies.jwt;

    try {
        if(token) {
            jwt.verify(token, 'v3rntio43nirofb', async (err,decodedToken) => {
                if(err) {
                    throw Error(err);
                } 
    
                else if(newEmail != "" && req.body.password) {

                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password,salt);

                    await User.findByIdAndUpdate(ObjectID(decodedToken.id), {email : newEmail, password : req.body.password});
                }
                else if(newEmail) {
                    await User.findByIdAndUpdate(ObjectID(decodedToken.id), {email : newEmail});
                }
                else if(req.body.password != "") {

                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password,salt);

                    await User.findByIdAndUpdate(ObjectID(decodedToken.id), {email : newEmail, password : req.body.password});
                }
            })
        } 
        else 
            throw Error('Invalid jwt token');

        console.log('User details updated Successfully!');
        res.redirect('/profilePage');
    } catch (err) {
        console.log(err);
    }
    
});

module.exports = router;
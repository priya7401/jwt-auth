const User = require('../DB models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const router = Router();

const saltRounds = 10;

router.get('/register', function(req,res) {
    res.render('register');
});

router.post("/register",  async function(req,res) {

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt);
    const newUser = new User ({
        email : req.body.email,
        password : req.body.password
    });

    try {
        newUser.save(err => {
            if(err) {
                throw Error(err);
            }
            else {
                //if there was no error in registering the new user, create a new jwt token and send the cookies to the client
                const token = createToken(newUser._id);

                res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge*1000});
                res.redirect('/profilePage');
                res.status(201).json({user : newUser._id});
            }
        });
    } catch(err) {
        console.log(err);
    } 
});

router.get('/login', function(req,res) {
    res.render('login');
});

router.post('/login', function(req,res) {

    const email = req.body.email, password = req.body.password;

    try {
        User.findOne({email : email},function(err,foundUser) {
            if(err) {
                throw Error(err);
            } else if(foundUser) {
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result === true) {    
                        const token = createToken(foundUser._id);
                        res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge*1000});
                        res.redirect("/profilePage");
                    }
                    else
                        throw Error('Invalid Password');
                });                
            }
        }); 
    } catch (err) {
        console.log(err);
    }
});

router.get('/logout', (req,res) => {
    //deleting the jst cookie on client-side
    //we can't exactly delete the cookie, so jst replace the jwt cookie on the browser with an empty cookie with a very small expiryTime of 1ms
    res.cookie('jwt', "", { maxAge : 1 });
    res.redirect('/');
});

const maxAge = 3 * 24 * 60 * 60;    //3 days
const createToken = (id) => {

                //payload, secretKey, header
    return jwt.sign( {id}, 'v3rntio43nirofb', {
        expiresIn : maxAge
    });
}

module.exports = router;
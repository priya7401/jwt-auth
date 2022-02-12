const jwt = require('jsonwebtoken');

const Authorize = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
                   //payload/token, secret
        jwt.verify(token, 'v3rntio43nirofb', (err,decodedToken) => {
            if(err) {
                res.redirect('/');
            }
            else {
                // console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/');
    }
}

module.exports = { Authorize };
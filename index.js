const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes.js');
const {Authorize} = require('./middleware/authMiddleware');
const userCRUD = require('./routes/userCRUD');

const app = express();
const port = 3000;

// view engine
app.set('view engine', 'ejs');  //to use ejs

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));  //render static files on website
app.use(express.json());
app.use(cookieParser());

// database connection
main().catch(err=> console.log(err));

	async function main() {
  	    await mongoose.connect('mongodb://localhost:27017/testDB');
	}


// routes
app.get("/", (req,res) => res.render("home"));
app.get("/profilePage", Authorize, (req,res) => res.render('userPage'));

app.use(authRoutes);
app.use(userCRUD);

app.listen(port,function(req,res) {
    console.log("Server started at port: 3000");
});





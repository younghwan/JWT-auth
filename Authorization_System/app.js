// Load Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// DB Settings
const dbConnect = require('./db/db.js');
dbConnect.connect()

// EJS Settings
app.set("view engine", "ejs")
app.engine('html',require('ejs').renderFile)
app.use(express.static(__dirname + '/views'));

// Parser and URL-encoded
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// Routes
app.use("/", require('./routes/login'))
app.use("/signup", require('./routes/signup'))
app.use("/home",require('./routes/home'))
app.use("/manage",require('./routes/manage'))

// Open server
var port = 3000;
app.listen(port,() => {
    console.log("Server Running")
})
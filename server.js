const express = require('express');
const bodyParser = require('body-parser');
const dbCont = require('./lib/db/dbcontroller');

const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    console.log(log);
    next();
});

// you might want to remove this line if you decide to introduce login with sessions
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');      
});

app.get('/user-form', (req, res) => {
    res.sendFile(__dirname + '/public/login-form.html');
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/public/success.html')
});

app.post('/login', (req, res) => {
    // console.log(req.body);
    if(req.body.uname == "admin" && req.body.passwd == "Root@123")
    //this is a sample login interface, insert session creation here if you implement that
        res.redirect('/user-form');
    else
        res.redirect('/'); 
});

app.post('/validate', (req, res) => {
    
    dbCont.dbPush(req.body);

    //redirect to confirmation page instead of home page
    res.redirect('/success');
});


app.listen(port, () => console.log(`Started server on port ${port}`));
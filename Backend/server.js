const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const passport = require('./auth/passport');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser('lambrghiniaventador'));
app.use(expressSession({
    secret: 'lamborghiniaventador',
    resave: false,
    saveUninitialized: false,
    cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require("./routes/api"));

// app.use('/', require('./routes/api/teacher'));

// app.use('/', express.static(__dirname+"/public_static"));
// app.get('/', (req, res)=>{
//     return res.status(200).send("Hello,<br> Welcome to the first page")
// })


app.listen(8585, function(){
    console.log("Backend Server running on port : 8585");
})

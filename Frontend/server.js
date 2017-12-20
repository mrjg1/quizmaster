const express = require('express');
const cors = require('cors')
const app=express();
const ip = require('../ip');
//ip = '192.168.178.23'
//app.use ( express.static("static") );

app.use(cors());

app.use('/', express.static(__dirname+"/static"));

app.get('*', function(req, res) {
    // var error = new Error();
    // err.status = 404;
    // next(err);
    res.redirect('/');
    //console.log("reached get *");
});

// app.use(function(err, req, res, next){
//     if(err.status!==404){
//         return next();
//     }
//     res.redirect(ip+':2324/');
// })




app.listen(2324, ip.ip_address, function(){
    console.log("Frontend Server running on port 2324");
});
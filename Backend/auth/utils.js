function ensureLoggedIn(redirPath) {
    
    return function (req, res, next) {
    
        if (!req.user) {
            //alert ("You have been logged out!");
            console.log("User does not exist")
        //res.redirect(redirPath)
        } else {
            next();
        }
    
    }
}
//Encryption Algorithm

var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'aventador';

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

//The below function has nothing to do with the authorization process.
//It is used to find the results of the students who gave the test

function calc_marks(student_ans, correct_ans, no_of_ques){
    count=0;
    for(i=0; i<no_of_ques; i++){
        if(student_ans[i]==correct_ans[i]){
            count++;
        }
    }
    return count;
}
module.exports={
    eli: ensureLoggedIn,
    calc_marks,
    encrypt
}

    
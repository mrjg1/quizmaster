const route = require('express').Router();
const encrypt = require('../../auth/utils').encrypt;
const Teacher = require('../../db/models').Teacher;
const Question = require('../../db/models').Question

route.get('/:passkey', (req, res)=>{
    if(encrypt(req.params.passkey)=="c36f73fa1ca91038e490b9dbb6a583dd"){
        return res.status(200).send({key: true, message: "Administrator Authorized"});    
    }
        return res.status(200).send({key: false, message: "Incorrect Pass Key"});
})
    
route.post('/createlogin', (req, res)=>{
    Teacher.findOne({
        where: {
            username: encrypt(req.body.username)
        }
    })
    .then((row)=>{
        if(row!=null){
            return res.send({key: false, message: "Username already exists.\nPlease try again!"});
        }
        Teacher.create({
            username: encrypt(req.body.username),
            password: encrypt(req.body.password)
        })
        .then((new_signin)=>{
            return res.status(200).send({key: true, message: "Login ID created successfully"})
        })
        .catch((err)=>{
            return res.status(500).send({key: false, message: "Error in database :"+err});
        })
    })
    
})

route.delete('/:username', (req, res)=>{
    Teacher.destroy({
        where: {
            username: encrypt(req.params.username)
        }
    })
    .then((row)=>{
        if(row==0){
            return res.status(200).send({key: false, message: "This User-Id does not exist"});    
        }
        Question.destroy({
            where: {
                teach_id: encrypt(req.params.username)
            }
        })
        .then((rows)=>{
            return res.status(200).send({key: true, message: "User deleted successfully."});
        })
        
    })
    .catch((err)=>{
        return res.status(500).send({key: false, message: "Database error occured while deleting question: "+err});
    })
})

module.exports = route;

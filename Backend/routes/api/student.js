const route = require('express').Router();

const Question = require('../../db/models').Question;
const Paper = require('../../db/models').Paper;
const Student = require('../../db/models').Student;

route.get('/batch', (req, res)=>{
    Paper.findOne({attributes: ['batch', 'timer']})
    .then((row)=>{
        if(!row){
            return res.send({key: false, message: "Paper has not been set. Please contact concerned Teacher"})
        }
        return res.send(row)
    })
    .catch((err)=>{
        return res.send({key: false, mssage: "Database error occured!"})
    })
})

route.get('/teacher', (req, res)=>{
    Paper.findOne({attributes: ['teach_id']})
    .then((row)=>{
        if(!row){
            return res.send({key: false, mssage: "Paper has not been set. Please contact concerned Teacher"})
        }
        return res.send(row)
    })
    .catch((err)=>{
        return res.send({key: false, mssage: "Database error occured! "+err.message})
    })
})


route.get('/questions/:teach_id', (req, res)=>{
    Question.findAll({attributes: ['id', 'question_text', 'optiona', 'optionb', 'optionc', 'optiond'],
        where: {
            teach_id: req.params.teach_id
        }})
        .then((rows)=>{
            if(!rows){
                return res.send({key: false, mssage:"No questions available for current test."});
            }
            return res.status(200).send(rows);
        })
        .catch((err)=>{
            return res.send({key: false, mssage: "Database error occured! "+err.message})
        })
}) 

route.post('/submit', (req, res)=>{
    Student.findOne({
        where: {
            $or: [
                {ipaddress: req.connection.remoteAddress},
                {rollno: req.body.rollno}
            ]}
    })
    .then((row)=>{
        if(!row){
            Student.create({
                ipaddress: req.connection.remoteAddress,
                rollno: req.body.rollno,
                answers: req.body.answers
            })
            .then((new_item)=>{
                return res.send({key: true, message: "Your answers saved successfully"});
            })
            .catch((err)=>{
                return res.send({key: false, message: "Database Error while saving the submission : "+err.message});
            })
        }
        else{
            return res.send({key: false, message: "A submission from this computer or from the same Roll Number has already been recorded. Answers could not be saved."});
        }
    })
})

module.exports= route;
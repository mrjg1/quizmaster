const route = require('express').Router();
const passport = require('../../auth/passport');
const eli = require('../../auth/utils').eli;
const calc_marks = require('../../auth/utils').calc_marks;
const encrypt = require('../../auth/utils').encrypt;
const Question = require('../../db/models').Question;
const Teacher = require('../../db/models').Teacher;
const Student = require('../../db/models').Student;
const Paper = require('../../db/models').Paper;
const ip = require('../../../ip');

route.post('/login', passport.authenticate('local', {
    successRedirect: 'http://'+ip.ip_address+':8585/api/teacher/success',
    failureRedirect: 'http://'+ip.ip_address+':8585/api/teacher/failure',
    failureFlash: true},
))

route.get('/success', (req,res)=>{
    return res.status(200).send({key:true, message: 'Successfully Logged In'})
})

route.get('/failure', (req, res)=>{
    return res.send({key: false, message: 'Invalid username or password!'})
})

route.get('/logout', (req, res)=>{
    req.user = null;
    req.logout();
    req.session.destroy(function () {
        console.log("Successfully Logged Out");
    })
    return res.status(200).send({key:true, message: 'Logged Out Successfully!'})
})

route.get('/question/:id', (req, res)=>{
    Question.findOne({
        where: {
            teach_id: encrypt(req.params.id)
        }
    })
    .then((rows)=>{
        res.status(200).send(rows);
    })
    .catch((err)=>{
        res.status(500).send({key: false, message: err.message});
    })
})

route.get('/questions/:id', (req, res)=>{
    Question.findAll({
        where: {
            teach_id: encrypt(req.params.id)
        }
    })
    .then((rows)=>{
        res.status(200).send(rows);
    })
    .catch((err)=>{
        res.status(500).send({key: false, message: err.message});
    })
})

route.post('/add', (req, res)=>{
    Question.create({
        teach_id: encrypt(req.body.teach_id),
        question_text: req.body.question_text,
        optiona: req.body.optiona,
        optionb: req.body.optionb,
        optionc: req.body.optionc,
        optiond: req.body.optiond,
        correct: req.body.correct,
    })
    .then((new_question)=>{
        return res.status(200).send({key: true, message: "Question added successfully!"});
    })
    .catch((err)=>{
        return res.status(500).send({key: false, message: "Error while adding question to the database : "+err});
    })
    
})

route.post('/update', (req, res)=>{
    Question.update({
        question_text: req.body.question_text,
        optiona: req.body.optiona,
        optionb: req.body.optionb,
        optionc: req.body.optionc,
        optiond: req.body.optiond,
        correct: req.body.correct,
    }, {
        where : {
            id: req.body.id
        }
    })
    .then((updated_question)=>{
        return res.status(200).send({key: true, message: "Question updated successfully!"});
    })
    .catch((err)=>{
        return res.status(500).send({key: false, message: "Error while updating question in the database : "+err});
    })
    
})

route.delete('/:id', (req, res)=>{
    Question.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((row)=>{
        if(row==0){
            return res.send({key: false, message: "Error while deleting the question!"});    
        }
        return res.status(200).send({key: true, message: "Question deleted successfully."});
    })
    .catch((err)=>{
        return res.status(500).send({key: false, message: "Database error occured while deleting question: "+err});
    })
})

route.get('/deleteall/:id', (req, res)=>{
    Question.destroy({
        where: {
            teach_id: encrypt(req.params.id)
        }
    })
    .then((number)=>{
        if(number==0){
            return res.send({key: false, message: "Error while deleting the questions!"});    
        }
        return res.status(200).send({key: true, message: "Question deleted successfully."});
    })
})

route.post('/set_paper', (req, res)=>{
    Paper.destroy({
        where: {}
    })
    .then((row)=>{
        Paper.create({
            teach_id: encrypt(req.body.username),
            batch: req.body.batch,
            timer: req.body.timer
        })
        .then((t)=>{
            return res.status(200).send({key: true, message: "Paper has been set"});
        })
    })
    .catch((err)=>{
        return res.status(500).send({key: false, message: "Database error ocurred"});
    })
})

route.get('/marks/:id', (req, res)=>{
    var ans_correct='';
    Question.findAndCountAll({
        where: {
            teach_id: encrypt(req.params.id)
        },
        attributes: ['correct']
    })
    .then((data)=>{
        if(data.count==0){
            return res.send({key: false, message:"Unable to fetch correct answers from the database"})
        }
        for(i=0; i<data.count; i++)
        {
            ans_correct+=data.rows[i].correct;
        }      
        Student.findAndCountAll({
            attributes: ['rollno', 'answers']
        })
        .then((student_data)=>{
            if(student_data.count<1){
                return res.send({key: false, message:"Student Records not found!"});
            }
            student_data.rows.forEach(function(element, index) {
                var m=calc_marks(element.answers, ans_correct, data.count)
                Student.update(
                    {marks: m},
                        {
                            where: {
                                rollno: element.rollno
                            }
                        }
                )
                .then((r)=>{
                    if((index+1)==student_data.count){
                        return res.send({key: true, message:"Marks have been calculated successfully!"});
                    }
                })
            }, this);
        }) 
    })
    .catch((err)=>{
       return res.send({key: false, message:"Database error occured : "+ err.message});
    })
})

route.get('/result', (req, res)=>{
    Student.findAll({
            attributes: ['rollno', 'marks']
    })
    .then((student_data)=>{
        if(!student_data){
            return res.send({key: false, message:"Student Records not found!"});
        }
        return res.send(student_data);
    })
    .catch((err)=>{
       return res.send({key: false, message:"Database error occured : "+ err.message});
    })
})

route.get('/record', (req, res)=>{
    Student.findAll({
            attributes: ['ipaddress', 'rollno', 'answers', 'marks']
    })
    .then((student_data)=>{
        if(!student_data){
            return res.send({key: false, message:"Student Records not found!"});
        }
        return res.send(student_data);
    })
    .catch((err)=>{
       return res.send({key: false, message:"Database error occured : "+ err.message});
    })
})

route.get('/delete_records', (req, res)=>{
    Student.destroy({
        where: {}
    })
    .then((row)=>{
        console.log(row);
        if(row<1){
            return res.send({key: false, message: "No student records were present in the database"});    
        }
        return res.send({key: true, message: "Student records have been deleted successfully!"});
    })
    .catch((err)=>{
        return res.send({key: false, message: "Database error ocurred"+err.message});
    })
})

module.exports = route;
const Sequelize = require('sequelize');

const db = new Sequelize({
    username: 'quizmaster',
    password: 'quizapplication',
    database: 'quiz',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const Question = db.define('questions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teach_id: Sequelize.STRING,
    question_text: Sequelize.STRING,
    optiona: Sequelize.STRING,
    optionb: Sequelize.STRING,
    optionc: Sequelize.STRING,
    optiond: Sequelize.STRING,
    correct: Sequelize.STRING,
});


const Student = db.define('students', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ipaddress: Sequelize.STRING,
    rollno: Sequelize.STRING,
    answers: Sequelize.STRING,
    marks: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});


const Teacher = db.define('teachers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});

const Paper = db.define('papers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teach_id: Sequelize.STRING,
    batch: Sequelize.INTEGER,
    timer: Sequelize.INTEGER
})


db.sync({force: false}).then(()=>{
    console.log("Database synchronised");
})

module.exports = {
    Question, 
    Student,
    Teacher,
    Paper
};
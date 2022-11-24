//const fs = require("fs")
//let students = []

const Sequelize = require('sequelize');


var sequelize = new Sequelize('sloycxak', 'sloycxak', 'O96emZ3ij490axdp6dNrQv_wpqyuWTSE', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});


sequelize
    .authenticate()
    .then(function() {
        console.log('Connection established');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

let Student = sequelize.define('Student',{
    StudId: {type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
    name:Sequelize.STRING,
    program: Sequelize.STRING,
    gpa: Sequelize.FLOAT
});

function prep(){
    return new Promise((resolve,reject)=>{
        sequelize.sync().then(resolve(),reject("Unable to connect to database"))
    })
    
}

function addStudent(student){
    return new Promise( (resolve,reject)=>{
        Student.create(student).then(resolve(),reject("Unable to add student"))
    } )
}

function cpa(){
    return new Promise( (resolve,reject)=>{
        Student.findAll({where:{program:"CPA"}})
        .then(result=>resolve(result),err=>reject("Unable to retrive data"))
    } )
}

function highGPA(){
    return new Promise( (resolve,reject)=>{
        Student.findOne({order:[["gpa","DESC"]]})
        .then(result=>resolve(result),err=>reject("Unable to retrive data"))
    })
}

function allStudents(){
    return new Promise( (resolve,reject)=>{
        Student.findAll()
        .then(result=>resolve(result),err=>reject("Unable to retrive data"))
    } )
}

function getStudent(studentId){
    return new Promise( (resolve,reject)=>{
        Student.findOne({where:{StudId:studentId}})
        .then(result=>resolve(result),err=>reject("Unable to retrive data"))
    })
}




module.exports = {
   prep,
   cpa,
   highGPA,
   allStudents,
   addStudent,
   getStudent,
   
}
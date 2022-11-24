const fs = require("fs")

let students = []

function prep(){
    return new Promise( 
        (resolve,reject)=>{
    
        fs.readFile('./students.json',(err,data)=>{
            if (err)reject("Unable to read file")
            students = JSON.parse(data);
            resolve()
        })
    })
}

function allStudents(){
    return new Promise( (resolve,reject)=>{
        if (students.length==0){reject("No students found!");} 
        else{resolve(students);}
    });
}

function cpa(){
    return  new Promise( (resolve,reject)=> {
        let results = [];
        if (students.length==0){reject("no results returned")}
        else{
            for (let s of students){
                if (s.program=="CPA"){results.push(s);}
            }
            resolve(results)
        }
    }) 
}

function highGPA(){
    return  new Promise( (resolve,reject)=> {
        if (students.length==0){reject("No Data Found!")}
       let highestGPA = 0
       let highestStudentIndex
       for (let i=0;i<students.length;i++){
        if (students[i].gpa > highestGPA){
            highestGPA = students[i].gpa
            highestStudentIndex = i
        }
       }
       resolve(students[highestStudentIndex])
    }) 
}

function getStudent(studentId){
    return new Promise( (resolve,reject)=>{
        for (let s of students){
            if (s.studId==studentId){resolve(s);}
        }
        reject("No record found");
    } )
}


function addStudent(student){
    return new Promise( (resolve,reject)=>{
        if (student!=undefined){
            student.studId=students.length+1;
            students.push(student);
            resolve(student);            
        }else{
            reject("Unable to add student!")
        }


    } )
}




module.exports = {
   prep,
   cpa,
   highGPA,
   allStudents,
   addStudent,
   getStudent,
   
}
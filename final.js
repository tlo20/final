const mongoose = require("mongoose")
let finalUsersSchema,finalUser;
const bcrypt = require("bcryptjs")

function startDB(){
    return new Promise((resolve,reject)=>{
        const db = mongoose.createConnection("mongodb+srv://root:web_a6@cluster0.gkmnbul.mongodb.net/?retryWrites=true&w=majority")
        db.on('connected',()=>{
            finalUsersSchema = new mongoose.Schema({
                "email": {type:String,unique:true},
                "password" : String
            })
            finalUser = db.model("finalUsers",finalUsersSchema)
            console.log("DB connection successful.")
            resolve()
        })

        db.on('error',(err)=>{
            console.log("Cannot connect to DB.")
            reject(err)
        })
    })
}

function register(user){
    return new Promise((resolve,reject)=>{
        //check password
        if(
            user.email==undefined||user.password==undefined||
            user.email.trim().length==0 ||user.password.trim().length==0
        ){
            reject("Error: email or password cannot be empty.")
        }
        bcrypt.hash(user.password,10).then(hash=>{
            user.password = hash
            let newfinalUser = new finalUser(user)
            newfinalUser.save().then(success=>{
                resolve()
            }).catch(
                err=>{
                    if(err.code==11000){
                        reject(`Error: ${user.email} already exists.`)
                    }else{
                        reject("Error: cannot create the user.")
                    }
                    
                }
            )
        })
    })
}

function signIn(user){
    return new Promise((resolve,reject)=>{
        finalUser.findOne({"email":user.email})
        .exec()
        .then(result=>{
            bcrypt.compare(user.password,result.password)
            .then(samepassword=>{
                if(!samepassword){
                    reject(`Incorrect password for user ${user.email}`)
                }else{
                    resolve(user)
                }
            })
        })
        .catch(err=>{
            reject(`Cannot find the user: ${user.email}`)
        })
    })
}



module.exports = {
    startDB,
    register,
    signIn
}
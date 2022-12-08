// Cyclic app link: https://clever-ruby-dress.cyclic.app/

const express = require("express")
const { readSync } = require("fs")
const path = require("path")
const app = express()
const service = require("./final")
const port = 8080

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./finalViews/home.html"))
})

app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname,"./finalViews/register.html"))
})

app.post("/register",(req,res)=>{
    service.register(req.body).then(result=>{
        res.send(`${req.body.email} registered successfully.
        <br/><a href="./">Go Home</a>` )
    }).catch(err=>{
        res.send(err)
    })
})

app.get('/signIn',(req,res)=>{
    res.sendFile(path.join(__dirname,"./finalViews/signIn.html"))
})

app.post("/signIn",(req,res)=>{
    service.signIn(req.body).then(result=>{
        res.send(`${req.body.email} signed in successfully.
        <br/><a href="./">Go Home</a>` )
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
})

app.get("*",(req,res)=>{
    res.send("Not Found")
})

service.startDB().then(success=>{
    app.listen(port,()=>{
        console.log(`Express http server listening on ${port}`)
    })
}).catch(err=>{
    console.log(err)
})


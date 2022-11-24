// Cyclic app link: https://tame-erin-caridea-slip.cyclic.app/

const express = require("express")
const path = require("path")
const app = express()
const data = require("./data_prep")
const exphbs = require('express-handlebars')

//handle bars
app.engine('.hbs', exphbs.engine({
    extname:'.hbs'
    }
) )
app.set('view engine','.hbs')
app.set('views','./views')
app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
    });
//end of handle bar

let port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.render('home')
})

app.get("/CPA",(req,res)=>{
    data.cpa().then(result=>{
       
        res.render("students",{students:result})
    },err=>{
        res.send(err)
    } )
})

app.get("/highGPA",(req,res)=>{
   
    data.highGPA().then(result=>{
        res.render("student",{siglestudent:result})
    },err=>{
        res.send(err)
    })

})

app.get("/allstudents",(req,res)=>{
    data.allStudents().then(result=>{
        res.render("students",{students:result})
    },err=>{
        res.send(err)
    } )
})

app.get("/addStudent",(req,res)=>{
    res.sendFile( path.join(__dirname,'./test3_views/addStudent.html') )
})

app.post("/addStudent",(req,res)=>{
   data.addStudent(req.body).then( result=>{
        res.render("student",{siglestudent:result})
   },err=>{
    res.send(err)
   } )
})

app.get('/student/:studId',(req,res)=>{
    data.getStudent(req.params.studId).then(result=>{
        res.render("student",{siglestudent:result})
    },err=>{
        res.send(err)
    } )
})

app.use((req, res, next) => {
    res.status(404).send("Error 404: page not found.")
  })

data.prep().then(result=>{
    app.listen(port,()=>{
        console.log(`Express http server listening on ${port}`)
    })
},err=>{
    console.log("Unable to start up server", err)
})
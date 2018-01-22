'use strict'
var BoxController=require("../controlers/controler-box"),
    express=require("express"),
    session=require("express-session"),
    app=express.Router();



app.use(session({
  secret:"12qwaszx",
  resave:false,
  saveUninitialized:true
}))



/*Routing*/


app

.post("/", BoxController.getAll)

.post("/missulogin", BoxController.dataMissU)

.post("/login" , BoxController.validateUser)

.post("/content-manipulation", BoxController.dataContent)

.post("/TrueStory|StoryCubes|ShortStories|WeeklyJarys",BoxController.getHistoryByCategory)


.get("/",(req,res)=>{
	res.render("index")
})

.get("/TrueStory|StoryCubes|ShortStories|WeeklyJarys", BoxController.routingByCategory)

.get("/Stories/:id",BoxController.getHistoriesById)

.get("/login", BoxController.loginview)

.get("/content-manipulation", BoxController.contenManip)


module.exports=app
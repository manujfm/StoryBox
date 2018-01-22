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






.get("/",(req,res)=>{
	res.render("index")
})

.get("/TrueStory", BoxController.getHistoriesByCategorie)

.get("/StoryCubes", BoxController.getHistoriesByCategorie)

.get("/ShortStories", BoxController.getHistoriesByCategorie)

.get("/WeeklyJarys", BoxController.getHistoriesByCategorie)

.get("/Stories/:id",BoxController.getHistoriesById)

.get("/login", BoxController.loginview)

.get("/content-manipulation", BoxController.contenManip)


module.exports=app
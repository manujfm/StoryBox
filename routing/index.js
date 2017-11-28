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
.post("/login" , BoxController.validateUser)

.post("/content-manipulation", BoxController.dataContent)

.get("/", BoxController.getAll)

.get("/TrueStory", BoxController.getHistoriesTS)

.get("/StoryCubes", BoxController.getHistoriesSC)

.get("/ShortStories", BoxController.getHistoriesSS)

.get("/WeeklyJarys", BoxController.getHistoriesWJ)

.get("/Stories/:id",BoxController.getHistoriesById)

.get("/login", BoxController.loginview)

.get("/content-manipulation", BoxController.contenManip)


module.exports=app
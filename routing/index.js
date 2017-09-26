'use strict'
var BoxController=require("../controlers/controler-box")
    express=require("express"),
    app=express.Router();

function error404(rep,res){
  let error=new Error(),
  locals={
    title:'Error 404',
    description: 'No se encontro el recurso',
    error:error
  }
  error.status=404
  res.render('error',locals)
}



/*Routing*/


app

.get("/", BoxController.getAll)

.get("/TrueStory", BoxController.getHistoriesTS)

.get("/StoryCubes", BoxController.getHistoriesSC)

.get("/ShortStories", BoxController.getHistoriesSS)

.get("/WeeklyJarys", BoxController.getHistoriesWJ)

.get('/histories/:id',BoxController.getHistoriesById)

.get("/Genre",(rep,res)=>{

  res.render("genre");

})
//.use(error404)

module.exports=app
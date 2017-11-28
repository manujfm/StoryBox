
'use strict'
var express=require("express"),
app=express(),
jade=require('jade'),
restFull=require('express-method-override')('_method'),
route=require('./routing/index'),
body_parser=require("body-parser"),
cookie_parser=require("cookie-parser"),
file_upload=require("express-fileupload")
port=(process.env.PORT||8080)

function error404(rep,res,next){
  let error=new Error(),
  locals={
    title:'Error 404 :(',
    description: 'The resource was not found',
    error:error
  }
  error.status=404
  res.render('error',locals)
}

app
.set('views','views')
.set("view engine","jade")
.set('port',port)
.use(file_upload())
.use(cookie_parser())
.use(restFull)
.use(body_parser.urlencoded({extended:true}))
.use('/',route)
.use(express.static('public'))
.use(error404)
module.exports=app
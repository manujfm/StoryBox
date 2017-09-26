
var express=require("express"),
app=express(),
jade=require('jade'),
restFull=require('express-method-override')('_method'),
route=require('./routing/index'),
port=(process.env.PORT||8080)

app
.set('views','views')
.set("view engine","jade")
.set('port',port)
.use(restFull)
.use('/',route)
.use(express.static('public'))

module.exports=app
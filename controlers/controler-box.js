'use strict'

var BoxModel=require('../model/sql-models'),

    BoxController=()=>{}

    BoxController.getAll=(req,res,next)=>{

    	BoxModel.getAll((err,row)=>{
    		if(err){
    			let local={
    				data:'Error de sintaxis'
    			}

    			res.render('error')
    		}else{
    			let locals={
    				data:row
    			}
    			res.render('index',locals)
    		}
    	})
    }

    BoxController.getHistoriesTS=(req,res,next)=>{
    	BoxModel.getCategorriesByID(2,(err,row)=>{
    		if(err){
    			let local={
    				data:'Error de sintaxis'
    			}

    			res.render('error')
    		}else{
    			let locals={
    				data:row
    			}
    			res.render("trueStory",locals);
    		}
    	})
    }

    BoxController.getHistoriesWJ=(req,res,next)=>{
    	BoxModel.getCategorriesByID(1,(err,row)=>{
    		if(err){
    			let local={
    				data:'Error de sintaxis'
    			}

    			res.render('error')
    		}else{
    			let locals={
    				data:row
    			}
    			res.render("weeklyjarys",locals);
    		}
    	})
    }

    BoxController.getHistoriesSS=(req,res,next)=>{
    	BoxModel.getCategorriesByID(3,(err,row)=>{
    		if(err){
    			let local={
    				data:'Error de sintaxis'
    			}

    			res.render('error')
    		}else{
    			let locals={
    				data:row
    			}
    			res.render("shortStories",locals);
    		}
    	})
    }

    BoxController.getHistoriesSC=(req,res,next)=>{
    	BoxModel.getCategorriesByID(4,(err,row)=>{
    		if(err){
    			let local={
    				data:'Error de sintaxis'
    			}

    			res.render('error')
    		}else{
    			let locals={
    				data:row
    			}
    			res.render("storyCubes",locals);
    		}
    	})
    }

    BoxController.getHistoriesById=(req,res,next)=>{

    	BoxModel.getHistoriesById(req.params.id,(err,row)=>{
    		if(err){
    			let local={
    				data:'Error de sintaxis'
    			}

    			res.render('error')
    		}else{
    			 let local= {
                    data:row,
                    ref:req.protocol + '://' + req.get('host') + req.originalUrl
       	            }
       	       res.render("histories/histories",local);
    		}
    	})
    }

 module.exports= BoxController
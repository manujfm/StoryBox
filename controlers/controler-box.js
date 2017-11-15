'use strict'

var BoxModel=require('../model/sql-models'),
    bcrypt=require('bcrypt-nodejs'),
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

    BoxController.loginview=(req,res,next)=>{
        res.render("login")
        next()
    }

    BoxController.validateUser=(req,res,next)=>{
     // console.log(req.body.password)
        BoxModel.getUser(req.body.user,(err,row)=>{
            if(row!=""){
               BoxModel.getUserData(row[0].id,(err,rowData)=>{
                 bcrypt.compare(req.body.Password,rowData[0].password,(err,valid)=>{
                    //console.log(valid)
                    var message="Contraseña Incorrecta";
                    if(valid){
                        req.session.user="manuel" 
                        res.redirect("/content-manipulation")
                    }else{
                      res.render("login",{message})}
                 })
               })
            }else{
                var message="No está registrado como usuario"
                res.render("login",{message})
            }
        })    
    }

    BoxController.contenManip=(req,res,next)=>{
        //console.log(req.session.user)
        var user=req.session.user
        res.render("content-manipulation",{user})
    }

    BoxController.dataContent=(req,res,next)=>{
       // console.log(req.body)
       // console.log(req.files.file_upload.mimetype)

       const dir_file='/home/storybox/public/doc/images/';
       const dir_file_cube='/home/storybox/public/doc/cubesimages/';

       // const dir_file='C:/xampp/htdocs/storybox/public/doc/images/';
        //const dir_file_cube='C:/xampp/htdocs/storybox/public/doc/cubesimages/';
        
        var date= new Date();
        
        let file_name=req.files.file_upload.name;
        let file_type=req.files.file_upload.mimetype;

        var file_newname=date.getDate().toString()+(date.getMonth()+1).toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()+"."+file_type.split("/")[1];


        req.files.file_upload.mv(dir_file+file_newname,(err)=>{
           
           if(err){
                console.log(err)
                console.log("Error al subir el archivo")
                res.render('error',{err:err})
            }else{

              if(req.files.file_upload_cube){
                let file_name_cube=req.files.file_upload_cube.name;
                let file_type_cube=req.files.file_upload_cube.mimetype;        
                var file_newname_cube=date.getDate().toString()+(date.getMonth()+1).toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()+"."+file_type_cube.split("/")[1];             

                req.files.file_upload_cube.mv(dir_file_cube+file_newname_cube,(err)=>{
                     if(err){
                        console.log(err)
                        console.log("Error al subir el archivo 2")
                        res.render("error",{err:err})
                     }else{
                       BoxModel.insertData(req.body,'doc/images/'+file_newname,'../doc/images/'+file_newname_cube,(err,row)=>{
                          if (err) {
                              console.log(err)
                              res.render("error",{err:err})
                          }else {
                              res.redirect("/content-manipulation")
                              res.end();

                          }
                        
                       })

                    }


                 })

              }else{

                BoxModel.insertData(req.body,'doc/images/'+file_newname,null,(err,row)=>{
                  if (err) {
                    console.log(err)
                    res.render("error",{err:err})
                  }else {
                     res.redirect("/content-manipulation")
                     res.end();

                  }

              })


            }

          }

        })






                //})   
           // }
      // })
    }

    BoxController.error=(req,res,next)=>{
     res.render('error', data)
    }



 module.exports= BoxController
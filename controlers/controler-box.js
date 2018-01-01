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
    				data:'Error de sintaxis 1'
    			}
          
    			console.log('Error de sintaxis 1')
    		}else{
           BoxModel.getNext(req.params.id,(err,next)=>{
              if(err){
                let local={
                 data:'Error de sintaxis 2'
                }

                console.log('Error de sintaxis 2')
              }else{
                BoxModel.getPrev(req.params.id,(err,prev)=>{
                  if(err){
                    let local={
                      data:'Error de sintaxis 3'
                    }
                  }else{
                    next=(next=="")?"":next[0].id
                    prev=(prev=="")?"":prev[0].id

                    row[0].licenseScript=row[0].licenseScript.replace(/-/g,"'")
                
                    let local= {
                      data:row,
                      next:next,
                      prev:prev,
                      ref:req.protocol + '://' + req.get('host') + req.originalUrl
                      }
                    //console.log(local)
                      res.render("histories/histories",local);
                  } 
                })
              }
            })
        }
      })
    }

    BoxController.loginview=(req,res,next)=>{
        
        res.render("login")   
               }


    BoxController.validateUser=(req,res,next)=>{
     // console.log(req.body.password)
        BoxModel.getUser(req.body.user.toLowerCase(),(err,row)=>{
            if(row!=""){
               BoxModel.getUserData(row[0].id,(err,rowData)=>{
                 bcrypt.compare(req.body.Password,rowData[0].password,(err,valid)=>{
                    //console.log(valid)
                    var message="Contraseña Incorrecta";
                    if(valid){
                        req.session.times=rowData[0].times
                        req.session.user="manuel" 
                       // console.log(req.session.times)
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
       BoxModel.getAll((err,row)=>{
          if(err){
            let local={
              data:'Error de sintaxis'
            }

            res.render('error')
          }else{

            let locals={
              data:row,
              user:req.session.user,
              time:req.session.times
            }

            res.render("content-manipulation",locals)
          }
        })
    }

    BoxController.dataContent=(req,res,next)=>{
      var data=req.body,
      tam=Object.keys(data).length;
      // console.log(req.files.file_upload.mimetype)
      if(req.body.idMod!=null&&tam!=1){
        
                //console.log('Modificar') 
        modifyConten(req,res,next)

      }else if (tam==1&&req.body.idDel==null) {

               //console.log('Traer Contenido')
        getModifyContent(req,res,next) 

      }else if(tam==1&&req.body.idDel!=null){ 

              //console.log('Eliminar Contenido')
        deleteContent(req, res, next)

      }else{

              //console.log('Agregar Contenido') 
        insertContent(req,res,next);

      }
    }

    BoxController.dataMissU=(req,res,next)=>{
      BoxModel.updateUserTimes(req.body.count,(err,row)=>{
        if(err){
          console.log('ERRRORRRRRRR')
        }else{
          res.send("Update Exitoso")
        }
      })
    }


var deleteContent=(req, res, next)=>{
  BoxModel.deleteData(req.body.idDel, req.body,(err,row)=>{
    if(err){
      console.log("Error de sintaxis(DELETE)")
    }else{
       res.send("Delete exitoso")
       res.redirect("/content-manipulation")
       res.end();
    }
  })
}

var modifyConten=(req, res, next)=>{
   BoxModel.updateData(req.body.idMod, req.body,(err,row)=>{
     if(err){
       console.log("Error de sintaxis(UPDATE)")
     }else{
       console.log("Update exitoso")
       res.redirect("/content-manipulation")
       res.end();

     }
   })
}    


var getModifyContent=(req,res,next)=>{

    BoxModel.getHistoriesById("id="+req.body.idHistory,(err,row)=>{
        if(err){
          let local={
            data:'Error de sintaxis 1'
          }
          
          console.log('Error de sintaxis 1')
        }else{

          let local={
            data:row,
            error:null
          }

          res.send(local)
        }
      })  
}


var insertContent=(req, res, next)=>{
       //Server  
       const dir_file='/home/storybox/public/doc/images/';
       const dir_file_cube='/home/storybox/public/doc/cubesimages/';

       //Ubuntu
       //const dir_file='/opt/lampp/htdocs/storybox/public/doc/images/';
       //const dir_file_cube='/opt/lampp/htdocs/storybox/public/doc/cubesimages/';  

        //Windows
        //const dir_file='C:/xampp/htdocs/storybox/public/doc/images/';
        //const dir_file_cube='C:/xampp/htdocs/storybox/public/doc/cubesimages/';
        
        var date= new Date();
        
        let file_name=req.files.file_upload.name;
        let file_type=req.files.file_upload.mimetype;

        var file_newname=date.getDate().toString()+(date.getMonth()+1).toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()+"."+file_type.split("/")[1];


        req.files.file_upload.mv(dir_file+file_newname,(err)=>{
           
           if(err){
                console.log(err)
                console.log("Error al subir el archivo")
                res.end('errorr al subir 1')
            }else{

              if(req.files.file_upload_cube){
                let file_name_cube=req.files.file_upload_cube.name;
                let file_type_cube=req.files.file_upload_cube.mimetype;        
                var file_newname_cube=date.getDate().toString()+(date.getMonth()+1).toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()+"."+file_type_cube.split("/")[1];             

                req.files.file_upload_cube.mv(dir_file_cube+file_newname_cube,(err)=>{
                     if(err){
                        console.log(err)
                        console.log("Error al subir el archivo 2")
                        res.end("error al subir 2")
                     }else{
                       BoxModel.insertData(req.body,'doc/images/'+file_newname,'../doc/cubesimages/'+file_newname_cube,(err,row)=>{
                          if (err) {
                              console.log(err)
                              res.end("error en database")
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
                    res.end(err)
                  }else {
                     res.redirect("/content-manipulation")
                     res.end();

                    }

                })


               }

             }

         })
}

 module.exports= BoxController
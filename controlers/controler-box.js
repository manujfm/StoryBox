'use strict'

var BoxModel=require('../model/sql-models'),
    bcrypt=require('bcrypt-nodejs'),
    config=require('./config.json'),
    BoxController=()=>{}


    BoxController.routingByCategory=(req,res,next)=>{
      // console.log("RAW DATA: ",req.originalUrl)
      let url=req.originalUrl;
       //console.log(url)

      if(url==="/TrueStory"){
        res.render("trueStory")
      }else if (url==="/StoryCubes") {    
        res.render("storyCubes")        
      }else if (url==="/ShortStories") {
        res.render("shortStories")
      }else if (url==="/WeeklyJarys") {
        res.render("weeklyjarys")
      }
    }
    
    BoxController.getHistoryByCategory=(req,res,next)=>{
      const category=req.body.category
      let history = new Promise((response,reject)=>{
        BoxModel.getHistoryByCategory(category,(err,row)=>{
           return (err)?reject(new Error('The stories could not be obtained. Sorry :(')):response(row)
        })
      })

      history
   
        .then((responsed)=>{
         let locals={
           data:responsed
          }
          res.send(locals)
        })

        .catch((err)=>{
          let locals={
            title:"Error :(",
            description: err.message
          }
          res.send(locals)
        })    
    }

    BoxController.getAll=(req,res,next)=>{
      let allHistories= new Promise((resolve, reject)=>{
        BoxModel.getAll((err, row)=>{
          return (err)?reject(new Error('The stories could not be obtained. Sorry :(')):resolve(row)
        })
      })
       
      allHistories 

        .then((resolved)=>{
          let local={
            data:resolved
          }
          res.send(local)
        })
        .catch((err)=>{
        let locals={
          title:"Error :(",
          description: err.message
        }
        res.render('error',locals)
        })
    }

    BoxController.getHistoriesById=(req,res,next)=>{
  
     //console.log('Promise2')

     var dataHistoryContent= new Object;

     let dataHistory= new Promise((resolve, reject)=>{
        BoxModel.getHistoriesById(req.params.id,(err,row)=>{
          //console.log(row)
          dataHistoryContent.history=(err)?"":row
          return (err|row==""|row==null)?reject(new Error('The stories could not be obtained. Sorry :(')): resolve(true);        
        })
     })

     dataHistory

      .then((resolved)=>{
       //console.log('1 then')
         return new Promise((resolve, reject)=>{
           BoxModel.getNext(req.params.id,(err,next)=>{
             dataHistoryContent.next=(err)?"":next;
             return (err)? reject(new Error('Error de Sintaxis:NEXT')): resolve(true);

             })
          })
      })

      .then((resolved)=>{
        //console.log('2 then')
          return new Promise((resolve, reject)=>{
            BoxModel.getPrev(req.params.id,(err,prev)=>{
             dataHistoryContent.prev=(err)?"":prev;
             return (err)? reject(new Error('Error de sintaxis:PREV')): resolve(true);
            })
          })   
      })
      
      .then((resolved)=>{
        // console.log('3 then')
        // console.log(dataHistoryContent);
          dataHistoryContent.next=(dataHistoryContent.next=="")?"":dataHistoryContent.next[0].id;
          dataHistoryContent.prev=(dataHistoryContent.prev=="")?"":dataHistoryContent.prev[0].id;
          dataHistoryContent.history[0].licenseScript=dataHistoryContent.history[0].licenseScript.replace(/-/g,"'")
         
          let local={
            data:dataHistoryContent.history,
            next:dataHistoryContent.next,
            prev:dataHistoryContent.prev,
            ref:req.protocol + '://' + req.get('host') + req.originalUrl
          }
          res.render('histories/histories', local)
      })

      .catch((err)=>{
        let locals={
          title:"Error :(",
          description: err.message
        }
        res.render('error',locals)
       // console.log(err)
      })
    }

    BoxController.loginview=(req,res,next)=>{
        
        res.render("login")   
    }

    BoxController.validateUser=(req,res,next)=>{
     // console.log(req.body.password)

     var userValidate= new Promise((response, reject)=>{
          BoxModel.getUser(req.body.user.toLowerCase(),(err,row)=>{
            return (err)? reject(new Error('The user could not be obtained. Sorry :(')): response(row)
          }) 
     })

     userValidate
      
      .then((responsed)=>{
        if(responsed!=""){
           return  new Promise((response, reject)=>{
              BoxModel.getUserData(responsed[0].id,(err,rowData)=>{
                return (err)? reject(new Error('The user could not be obtained. Sorry :(')):response(rowData)
              })
           })
        }else{
           const message="Invalid User"
           res.render("login",{message})
           return Promise.reject()
        }   
      })

      .then((responsed)=>{
       // console.log("InfoUser",responsed)
        return new Promise((response,reject)=>{
          bcrypt.compare(req.body.Password,responsed[0].password,(err,valid)=>{
            if(err){
              return reject(new Error("Password Error"))
            }

            const message="Invalid Password";
            if(valid){
              req.session.times=responsed[0].times
              req.session.user="manuel" 
              // console.log(req.session.times)
              res.redirect("/content-manipulation") 
            }else{
              res.render("login",{message})
            }




          })
        })
      })

      .catch((err)=>{
      let locals={
          title:"Error :(",
          description: err.message
        }
        res.render('error',locals)
       
      })
    }

    BoxController.contenManip=(req,res,next)=>{
        //console.log(req.session.user)
       BoxModel.getAll((err,row)=>{
          if(err){
            let locals={
              title:"Error :(",
              description: err.message
            }
            res.render('error',locals)
          
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
      let locals={
          title:"Error :(",
          description: err.message
        }
        res.render('error',locals)
      
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
        let locals={
          title:"Error :(",
          description: err.message
        }
        res.render('error',locals)
      
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
        let locals={
          title:"Error :(",
          description: err.message
        }
        res.render('error',locals)
      
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

     var InsertContent= new Promise((resolve,reject)=>{

 
         const dir_file=config.path.path;
         const dir_file_cube=config.path.pathCube;  

          var file_system= new Object;
          const date= new Date

          file_system.dir_file=dir_file
          file_system.dir_file_cube=dir_file_cube
          file_system.file_name=req.files.file_upload.name;
          file_system.file_type=req.files.file_upload.mimetype;
          file_system.file_newname=date.getDate().toString()+(date.getMonth()+1).toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()+"."+file_system.file_type.split("/")[1];

             req.files.file_upload.mv(file_system.dir_file+file_system.file_newname,(err)=>{
               return (err)? reject(new Error('No se pude subir el archivo')):resolve(file_system)
             })
       })//End promise 

      InsertContent

        .then((resolved)=>{

              if(req.files.file_upload_cube){
                const date=new Date  
                let file_name_cube=req.files.file_upload_cube.name;
                let file_type_cube=req.files.file_upload_cube.mimetype;        
                var file_newname_cube=date.getDate().toString()+(date.getMonth()+1).toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()+"."+file_type_cube.split("/")[1];

                return new Promise((resolve, reject)=>{
                  req.files.file_upload_cube.mv(resolved.dir_file_cube+file_newname_cube,(err)=>{
                    return (err)? reject(new Error('No se pude subir el archivo')):resolve([resolved,file_newname_cube])
                  })
                })

              }else{

                return new Promise((resolve, reject)=>{
                  BoxModel.insertData(req.body,'doc/images/'+resolved.file_newname,null,(err,row)=>{
                    return (err)?reject(new Error('No se pudo insertar los datos')):res.redirect("/content-manipulation");res.end();reject(new Error('Se agrego la data correctamente'));
                  })
                })
              }         
        })
        
        .then((resolved)=>{
          return new Promise((resolve,eject)=>{
               BoxModel.insertData(req.body,'doc/images/'+resolved[0].file_newname,'../doc/cubesimages/'+resolved[1],(err,row)=>{
               return (err)? reject(new Error('No se pudo insertar la data junto al Cube')):resolve(true)
            })
          })

        })

        .then((resolved)=>{
           res.redirect("/content-manipulation")
           res.end();
        })

        .catch((err)=>{
          let locals={
            title:"Error :(",
            description: err.message
          }
          res.render('error',locals)
        
        })
}

 module.exports= BoxController


      
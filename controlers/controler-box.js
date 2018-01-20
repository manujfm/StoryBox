'use strict'

var BoxModel=require('../model/sql-models'),
    bcrypt=require('bcrypt-nodejs'),
    BoxController=()=>{}


    BoxController.getHistoriesByCategorie=(req,res,next)=>{
    // console.log("RAW DATA: ",req.originalUrl)
      let url=req.originalUrl,category;

      if(url==="/TrueStory"){
        category=2
      }else if (url==="/StoryCubes") {    
        category=4        
      }else if (url==="/ShortStories") {
        category=3
      }else if (url==="/WeeklyJarys") {
        category=1
      }

      //console.log("Category: ",category)

      let history = new Promise((response,reject)=>{
        BoxModel.getHistoryByCategory(category,(err,row)=>{
          return (err)?reject(new Error("No se pudo traer las historias")):response(row)
        })
      })

      history
   
        .then((responsed)=>{
         let locals={
           data:responsed
          }

          if(category===1){
            res.render("weeklyjarys",locals)
          }else if (category===2) {    
            res.render("trueStory",locals)      
          }else if (category===3) {
            res.render("shortStories",locals);
          }else if (category===4) {
            res.render("storyCubes",locals);
          }

        })

        .catch((err)=>{
          res.render('error',{err: err.message})
          console.log(err)
        })    
    }

    BoxController.getAll=(req,res,next)=>{
      let allHistories= new Promise((resolve, reject)=>{
        BoxModel.getAll((err, row)=>{
          return (err)?reject(new Error("No se pudo traer las historias")):resolve(row)
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
          res.render('error',{err: err.message})
          console.log(err)
        })
    }



    // BoxController.getHistoriesTS=(req,res,next)=>{
    // 	BoxModel.getCategorriesByID(2,(err,row)=>{
    // 		if(err){
    // 			let local={
    // 				data:'Error de sintaxis'
    // 			}

    // 			res.render('error')
    // 		}else{
    // 			let locals={
    // 				data:row
    // 			}
    // 			res.render("trueStory",locals);
    // 		}
    // 	})
    // }

    // BoxController.getHistoriesWJ=(req,res,next)=>{
    // 	BoxModel.getCategorriesByID(1,(err,row)=>{
    // 		if(err){
    // 			let local={
    // 				data:'Error de sintaxis'
    // 			}

    // 			res.render('error')
    // 		}else{
    // 			let locals={
    // 				data:row
    // 			}
    // 			res.render("weeklyjarys",locals);
    // 		}
    // 	})
    // }

    // BoxController.getHistoriesSS=(req,res,next)=>{
    // 	BoxModel.getCategorriesByID(3,(err,row)=>{
    // 		if(err){
    // 			let local={
    // 				data:'Error de sintaxis'
    // 			}

    // 			res.render('error')
    // 		}else{
    // 			let locals={
    // 				data:row
    // 			}
    // 			res.render("shortStories",locals);
    // 		}
    // 	})
    // }

    // BoxController.getHistoriesSC=(req,res,next)=>{
    // 	BoxModel.getCategorriesByID(4,(err,row)=>{
    // 		if(err){
    // 			let local={
    // 				data:'Error de sintaxis'
    // 			}

    // 			res.render('error')
    // 		}else{
    // 			let locals={
    // 				data:row
    // 			}
    // 			res.render("storyCubes",locals);
    // 		}
    // 	})
    // }

    BoxController.getHistoriesById=(req,res,next)=>{
  
     //console.log('Promise2')

     var dataHistoryContent= new Object;

     let dataHistory= new Promise((resolve, reject)=>{
        BoxModel.getHistoriesById(req.params.id,(err,row)=>{
          dataHistoryContent.history=(err)?"":row
          return (err)?reject(new Error('No se pudo obtener las historias')): resolve(true);        
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
        res.render('error',{err: err.message})
        console.log(err)
      })
    }

    BoxController.loginview=(req,res,next)=>{
        
        res.render("login")   
    }

    BoxController.validateUser=(req,res,next)=>{
     // console.log(req.body.password)

     var userValidate= new Promise((response, reject)=>{
          BoxModel.getUser(req.body.user.toLowerCase(),(err,row)=>{
            return (err)? reject(new Error("No se pudo obtener el usuario")): response(row)
          }) 
     })

     userValidate
      
      .then((responsed)=>{
        if(responsed!=""){
           return  new Promise((response, reject)=>{
              BoxModel.getUserData(responsed[0].id,(err,rowData)=>{
                return (err)? reject(new Error("No se pudo obtener la del ususario")):response(rowData)
              })
           })
        }else{
           const message="No esta registrado como usario"
           res.render("login",{message})
           return Promise.reject()
        }   
      })

      .then((responsed)=>{
       // console.log("InfoUser",responsed)
        return new Promise((response,reject)=>{
          bcrypt.compare(req.body.Password,responsed[0].password,(err,valid)=>{
            if(err){
              return reject(new Error("No se pudo comparar las password"))
            }

            const message="Contraseña Incorrecta";
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
         console.log(err.message)
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

     var InsertContent= new Promise((resolve,reject)=>{

         //Server  
         //const dir_file='/home/storybox/public/doc/images/';
         //const dir_file_cube='/home/storybox/public/doc/cubesimages/';

         //Ubuntu
         const dir_file='/opt/lampp/htdocs/storybox/public/doc/images/';
         const dir_file_cube='/opt/lampp/htdocs/storybox/public/doc/cubesimages/';  

          //Windows
          //const dir_file='C:/xampp/htdocs/storybox/public/doc/images/';
          //const dir_file_cube='C:/xampp/htdocs/storybox/public/doc/cubesimages/';

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
               return (err)? reject(new Error('No se puso insertar la data junto al Cube')):resolve(true)
            })
          })

        })

        .then((resolved)=>{
           res.redirect("/content-manipulation")
           res.end();
        })

        .catch((err)=>{
          console.log(err.message);
          res.end()
        })
}

 module.exports= BoxController


        // //Server  
       // const dir_file='/home/storybox/public/doc/images/';
       // const dir_file_cube='/home/storybox/public/doc/cubesimages/';

       // //Ubuntu
       // //const dir_file='/opt/lampp/htdocs/storybox/public/doc/images/';
       // //const dir_file_cube='/opt/lampp/htdocs/storybox/public/doc/cubesimages/';  

       //  //Windows
       //  //const dir_file='C:/xampp/htdocs/storybox/public/doc/images/';
       //  //const dir_file_cube='C:/xampp/htdocs/storybox/public/doc/cubesimages/';
        
       //  var date= new Date();
        
       //  let file_name=req.files.file_upload.name;
       //  let file_type=req.files.file_upload.mimetype;

       //  var file_newname=date.getDate().toString()+(date.getMonth()+1).toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()+"."+file_type.split("/")[1];


       //  req.files.file_upload.mv(dir_file+file_newname,(err)=>{
           
       //     if(err){
       //          console.log(err)
       //          console.log("Error al subir el archivo")
       //          res.end('errorr al subir 1')
       //      }else{

       //        if(req.files.file_upload_cube){
       //          let file_name_cube=req.files.file_upload_cube.name;
       //          let file_type_cube=req.files.file_upload_cube.mimetype;        
       //          var file_newname_cube=date.getDate().toString()+(date.getMonth()+1).toString()+date.getFullYear().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString()+"."+file_type_cube.split("/")[1];             

       //          req.files.file_upload_cube.mv(dir_file_cube+file_newname_cube,(err)=>{
       //               if(err){
       //                  console.log(err)
       //                  console.log("Error al subir el archivo 2")
       //                  res.end("error al subir 2")
       //               }else{
       //                 BoxModel.insertData(req.body,'doc/images/'+file_newname,'../doc/cubesimages/'+file_newname_cube,(err,row)=>{
       //                    if (err) {
       //                        console.log(err)
       //                        res.end("error en database")
       //                    }else {
       //                        res.redirect("/content-manipulation")
       //                        res.end();

       //                    }
                        
       //                 })

       //              }


       //           })

       //         }else{

       //          BoxModel.insertData(req.body,'doc/images/'+file_newname,null,(err,row)=>{
       //            if (err) {
       //              console.log(err)
       //              res.end(err)
       //            }else {
       //               res.redirect("/content-manipulation")
       //               res.end();

       //              }

       //          })


       //         }

       //       }

       //   })




            // BoxModel.getHistoriesById(req.params.id,(err,row)=>{
      //  if(err){
      //    let local={
      //      data:'Error de sintaxis 1'
      //    }
          
      //    console.log('Error de sintaxis 1')
      //  }else{
     //       BoxModel.getNext(req.params.id,(err,next)=>{
     //          if(err){
     //            let local={
     //             data:'Error de sintaxis 2'
     //            }

     //            console.log('Error de sintaxis 2')
     //          }else{
     //            BoxModel.getPrev(req.params.id,(err,prev)=>{
     //              if(err){
     //                let local={
     //                  data:'Error de sintaxis 3'
     //                }
     //              }else{
     //                next=(next=="")?"":next[0].id
     //                prev=(prev=="")?"":prev[0].id

     //                row[0].licenseScript=row[0].licenseScript.replace(/-/g,"'")
                
     //                let local= {
     //                  data:row,
     //                  next:next,
     //                  prev:prev,
     //                  ref:req.protocol + '://' + req.get('host') + req.originalUrl
     //                  }
     //                //console.log(local)
     //                  res.render("histories/histories",local);
     //              } 
     //            })
     //          }
     //        })
     //    }
     //  })





    //     BoxModel.getUser(req.body.user.toLowerCase(),(err,row)=>{
    //         if(row!=""){
    //            BoxModel.getUserData(row[0].id,(err,rowData)=>{
    //              bcrypt.compare(req.body.Password,rowData[0].password,(err,valid)=>{
    //                 //console.log(valid)
    //                 var message="Contraseña Incorrecta";
    //                 if(valid){
    //                     req.session.times=rowData[0].times
    //                     req.session.user="manuel" 
    //                    // console.log(req.session.times)
    //                     res.redirect("/content-manipulation")
    //                 }else{
    //                   res.render("login",{message})}
    //              })
    //            })
    //         }else{
    //             var message="No está registrado como usuario"
    //             res.render("login",{message})
    //         }
    //     })    
    // }
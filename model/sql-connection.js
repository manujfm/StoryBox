
'use strict'
var mysql=require('mysql'),
	config=require("./config.json"),
	dbData={
		   user:config.mysql.user,
		   password:config.mysql.password,
		   host:config.mysql.host,
		   port:config.mysql.port,
		   database:config.mysql.database
	    },
    myConn=mysql.createConnection(dbData);
    //console.log(dbData.user)
    myConn.connect((err)=>{
    return (err)?console.log(`Error al conectarse: ${err.stack} `) : console.log(`Conexion Establecida: ${myConn.threadId}`)   
    })

    module.exports=myConn
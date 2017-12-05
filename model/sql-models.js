'use strict'

var connect=require('./sql-connection'),

    BoxModel=()=>{}

    BoxModel.getAll=(cb)=>{

      connect.query('SELECT * FROM history',cb)
    }

    BoxModel.getCategorriesByID=(id,cb)=>{

        var query='SELECT * FROM history WHERE category='+id
    	connect.query(query,cb)
    }

    BoxModel.getHistoriesById=(id,cb)=>{
    	var query='SELECT * FROM history WHERE '+id
    	//console.log(query)
    	connect.query(query,cb)
    }

    BoxModel.getPrev=(id,cb)=>{
      var query="SELECT id FROM history WHERE id <"+id.split("=")[1]+" ORDER BY id DESC LIMIT 1;";
        //console.log(query)
        connect.query(query,cb)
    }

    BoxModel.getNext=(id,cb)=>{
      var query="SELECT id FROM history WHERE id >"+id.split("=")[1]+" ORDER BY id ASC LIMIT 1;";
       // console.log(query)
        connect.query(query,cb)
    }

    BoxModel.getUser=(user,cb)=>{
        var query="SELECT id FROM users WHERE user='"+user+"'";
        //console.log(query)
        connect.query(query,cb)
    }

    BoxModel.getUserData=(id,cb)=>{
        var query="SELECT * FROM users WHERE id='"+id+"'";
        //console.log(query)
        connect.query(query,cb)
    }

    BoxModel.insertData=(data, filename,filename_cube, cb)=>{
        if(filename_cube){
         var query= "INSERT INTO history (history, summary, title, date, category, url, validstory, imagecube) VALUES ('"+data.history+"','"+data.summary+"','"+data.title+"','"+data.date+"','"+data.category+"','"+filename+"','"+data.data_valid_cube+"','"+filename_cube+"')"
         //console.log(query)
         connect.query(query,cb)
        }else{
        var query= "INSERT INTO history (history, summary, title, date, category, url, validstory) VALUES ('"+data.history+"','"+data.summary+"','"+data.title+"','"+data.date+"','"+data.category+"','"+filename+"','"+data.data_valid_cube+"')"
        //console.log(query)
        connect.query(query,cb)
        }

    }

 module.exports= BoxModel
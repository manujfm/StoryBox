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

    BoxModel.insertData=(data, filename, cb)=>{
        var query= "INSERT INTO history (history, summary, title, date, category, url) VALUES ('"+data.history+"','"+data.summary+"','"+data.title+"','"+data.date+"','"+data.category+"','"+filename+"')"
        connect.query(query,cb)
    }

 module.exports= BoxModel
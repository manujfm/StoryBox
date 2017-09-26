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


 module.exports= BoxModel
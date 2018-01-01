'use strict'

var connect=require('./sql-connection'),

    BoxModel=()=>{}

    BoxModel.getAll=(cb)=>{

      connect.query('SELECT * FROM history WHERE status=1',cb)
    }

    BoxModel.getCategorriesByID=(id,cb)=>{

        var query='SELECT * FROM history WHERE category='+id
    	connect.query(query,cb)
    }

    BoxModel.getHistoriesById=(id,cb)=>{
    	var query='SELECT * FROM history WHERE '+id+ ' AND status=1'
    	//console.log(query)
    	connect.query(query,cb)
    }

    BoxModel.getPrev=(id,cb)=>{
      var query="SELECT id FROM history WHERE id <"+id.split("=")[1]+" AND status=1 ORDER BY id DESC LIMIT 1;";
      //  console.log(query)
        connect.query(query,cb)
    }

    BoxModel.getNext=(id,cb)=>{
      var query="SELECT id FROM history WHERE id >"+id.split("=")[1]+" AND status=1 ORDER BY id ASC LIMIT 1;";
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
        //console.log(data)
        if(filename_cube){
            data.scriptLicence=replace(data.scriptLicence)
         var query= "INSERT INTO history (history, summary, title, date, category, url, validstory, imagecube, licenseScript, licenseDiv, status) VALUES ('"+data.history+"','"+data.summary+"','"+data.title+"','"+data.date+"','"+data.category+"','"+filename+"','"+data.data_valid_cube+"','"+filename_cube+"','"+data.scriptLicence+"','"+data.divLicence+"', 1)"
         //console.log(query)
        connect.query(query,cb)
        }else{
            data.scriptLicence=replace(data.scriptLicence)
        var query= "INSERT INTO history (history, summary, title, date, category, url, validstory, licenseScript, licenseDiv, status) VALUES ('"+data.history+"','"+data.summary+"','"+data.title+"','"+data.date+"','"+data.category+"','"+filename+"','"+data.data_valid_cube+"','"+data.scriptLicence+"','"+data.divLicence+"',1)"
        //console.log(query)
        connect.query(query,cb)
        }
    }
    
    BoxModel.updateData=(id,data,cb)=>{
        var query="UPDATE history SET title='"+data.title+"', history='"+data.history+"' ,category='"+data.category+"', summary='"+data.summary +"', date='"+data.date+"',  licenseScript='"+data.scriptLicence+"', licenseDiv='"+data.divLicence+"' WHERE id="+id
       //console.log(query)
       connect.query(query,cb)
    }

    BoxModel.deleteData=(id,cb)=>{
        var query="UPDATE history SET status=0 WHERE id="+id
       // console.log(query)
        connect.query(query,cb)
    }


    BoxModel.updateUserTimes=(count,cb)=>{
        var query="UPDATE users SET times="+(parseInt(count)+1);
        connect.query(query,cb)
    }


var replace=(string)=>{
   var result= string.replace(/"|'/g,'-')
    return result;
}


 module.exports= BoxModel
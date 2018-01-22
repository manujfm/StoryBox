
	$("#missUBtn").click(function(event) {
        const url="http://"+window.location.host+'/missulogin'
        //console.log(url)

       $.ajax({
       	type:"POST",
       	url: url,
       	data: {"count": this.name},
       })
       .done(function() {
       	console.log("success");
       })
 
    
	});


	

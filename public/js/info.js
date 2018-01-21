
	$("#missUBtn").click(function(event) {

       $.ajax({
       	type:"POST",
       	url: config.host+'missulogin',
       	data: {"count": this.name},
       })
       .done(function() {
       	console.log("success");
       })
 
    
	});


	

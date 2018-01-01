///No tiene nada que ver con el con
jQuery(document).ready(function($) {
	$("#missUBtn").click(function(event) {

       $.ajax({
       	type:"POST",
       	url: 'http://jarystorybox.com/missulogin',
       	data: {"count": this.name},
       })
       .done(function() {
       	console.log("success");
       })
 
    
	});
});

	

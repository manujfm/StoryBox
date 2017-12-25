$(document).ready(function() {

	$("#BtnMod").click(function() {

	  var form=$("#ModData").find(':input'), arr={"idHistory":form[0].value};
          //console.log(arr)
		jQuery.ajax({
		      url: 'http://localhost:8080/content-manipulation',
		      data: arr,
		      type: 'POST',
		    }).then(function(response) {
		     var data=response;







		     
		    });

      });







}); //END SCRIPT
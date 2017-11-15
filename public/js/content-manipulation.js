jQuery(document).ready(function($) {
   $("#category").change(function(){
	  if($("#category")[0].value==4){
	    $('#file_upload_container').slideDown('slow');
	    $('#data_valid_cube')[0].value=1
	  }else{
	    $('#file_upload_container').slideUp('slow');
	    $('#data_valid_cube')[0].value=0
	  }
    }) 
});					
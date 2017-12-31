$(document).ready(function() {

	$("#BtnMod").click(function() {

      $("#spinnerContainer").css("display","block");

	     var form=$("#ModData").find(':input'), arr={"idHistory":form[0].value};

    		jQuery.ajax({
    		      url: 'http://jarystorybox.com/content-manipulation',
    		      data: arr,
    		      type: 'POST',
    		    }).then(function(response) {
    		    	 var data=response,
    		    	     form=$("#formMod").find(':input');
                         // console.log(data)

    		        setTimeout(function(){
                       $("#spinnerContainer").css("display","none");
     

                        form[0].value=data.data[0].id
                        form[1].value=data.data[0].history
                        form[2].value=data.data[0].summary
                        form[3].value=data.data[0].date
                        form[4].value=data.data[0].title
                        form[5].value=data.data[0].category
                        form[6].value=data.data[0].licenseDiv
                        form[7].value=data.data[0].licenseScript
                        form[8].value=data.data[0].validstory

                       $("#formModContainer").fadeIn('slow')
    		        },3000)
    		     

    		    });
  });

}); //END SCRIPT



function delBtnFunction(id){
  var elemento2=$("#"+id)
        id=elemento2.parents("tr").find("th").eq(0).text(),
        arr={"idDel":id};
        elemento2.parents("tr").fadeOut('slow')
        jQuery.ajax({
              url: 'http://jarystorybox.com/content-manipulation',
              data: arr,
              type: 'POST',
            }).then(function(response) {
               console.log("success")
               
            });
  
}
$(document).ready(function() {
    let postData={"require":2332}

	let data=$.ajax({
		url: 'http://localhost:8080',
		type: 'POST',
	})
	.done(function(data) {

        data=data.data
              
		let  arr = data.sort(function(a, b) {
          if(a.id > b.id) return -1;
          if(a.id < b.id) return 1;
          return 0;
        });

        let content="";    
       
        for (let box of arr){
	 
         content+= `
	       <div class="col-lg-3 col-xm-12">

	         <div style="margin-left:25px" class="info">
	           <a href="Stories/id=${box.id}">
	           <h3 id="cabeza">${box.title}</h3>
	           </a>
	           <p id="parrafo">${box.summary}</p>
	         </div>

	         <img src="${box.url}" alt="${box.title}" height="240px" width="240px" style="border-radius: 100%; margin-left:25px"/>

	         <div class="title-post">
	           <a href="Stories/id=${box.id}">
	            <h2 align="center">${box.title}</h2>
	           </a>
	           <p align="center">${box.date}</p>
	         </div>
	     
	       </div>`
        }
    setTimeout(()=>{
      $("#spinnerContainer").css("display","none")
      $("#historyContent").html(content)
    },3000)
   
     //console.log(content)


	})
	
});//END SCRIPT
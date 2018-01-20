$(document).ready(function() {

	let data=$.ajax({
		url: 'http://jarystorybox.com/',
		type: 'POST',
	})
	.done(function(data) {

        data=data.data
              
		let  arr = data.sort(function(a, b) {
          if(a.id > b.id) return -1;
          if(a.id < b.id) return 1;
          return 0;
        });
   
        let content="", count=1, pages=[], tam=arr.length;    
       
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
	       if(count%4==0||count==tam){
              pages.push(content)
	       }
	       count++;
	    }
       //console.log(pages)
       $("#historyContent").html(pages[0])

       let totalPages=pages.length

        $('#historyPagination').bootpag({
            total: totalPages,
            page: 1,
            maxVisible: 10,
            leaps: true,
            firstLastUse: true,
            first: '←',
            last: '→',
            wrapClass: 'pagination pagination-lg',
            activeClass: 'active',
            disabledClass: 'disabled',
            // nextClass: 'next',
            // prevClass: 'prev',
            // lastClass: 'last',
            // firstClass: 'first'
            }).on('page', function(event, num){
               $("#historyContent").html(pages[num - 1]).css("display","none").fadeIn("slow"); 
            });

            setTimeout(()=>{
       	       $("#spinnerContainer").css("display","none")
		       $("#historyContent").fadeIn("slow")
			   $("#historyPagination").fadeIn("slow")
		    },3000)

    
     //console.log(content)


	})
	
});//END SCRIPT
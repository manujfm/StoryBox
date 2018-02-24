
  let data=$.ajax({
		url:  window.location,
		type: 'POST',
	})
	.done(function(data) {

     let arr=data.data

	  
   
        let content="", count=1, pages=[], tam=arr.length;    
       
        for (let box of arr){

        box.date=dateTransform(box.date)
         content+= `
	       <div class="col-lg-3 col-lg-offset-0 col-xs-9 col-xs-offset-2">
           <div class="col-lg-12">
    	          <div class="info">
    	           <a href="Stories/id=${box.id}">
    	           <h3 id="headCont">${box.title}</h3>
    	           </a>
    	           <p id="parrafo">${box.summary}</p>
    	         </div>

    	         <img src="${box.url}" alt="${box.title}" height="240px" width="240px" style="border-radius: 100%;"/>
           </div>

           <div class="col-lg-8  col-lg-offset-2 col-xs-8 col-xs-offset-2">
            <div class="title-post">
              <a href="Stories/id=${box.id}">
                <h2 align="center">${box.title}</h2>
              </a>
              <p align="center">${box.date}</p>
            </div>
           </div>
         </div>`
	       if(count%8==0||count==tam){
              pages.push(content)
              content=""
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
	

  function dateTransform(date){
     let dateParse=date.split("T")[0].split('-')
    const months=["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const Ayear=dateParse[0]
    const Amont=dateParse[1]
    const Aday=dateParse[2].split("T")[0]
    let tDate=months[parseInt(Amont)-1]+" "+Aday+" "+Ayear   
    return tDate
}

  const url=window.location
  const path=url.pathname
  let category
 
   if(path==="/TrueStory"){
    category=2
  }else if (path==="/StoryCubes") {    
    category=4        
  }else if (path==="/ShortStories") {
    category=3
  }else if (path==="/WeeklyJarys") {
    category=1
  }
   arr={"category":category};
  let data=$.ajax({
		url:  url,
		type: 'POST',
    data: arr
	})
	.done(function(data) {

      let arr=data.data
       if(arr==""){
      //  console.log('efwefwef')
        $("#historyContent").html("<h1 align=center>Working on that :)</h1>")
           $("#spinnerContainer").css("display","none")
           $("#historyContent").fadeIn("slow")
        return 0
       }

	   

        let content="", count=1, pages=[], tam=arr.length;    
       
        for (let box of arr){
          box.date=dateTransform(box.date)
         content+= `
	       <div class="col-lg-3 col-xm-12">

	         <div style="margin-left:25px" class="info">
	           <a href="Stories/id=${box.id}">
	           <h3 id="headCont">${box.title}</h3>
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

    
    // console.log(content)
	})
	

  function dateTransform(date){
     let dateParse=date.split("-")
    const months=["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const Ayear=dateParse[0]
    const Amont=dateParse[1]
    const Aday=dateParse[2].split("T")[0]
    let tDate=months[parseInt(Amont)-1]+" "+Aday+" "+Ayear   
    return tDate
}
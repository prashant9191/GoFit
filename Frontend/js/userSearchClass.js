const baseURL="https://stormy-flannel-shirt-lion-cyclic.app"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/Frontend/html/login.html");
}
let loggedInUserEmail = loggedInUser.email;

getAllClass();
let newData;
async function getAllClass(){
    try{
     let dataFetch=await fetch(baseURL+"/class/all",{
        headers:{   
            authorization:`Bearer ${loggedInUserEmail}`
        }
    })
    if(dataFetch.ok){
        let temp=dataFetch.json()
        .then(res=>{
            newData=res.classes
            renderAllData(res.classes)})
       }else{
        // alert("Classes Not Fetched")
        swal({text: "Classes Not Fetched", icon: "error", button: "ok", timer:1000})
       }
       } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
       }
}


let allclassescard=document.getElementById("allclassescard")
function renderAllData(data){
    let allData=data
    // console.log(data)
    allclassescard.innerHTML=""
    let map_allData=allData.map(elem=>{
   
    return `                               <div class="d-flex px-3 pt-3 list-row flex-wrap align-items-center mb-2">
    <div class="imgclassdiv" style="margin-right:30px">
        <img src=${renderImages(elem.activity)} alt=${elem.activity} class="classimages">
        <h4> <a href=./classDetails.html?id=${elem._id} class="singleclasslink text-white">${elem.title}</a></h4>

    </div>

    <div class="info mb-3" style="margin-right:30px">

        <span class="text-white font-w600">${elem.seatOccupied} Seats Booked in ${elem.seatTotal} Seats </span>
        <br>
        <span class="text-white font-w600">Total Price: ₹ ${elem.price}</span>
    </div>
    <div class="list-icon mr-3 mb-3">
        <p class="fs-24 text-white mb-0 mt-2">Date: ${elem.classDate}</p>
        <span class="fs-14 text-white">Time: ${elem.classTime}</span>
    </div>
    <div class="d-flex mb-3 mr-auto pl-3 pr-3 align-items-center">
        <span class="text-info ml-2">${elem.activity}</span>
    </div>
    <div class="joinclassdiv">
        <a class="btn mb-3 btn-outline-white rounded mr-3 joinclassbutton " data-id=${elem._id}>Details</a>
    </div>
</div>
     `
    })

   



    allclassescard.innerHTML=map_allData.join("")

    let joicClassbtn=document.querySelectorAll('.joinclassbutton')
   joicClassbtn.forEach(elem=>{
    elem.addEventListener('click',(event)=>{
        let id = event.target.dataset.id;
        window.location.assign(`./bookClass.html?id=${id}`)
    })
   })
}

function checkvenue(venue,locationOrLink){
   if(venue==="online"){
    return 'Online-via Zoom'
   }else{
    return `Venue - At ${locationOrLink}`
   }
}


let searchbar=document.getElementById("searchBox")
searchbar.addEventListener('input',(event)=>{
   let searchdata=searchalldata(event)
  renderAllData(searchdata)
})

function searchalldata(event){
    let searchdata=event.target.value
    // console.log(newData)
   let temp=newData.filter(function(elem){
    let ans=elem.locationOrLink.toLowerCase().includes(searchdata.toLowerCase())||elem.title.toLowerCase().includes(searchdata.toLowerCase())||elem.activity.toLowerCase().includes(searchdata.toLowerCase())||elem.venue.toLowerCase().includes(searchdata.toLowerCase())
    return ans;
  })
return temp;
}

let activitiname=document.getElementById('acttype')
activitiname.addEventListener("change",(event)=>{
    let searchactivity=searchactivityfun(event.target.value)
    if(searchactivity){
       return renderAllData(searchactivity)
    }else{
        allclassescard.innerHTML=`<h2>Data Not Found</h3>`
    }
})

function searchactivityfun(activity){
   if(activity=="all"){
    getAllClass()
   }else{
    let temp=newData.filter(function(elem){
        let ans=elem.activity.toLowerCase().includes(activity.toLowerCase())||elem.venue.toLowerCase().includes(activity.toLowerCase())
        return ans
    })
    return temp;
   }
}

let attendacesearch=document.getElementById('atttype')
attendacesearch.addEventListener("change",(event)=>{
    let searchattendace=searchactivityfun(event.target.value)
    if(searchattendace){
     renderAllData(searchattendace) 
    }else{
        allclassescard.innerHTML=`<h2>Data Not Found</h3>`
    }
})

let pricecomp=document.getElementById('location')
pricecomp.addEventListener("change",(event)=>{
    let searchlocation=event.target.value
    if(searchlocation=="low"){
        let lowtohigh=newData.sort(function(a,b){
            return a.price - b.price
        })
     renderAllData(lowtohigh)
    }else if(searchlocation=="high"){
        let lowtohigh=newData.sort(function(a,b){
            return b.price - a.price
        })
         renderAllData(lowtohigh)
    }else{
        getAllClass()
    }
})


function renderImages(actname){
    let allImagesData={
        yoga:["../Images/Classes_Images/yoga1.jpg","../Images/Classes_Images/yoga2.jpg","../Images/Classes_Images/yoga3.jpg"],
        cardio:["../Images/Classes_Images/boxing1.jpg","../Images/Classes_Images/aerobics2.jpg","../Images/Classes_Images/crossfit1.jpg"],
        swimming:["../Images/Classes_Images/swimming1.jpg","../Images/Classes_Images/swimming2.jpg","../Images/Classes_Images/swimming3.jpg"],
        running:["../Images/Classes_Images/football1.jpg","../Images/Classes_Images/football2.jpg","../Images/Classes_Images/football3.jpg"],
        zumba:["../Images/Classes_Images/zumba1.jpg","../Images/Classes_Images/zumba2.jpg","../Images/Classes_Images/zumba3.jpg"],
        aerobics:["../Images/Classes_Images/aerobics1.jpg","../Images/Classes_Images/aerobics2.jpg","../Images/Classes_Images/aerobics3.jpg"],
        ballet:["../Images/Classes_Images/ballet1.jpg","../Images/Classes_Images/ballet2.jpg","../Images/Classes_Images/ballet3.jpg"],
        basketball:["../Images/Classes_Images/basketball1.jpg","../Images/Classes_Images/basketball2.jpg","../Images/Classes_Images/basketball3.jpg"],
        boxing:["../Images/Classes_Images/boxing1.jpg","../Images/Classes_Images/boxing3.jpg","../Images/Classes_Images/boxing2.jpg"],
        crossfit:["../Images/Classes_Images/crossfit1.jpg","../Images/Classes_Images/crossfit3.jpg","../Images/Classes_Images/crossfit2.jpg"],
        cycling:["../Images/Classes_Images/cycling1.jpg","../Images/Classes_Images/cycling2.jpg","../Images/Classes_Images/cycling3.jpg"],
        football:["../Images/Classes_Images/football1.jpg","../Images/Classes_Images/football2.jpg","../Images/Classes_Images/football3.jpg"],
        kickboxing:["../Images/Classes_Images/kickboxing1.jpg","../Images/Classes_Images/kickboxing2.jpg","../Images/Classes_Images/kickboxing3.jpg"],
        singing:["../Images/Classes_Images/singing1.jpg","../Images/Classes_Images/singing3.jpg","../Images/Classes_Images/singing2.jpg"],
        weighttraining:["../Images/Classes_Images/weighttraining1.jpg","../Images/Classes_Images/weighttraining2.jpg","../Images/Classes_Images/weighttraining3.jpg"],
        dance:["../Images/Classes_Images/dance1.jpg","../Images/Classes_Images/dance2.jpg","../Images/Classes_Images/dance3.jpg"]
    }
 
    
    let newactname=actname.toLowerCase()
    let name=allImagesData[`${newactname}`]
    
    let imgLink=getRandomItem(name)
   return(imgLink)
}

function getRandomItem(arr) {
   let randomIndex = Math.floor(Math.random() * 2);
   let item = arr[randomIndex];
  return item;
}
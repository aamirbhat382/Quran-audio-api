let year = new Date().getFullYear();
let month = new Date().getMonth()+1


const URL = `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`
fetch(URL).then(response => response.json()).then(data => {
    console.log(data.data)
    showCalendar(data.data)
    

}).catch(err => {
   console.log(err)
})


function showCalendar(data){
    let calendar = document.getElementById('calendar')
    
    let html = ''
    data.map(element=>{
         if(element.gregorian.day === new Date().getDate().toString()){
            document.getElementById('Date_arabic_english').innerHTML = `
            <h1 class="display-4" >${element.hijri.date}</h1>
  <p class="lead">${element.hijri.weekday.en} | ${element.hijri.weekday.ar}</p>
  <hr class="my-4">
  <p>${element.gregorian.date} | ${element.gregorian.weekday.en}</p>
  
            `
        html += `
        <div class="col-md-1 col-sm-2 py-3 px-2 bg-success border-rounded text-light border" id="${element.gregorian.day}"> <span>${element.hijri.day}</span> <span>${element.gregorian.day}</span> <span>${element.hijri.weekday.ar}</span> <span>${element.hijri.weekday.en}</span> <span>${element.gregorian.weekday.en}</span> <span>${element.hijri.month.number}</span> <span>${element.hijri.month.ar}</span> <span>${element.hijri.month.en}</span> <span>${element.gregorian.month.number}</span> <span>${element.gregorian.month.en}</span>
        </div>
        
      `}else{
         html += `
        <div class="col-md-1 col-sm-2 py-3 px-2 bg-dark border-rounded border text-light "> <span>${element.hijri.day}</span> <span>${element.gregorian.day}</span> <span>${element.hijri.weekday.ar}</span> <span>${element.hijri.weekday.en}</span> <span>${element.gregorian.weekday.en}</span> <span>${element.hijri.month.number}</span> <span>${element.hijri.month.ar}</span> <span>${element.hijri.month.en}</span> <span>${element.gregorian.month.number}</span> <span>${element.gregorian.month.en}</span>
        </div>`
      }
  
    })
    calendar.innerHTML =  html
}



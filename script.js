
function showSurah(data) {
    let ListOfSurah = document.getElementById('ListOfSurah')
    let HTML = ''
    data.forEach(element => {
        HTML += `
        <button  id='${element.number}' class=" surah list-group-item list-group-item-action bg-dark text-light ">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${element.name}</h5>
          <small class="text-muted">Number Of Ayahs ${element.numberOfAyahs}</small>
        </div>
        <p class="mb-1">${element.englishName}</p>
        <small class="text-muted">${element.englishNameTranslation}</small>
      </button>`
    })
    if (ListOfSurah) {
        ListOfSurah.innerHTML = HTML
    }
}


const URL = 'https://api.alquran.cloud/v1/surah'
fetch(URL).then(response => response.json()
).then(data => {
    // console.log(data.data);
    showSurah(data.data)
    getSurah()

})

function getSurah() {
    let AllSurah = document.querySelectorAll('.list-group-item')
    AllSurah.forEach(btn => {
        btn.addEventListener('click', (e) => {
            container = document.getElementById('container').style.display = 'block'
            const Id = btn.id
            fetch(`https://api.alquran.cloud/v1/surah/${Id}/ar.alafasy`).then(response => response.json()
            ).then(data => {
                // console.log(data.data.ayahs);
                surahDatiles(data.data.ayahs)
            })
        })
    })
}


function surahDatiles(data) {
    let container = document.getElementById('container')
    let html = ''
    data.forEach((element, index) => {
        // console.log(element)
        html += `<div class="card text-center mb-3">
        <div class="card-header">
            <a  href="#ayah${index + 1}" id="ayahsNo${index}"  class="card-title" >ayahs${index + 1}</a> 
            </div>
            <div class="card-body" id='ayah${index + 1}'>
            <h5 class="card-title" id="text-${index}">${element.text}</h5>
            <audio src='${element.audio}' controls></audio>
            <a  href="#" id='${index}'  class="card-title  ayahs " data-url="${element.audio}"></a>
            </div>
            <div class="card-footer text-muted">
            Ruku - ${element.ruku} | juz - ${element.juz} | Page - ${element.page} | Manzil - ${element.manzil} - 
            </div>
        </div>`
    })
    container.innerHTML = html
    const ayahsArray = document.getElementsByClassName('ayahs')
    let i = 0
    let player = document.getElementById('player')
    player.src = ayahsArray[i].getAttribute('data-url')
    document.getElementById(`text-${i}`).style.color = 'green'
    // document.getElementById(`ayahsNo${i + 1}`).click()

    player.addEventListener('ended', () => {
        document.getElementById(`text-${i}`).style.color = 'black'
        // ayahsArray[i].style.color = 'white'
        document.getElementById(`ayahsNo${i + 1}`).click()
        i++;

        if (i < ayahsArray.length) {

            // player.play()
            player.src = ayahsArray[i].getAttribute('data-url');
            document.getElementById(`text-${i}`).style.color = 'green'
            ayahsArray[i]
            return;
        }
        i = 0;
        player.src = ayahsArray[i].getAttribute('data-url');
    })
}



{/* <div class="card text-center">
  <div class="card-header">
    <a  href="#ayah${index + 1}" id="ayahsNo${index}"  class="card-title" >ayahs${index + 1}</a> 
  </div>
  <div class="card-body" id='ayah${index + 1}'>
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">${element.text}</p>
    <a  href="#" id='${index}'  class="card-title ayahs" data-url="${element.audio}"></a>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div> */}
{/* <a  href="#ayah${index + 1}" id="ayahsNo${index}"  class="card-title" >ayahs${index + 1}</a> 
        <section id='ayah${index + 1}'>
        <div class="card mb-3 rounded">
        <div class="card-body bg-dark text-light ">
            <a  href="#" id='${index}'  class="card-title ayahs" data-url="${element.audio}">${element.text}</a> 
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        </div>
        </section> */}
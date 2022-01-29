let prayerTimes = document.getElementById('prayerTimes')
let todaysDate = new Date().getDate()
let month = new Date().getMonth() + 1
let year = new Date().getFullYear()

    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude
        let URL = `https://api.aladhan.com/timings/${todaysDate}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=1`




        fetch(URL).then(response => response.json()).then(response => {
            let dateReadable = document.getElementById('dateReadable').innerHTML = response.data.date.readable
            let html = ''
            for (const [key, value] of Object.entries(response.data.timings)) {
                html += ` <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${key}</div>
                ${key}
            </div>
            <span class="badge bg-success p-2 rounded-pill">${value}</span>
        </li>`
            }

            let _times = document.getElementById('_times').innerHTML = html


        }).catch(err => {
            let _times = document.getElementById('_times').innerHTML = `<h1 class='mx-auto'> Failed to fetch <a href='/'> Retry</a> </h1>`
        })
    }

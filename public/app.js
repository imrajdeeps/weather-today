// Variables
const API_KEY = `<YOUR API KEY>`;
const search = document.querySelector('#search');
const main = document.querySelector('.main');
const errorBox = document.querySelector('.errorBox');
const current_details = document.querySelector('#current-details');
const wicon = document.getElementById('w-icon-type');
const current_weather_items = document.getElementById('current-weather-items');
const time_zone = document.getElementById('timeBox');

const getWeather = (city) => {
    /* This Function hits the REST API and get the weather-info then convert it into json */
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            return showWeather(data);
        })
}

const showWeather = (data) => {
    /* This Function show weather to the user */

    // Check the input city valid or not
    if (data.cod == "404") {
        errorBox.style.display = "block";
        main.style.display = "none";
        errorBox.innerHTML = `
        <div class="msg display-3">
            OOPS! City Not Found
        </div>
         `;
        return
    } else {
        errorBox.style.display = "none";
        main.style.display = "block";
    }
    // update UI 
    current_details.innerHTML = `
        <span class="fs-3">Min: ${Math.round(data.main.temp_min)}&deg;</span>
        <span class="fs-3">Max: ${Math.round(data.main.temp_max)}&deg;</span>
        <p class="display-1 fw-bold current-temp">${Math.round(data.main.temp)}&deg;C</p>
        <span class="fs-5">Feel like ${Math.round(data.main.feels_like)}&deg;C</span>
   `;

    wicon.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="..." class="img-fluid">
        <p>${data.weather[0].main}</p>
   `;

    const sunset = window.moment(data.sys.sunrise * 1000).format("HH:mm a");
    const sunrise = window.moment(data.sys.sunset * 1000).format("HH:mm a");
    current_weather_items.innerHTML = `
        <span class="d-flex justify-content-between">Humidity:<span class="col-6">${data.main.humidity}%</span></span>
        <span class="d-flex justify-content-between">Pressure:<span class="col-6">${data.main.pressure}
                mBar</span></span>
        <span class="d-flex justify-content-between">Visibility:<span class="col-6">${(data.visibility) / 1000} Km</span></span>
        <span class="d-flex justify-content-between">Wind Speed:<span class="col-6">${data.wind.speed} Km/h</span></span>
        <span class="d-flex justify-content-between">Sunrise:<span class="col-6">${sunset}</span></span>
        <span class="d-flex justify-content-between">Sunset:<span class="col-6">${sunrise}</span></span>
        `;

    // date 
    const dt = window.moment(data.dt * 1000);
    const time = dt.format("HH:mm a");
    if (time) {
        main.style.backgroundImage = 'linear-gradient(#169DD9, white)';
    }
    time_zone.innerHTML = `
        <div class="d-flex justify-content-between">
            <div class="display-5 col-6 col-lg-4 col-xl-3">${time}</div>
            <div class="text-end"><span class="fs-3">Asia/Kolkata</span>
                <br><span>${data.coord.lat} / ${data.coord.lon}</span>
            </div>
        </div>
        <div class="fs-3 lead">${dt.format('ddd, DD ') + getMonthName(dt.format('MM'))}</div>
   `;
}


const getMonthName = (m) => {
    /* This function return the month name */
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthsArray[m - 1]
}


// form event listener
document.querySelector('.form').addEventListener(
    "submit", (event) => {
        getWeather(search.value);
        event.preventDefault();
    }
)



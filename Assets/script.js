let APIKEY = '1914eaa1075e94091f7d727ffe792791';
let city;
let dailyForecast = document.getElementById('today-weather');
fetchButton = document.getElementById('fetch-button');
let inputEl = document.getElementById('user-input');
let cityForecast = document.getElementById('city-forecast');
let FiveDayForecast = document.getElementById('5DayForecast')
//event listener for search button
fetchButton.addEventListener('click', requestCity);
fetchButton.addEventListener('click', get5DayForeast);

//taking in request input
function requestCity(event) {
    let userInput = inputEl.value.trim();
    if (!userInput) {
        alert('City Name Required');
        return
    }
    event.preventDefault();

    //clear previous content in cityForecast
    cityForecast.innerHTML = '';

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKEY + "&units=metric";
    console.log(queryURL);

    //fetch requesat to get  data
    fetch(queryURL)
        .then(function (response) {
            return response.json();

        })


        .then(function (data) {
            console.log(data);
            console.log(data.name);

            // Append data to City Forecast area  in HTML
            //current Date variable 
            let currentDate = dayjs.unix(data.dt).format('MMMM D, YYYY');
            console.log(currentDate);

            //Temerature, Humidity, Wind Speed and Weather Icon
            let temperature = data.main.temp;
            let humidity = data.main.humidity;
            let windSpeed = data.wind.speed;
            let weatherIcon = src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            console.log(temperature);

            //Create h4 element  for current date 
            let h4DateEl = document.createElement('h4')
            h4DateEl.textContent = currentDate;
            cityForecast.appendChild(h4DateEl);

            //create new paragraph element for single city forecast
            let cityName = document.createElement('p');
            let cityTemp = document.createElement('p');
            let cityHumidity = document.createElement('p');
            let cityWindSpeed = document.createElement('p');
            let cityWeatherIcon = document.createElement('img');

            //set text content of the city forecast details
            cityName.textContent = data.name;
            cityTemp.textContent = 'Temperature: ' + temperature + ' C°'
            cityHumidity.textContent = 'Humidity: ' + humidity;
            cityWindSpeed.textContent = 'Wind Speed: ' + windSpeed;
            cityWeatherIcon.src = weatherIcon;

            //Append the new paragraph elements to cityForecast
            cityForecast.appendChild(cityName);
            cityForecast.appendChild(cityTemp);
            cityForecast.appendChild(cityHumidity);
            cityForecast.appendChild(cityWindSpeed);
            cityForecast.appendChild(cityWeatherIcon);


        } )   

        }
//Function for the 5 Day Forecast

function get5DayForeast (event) {
    let userInput = inputEl.value.trim();
    if (!userInput) {
        alert('City Name Required');
        return
    }
    event.preventDefault();

let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKEY + "&units=metric";

       // Fetch forecastData
fetch(forecastURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);

//Clear the contents of 5 day forecast container
FiveDayForecast.textContent = "";

// Looping through data to get daily forecast, currently data is set to 3 hours, so have to  go by increments of 8
for (var i = 0; i < data.list.length; i += 8) {
    console.log(data.list[i]);
    //Take data re date, temp, humidity, windspeed and weather icon from weather API
let forecastDate = dayjs.unix(data.list[i].dt).format('MMMM D, YYYY');
let forecastTemp = data.list[i].main.temp;
let forecastHumidity = data.list[i].main.humidity;
let forecastWindSpeed = data.list[i].wind.speed;
let forecastIcon = data.list[i].weather.icon;

//Identify exisint elements in HTML to append to
let forecastDateEl = document.getElementById('forecast-date-' + i);

//Update content to html elements
forecastDateEl.textContent = forecastDate;

}
})}





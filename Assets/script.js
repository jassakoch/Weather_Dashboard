let APIKEY = '1914eaa1075e94091f7d727ffe792791';
let city;
let dailyForecast = document.getElementById('today-weather');
fetchButton = document.getElementById('fetch-button');
let inputEl = document.getElementById('user-input');
let cityForecast = document.getElementById('city-forecast');
//Retrieve existing search history from local storage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
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

            //Saving searched city to local storage  
            saveToLocalStorage(userInput);


        })

}

//Function to save searched city to local storage
function saveToLocalStorage(city) {

    //Add the new city to the search history
    searchHistory.push(city);

    //Save the updated search history back in local storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}



//Function for the 5 Day Forecast
function get5DayForeast(event) {
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



            // Looping through data to get daily forecast, currently data is set to 3 hours, so have to  go by increments of 8
            for (var i = 0; i < data.list.length; i += 8) {
                console.log(data.list[i]);
                //Take data re date, temp, humidity, windspeed and weather icon from weather API
                let forecastDate = dayjs.unix(data.list[i].dt).format('MMMM D, YYYY');
                let forecastTemp = 'Temp: ' + data.list[i].main.temp + 'C°'
                let forecastHumidity = 'Humidity: ' + data.list[i].main.humidity;
                let forecastWindSpeed = 'Wind: ' + data.list[i].wind.speed;
                let forecastIcon = src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";

                //Identify exisint elements in HTML to append to
                let forecastDateEl = document.getElementById('forecast-date-' + i);
                let forecastTempEl = document.getElementById('forecast-temp-' + i);
                let forecastWindEl = document.getElementById('forecast-wind-' + i);
                let forecastHumidityEl = document.getElementById('forecast-hum-' + i);
                let forecastIconEl = document.getElementById('forecast-icon-' + i);


                //Update content to html elements
                forecastDateEl.textContent = forecastDate;
                forecastTempEl.textContent = forecastTemp;
                forecastWindEl.textContent = forecastWindSpeed;
                forecastHumidityEl.textContent = forecastHumidity;
                forecastIconEl.src = forecastIcon;
            }
        })
}


//Function to display the search history from local storage
function displaySearchHistory() {

    //Get the HTML element with id 'recent-searches'
    let recentSearchesEl = document.getElementById('recent-searches');

    //create a new card for search history
    let historyCard = document.createElement('div');
    historyCard.className = 'card bg-primary';

    //create card body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body text-center';

    //create a list to display search history
    let historyList = document.createElement('ul');

    //Looping through search history to create list of iterms
    searchHistory.forEach((city, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = city;
        historyList.appendChild(listItem);
    });

    //Append historyy list to card body
    cardBody.appendChild(historyList);


    //Append card body to the card
    historyCard.appendChild(cardBody);

    //Append history card to the recent-searches element
    recentSearchesEl.appendChild(historyCard);

//Adding eventListener to search history list 
recentSearchesEl.addEventListener('click', function (event) {
    if (event.target.tagName ==='LI') {
        //Get city name 
        let cityName = event.target.textContent;

        //Fetch the weather forecast for the selected city
        requestCity(cityName);
        get5DayForeast(cityName);
    }
})

}

displaySearchHistory();

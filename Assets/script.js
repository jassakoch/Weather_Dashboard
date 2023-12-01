let APIKEY = '1914eaa1075e94091f7d727ffe792791';
let city;
let dailyForecast = document.getElementById('today-weather');
fetchButton = document.getElementById('fetch-button');

let inputEl = document.getElementById('user-input')
//event listener for search button
fetchButton.addEventListener('click', requestCity);



//taking in request input
function requestCity (event) {
let userInput = inputEl.value.trim();
if (!userInput) {
    alert('City Name Required');
  return
} 
event.preventDefault();
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKEY + "&units=metric";
console.log(queryURL);

//fetch requesat to get  data
fetch(queryURL)
    .then(function(response) {
        return response.json();
      
    })


    //append the data to the html doc
    .then(function(data) {
        console.log(data); 

    })
}













   
    



    
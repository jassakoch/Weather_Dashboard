let APIKEY = '1914eaa1075e94091f7d727ffe792791';
let city;
let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=" + inputEl + "&appid=" + APIKEY + "&units=metric" ;
fetchButton = document.getElementbyId('button');
fetchButton.setAttribute('style','margin-left: 10px;');
let inputEl = document.getElementById('user-input')

console.log(queryURL);


//fetch requesat to get  data
fetch(queryURL)
    .then(function(response) {
        return response.json();
      
    })


    //append the data to the html doc
    then(function(data) {
        console.log(data); 
    })
   
    



    //user input function
    let userInput = inputEl.value.trim()
    if (!userInput) {
        prompt ('City Name Required');
        return;
    }
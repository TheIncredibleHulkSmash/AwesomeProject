
var pertainsTo = document.querySelectorAll('pertainsTo');
var word = document.querySelectorAll('word');
var result = [];


const response = await fetch({
    "method":"GET",
    "url":`https://wordsapiv1.p.rapidapi.com/words/${word}`,
    "headers":{
    "content-type":"",
    "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
    "x-rapidapi-key":"1489b563d6msh890ebba4b5cef06p192944jsn4ee65a8efff3"
    }
  })

  











/*//fetch Word API
const options = {
method: "GET",
headers: {
    "X-RapidAPI-Key": "1489b563d6msh890ebba4b5cef06p192944jsn4ee65a8efff3",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
},
};

fetch("https://wordsapiv1.p.rapidapi.com/words/.22-caliber/pertainsTo", options)
.then((response) => response.json())
.then((response) => console.log(response))
.catch((err) => console.error(err));
//api is working, categories show up on page 

//add event listener to make sure that console is catching the user input 


//how do we make the suggestions? we cannot use window.alert, we have to use something else to suggest an option8*/

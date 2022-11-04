// fetch Madlibz API
fetch("https://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25", {
    method: 'GET', //GET is the default. //where do these options come from?
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  })
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch(err => console.error(err));

  
// fetch Word API
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1489b563d6msh890ebba4b5cef06p192944jsn4ee65a8efff3',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

fetch('https://wordsapiv1.p.rapidapi.com/words/.22-caliber/pertainsTo', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

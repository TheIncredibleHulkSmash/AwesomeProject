const api_url =
  "http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25";

const displayMadlib = async (url) => {
  const response = await fetch(url); //store response
  let data = await response.json(); //convert response to JSON
  console.log(data);

  document.querySelector(".madlibTitle").innerHTML = `<h3>${data.title}</h3>`; //display title of madlib

  //loop through blanks and values to display a string with the completed madlib
  for (let i = 0; i < data.blanks.length; i++) {
    const blank = data.blanks[i];
    const value = data.value[i];
    console.log(value);
    console.log(blank);
    document.querySelector(".madlibText").textContent +=
      value + "" + blank + "";
  }
  document.querySelector(".madlibText").textContent += "."; //add period at the end of madlib
};

displayMadlib(api_url);

// fetch Madlibz API
// fetch(api_url, {
//   method: "GET", //GET is the default. //where do these options come from?
//   credentials: "same-origin", // include, *same-origin, omit
//   redirect: "follow", // manual, *follow, error
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });

// fetch Word API
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "1489b563d6msh890ebba4b5cef06p192944jsn4ee65a8efff3",
//     "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
//   },
// };

// fetch("https://wordsapiv1.p.rapidapi.com/words/.22-caliber/pertainsTo", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
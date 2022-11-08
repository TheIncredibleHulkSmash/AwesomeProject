const api_url =
  "https://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25";

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
    document.querySelector(".madlibText").innerHTML +=
      `${value} <b>${blank}</b>`;
  }
  //document.querySelector(".madlibText").textContent += "."; //add period at the end of madlib

const inputs = document.querySelector("#inputs")

  for (let i = 0; i < data.blanks.length; i++) {
    const blank = data.blanks[i];
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.setAttribute("id",`blank-${i}`);
    const text = document.createTextNode(blank); //creating text value
    li.append(text)
    li.append(input);

    inputs.append(li)//appending to ul tag
  }
};

const buttonStart = document.querySelector("#buttonStart");

buttonStart.addEventListener("click",()=>{
  displayMadlib(api_url);
  buttonStart.style.visibility = "hidden"
})

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
const api_url =
  "https://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25";

const buttonSubmit = document.querySelector("#buttonSubmit");
buttonSubmit.style.visibility = "hidden";

let wordCloudText = "";
let completedBlanks = [];

const displayMadlib = async (url) => {
  const response = await fetch(url); //store response
  let data = await response.json(); //convert response to JSON
  console.log(data);

  const inputs = document.querySelector("#inputs");

  //loops through blanks to create input boxes
  for (let i = 0; i < data.blanks.length; i++) {
    const blank = data.blanks[i];
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.setAttribute("id", `blank-${i}`); //adding id to each blank
    const text = document.createTextNode(blank); //creating text value
    li.append(text);
    li.append(input);

    inputs.append(li); //appending to ul tag
  }

  buttonSubmit.style.visibility = "visible";

  buttonSubmit.addEventListener("click", () => {
    for (let i = 0; i < data.blanks.length; i++) {
      let completedBlank = document.getElementById(`blank-${i}`).value;
      completedBlanks.push(completedBlank);
    }

    document.querySelector(".madlibTitle").innerHTML = `<h3>${data.title}</h3>`; //display title of madlib

    //loop through blanks and values to display a string with the completed madlib
    for (let i = 0; i < data.blanks.length; i++) {
      const blank = data.blanks[i];
      const value = data.value[i];
      console.log(value);
      console.log(blank);
      document.querySelector(
        ".madlibText"
      ).innerHTML += `${value} <b>${completedBlanks[i]}</b>`;
    }

    document.querySelector(".madlibText").textContent += "."; //add period at the end of madlib

    wordCloudText = completedBlanks.join(" ");

    // fetch word cloud API
    fetch("https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud", {
      method: "POST",
      headers: {
        "x-rapidapi-host": "textvis-word-cloud-v1.p.rapidapi.com",
        "x-rapidapi-key": "1489b563d6msh890ebba4b5cef06p192944jsn4ee65a8efff3",
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        text: wordCloudText,
        scale: 1,
        width: 800,
        height: 800,
        colors: ["#375E97", "#FB6542", "#FFBB00", "#3F681C"],
        font: "Tahoma",
        use_stopwords: true,
        language: "en",
        uppercase: false,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((wordCloud) => {
        var img = document.getElementById("wordCloud");
        img.src = wordCloud;
        img.height = 800;
        img.width = 800;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const buttonStart = document.querySelector("#buttonStart");

buttonStart.addEventListener("click", () => {
  displayMadlib(api_url);
  buttonStart.style.visibility = "hidden";
});
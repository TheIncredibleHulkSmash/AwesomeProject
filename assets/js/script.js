const api_url =
  "https://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25";

const buttonSubmit = document.querySelector("#buttonSubmit");
buttonSubmit.style.visibility = "hidden";

document.getElementById("completedMadlibBox").style.display = "none";

let wordCloudText = "";
let completedBlanks = [];
let localStorageStory = [];
let playCount = localStorage.length ++;
  
  //save completed Madlib to local storage
let archiveStory = (number) => {
  let savedStory = [];
  savedStory[0] = document.querySelector(".madlibTitle").textContent;
  savedStory[1] = document.querySelector(".madlibText").textContent;
  localStorage.setItem(`savestory${number}`, savedStory);
  localStorageStory = localStorage.getItem(`savestory${number}`, savedStory);
};

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

  showWordCloud("wordCloud"); //display word cloud at id=wordCloud div

  //on click submit button code
  buttonSubmit.style.visibility = "visible"; //show submit button after start button has been clicked
  buttonSubmit.addEventListener("click", () => {
    document.getElementById("inputBox").style.display = "none"; //hide input container
    document.getElementById("completedMadlibBox").style.display = "block";

    //store each input into completedBlanks array
    for (let i = 0; i < data.blanks.length; i++) {
      let completedBlank = document.getElementById(`blank-${i}`).value;
      completedBlanks.push(completedBlank);
    }

    //display updated word cloud
    document.getElementById(`inputs`).style.display = "none"; //hide input boxes
    let completedBlanksString = completedBlanks.join(" "); //convert array to string
    let savedBlanks = localStorage.getItem("savedBlanks"); //pull previously saved blanks
    savedBlanks += completedBlanksString; //append saved blanks with words inputted for this madlib
    localStorage.setItem("savedBlanks", savedBlanks); //save updated save blanks in local storage
    // showWordCloud("wordCloud1"); //display word cloud at id=wordCloud1 div

    //display completed madlib
    const madTitle = document.querySelector(".madlibTitle");
    madTitle.innerHTML = `<h3>${data.title}</h3>`; //display title of madlib
    madTitle.classList.add("card-divider");
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

    archiveStory(playCount); //send this story to local storage
  });
};

//word cloud
let showWordCloud = (id) => {
  wordCloudText = localStorage.getItem("savedBlanks"); //get updated string of blanks to display as a word cloud
  // fetch word cloud API using wordCloudText
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
      var img = document.getElementById(id);
      img.src = wordCloud;
      img.height = 600;
      img.width = 600;
    })
    .catch((err) => {
      console.log(err);
    });
};

//add click functionality to Start Button
const buttonStart = document.querySelector("#buttonStart");
buttonStart.addEventListener("click", () => {
  displayMadlib(api_url);
  document.getElementById("welcomeBox").style.display = "none";
});

const buttonHomepage = document.getElementById("buttonHomepage");
buttonHomepage.addEventListener("click", () => {
  console.log("homepage button click working");
  document.getElementById("welcomeBox").style.display = "visible";
  document.getElementById("completedMadlibBox").style.display = "none";
});

const buttonRestart = document.getElementById("buttonRestart");
buttonRestart.addEventListener("click", () => {
  console.log("restart button click working");
  displayMadlib(api_url);
  // buttonRestart.style.display = "none";
  // buttonHomepage.style.display = "none";
});

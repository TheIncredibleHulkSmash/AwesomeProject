const api_url =
  "https://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25";

const buttonSubmit = document.querySelector("#buttonSubmit");
buttonSubmit.style.visibility = "hidden";

document.getElementById("wordCloudBox").style.display = "none";
document.getElementById("completedMadlibBox").style.display = "none";

let wordCloudText = "";
let completedBlanks = [];
// let playCount = localStorage.length++;

//save completed Madlib to local storage
let archiveStory = () => {
  let savedStory = { title: "", content: "" }; //store title and finished story content; is a string
  savedStory.title = document.querySelector(".madlibTitle").textContent; //getting the title content
  savedStory.content = document.querySelector(".madlibText").textContent; //getting the story content
  let playCount = localStorage.length; //number of data available in localStorage that has already been stored
  localStorage.setItem(`savestory${playCount - 1}`, JSON.stringify(savedStory)); //saving new story; -1 because since we are storing the blanks, we need to ignore that piece of data
};

let globalData;
const displayMadlib = (url) => {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      globalData = data;
      console.log(data);

      const inputs = document.querySelector("#inputs");
      inputs.innerHTML = "";
      //loops through blanks to create input boxes
      for (let i = 0; i < data.blanks.length; i++) {
        const blank = data.blanks[i];
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.setAttribute("id", `blank-${i}`); //adding id to each blank
        const text = document.createTextNode(blank); //creating text value
        li.append(text);
        li.append(input);
        li.style.backgroundColor = "thistle";
        li.style.borderRadius = "2rem";
        li.style.padding = "25px";
        li.style.margin = "5px";
        inputs.append(li); //appending to ul tag
      }

      showWordCloud("wordCloud"); //display word cloud at id=wordCloud div

      //on click submit button code
      buttonSubmit.style.visibility = "visible"; //show submit button after start button has been clicked
    });
};

// this function takes the string story and the words and searches the patterns and bolds the words the in the array.
function makeBold(story, words) {
  return story.replace(
    new RegExp("(\\b)(" + words.join("|") + "()\\b)", "ig"),
    "$1<b>$2</b>$3"
  );
}

//word cloud
let showWordCloud = (id) => {
  document.getElementById("wordCloudBox").style.display = "inline"
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
      text:
        wordCloudText && wordCloudText !== null
          ? wordCloudText
          : "animal man run let talk beautiful dance big happy ate unique scrupulous mischevous mysterious honor colorful prickly lamp brick phone mouse paper couch building", //ternary operator -> if there is no data, execute after ?; if there is data, display worldCloudText
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
      console.log(wordCloud);
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
  document.getElementById("showArchivesBox").style.display = "none";
  document.getElementById("inputBox").style.display = "flex";
  document.getElementById("inputs").style.display = "flex";
});

const buttonHomepage = document.getElementById("buttonHomepage");
buttonHomepage.addEventListener("click", () => {
  location.reload();
});

const buttonRestart = document.getElementById("buttonRestart");
buttonRestart.addEventListener("click", async () => {
  console.log("restart button click working");
  displayMadlib(api_url);
  document.getElementById("completedMadlibBox").style.display = "none";
  document.getElementById("inputBox").style.display = "flex";
  document.getElementById("inputs").style.display = "flex";
  document.getElementById("buttonSubmit").style.display = "inline"; //hide input container

});

buttonSubmit.addEventListener("click", () => {
  document.getElementById("inputBox").style.display = "none"; //hide input container
  document.getElementById("buttonSubmit").style.display = "none"; //hide input container
  document.getElementById("completedMadlibBox").style.display = "block";
  console.log(globalData.blanks);
  //store each input into completedBlanks array
  for (let i = 0; i < globalData.blanks.length; i++) {
    console.log(document.getElementById(`blank-${i}`));
    let completedBlank = document.getElementById(`blank-${i}`).value;
    completedBlanks.push(completedBlank);
  }

  //display completed madlib
  const madTitle = document.querySelector(".madlibTitle");
  madTitle.innerHTML = `<h3>${globalData.title}</h3>`; //display title of madlib
  //loop through blanks and values to display a string with the completed madlib
  let story = "";
  let words = [];
  for (let i = 0; i < globalData.blanks.length; i++) {
    const blank = globalData.blanks[i];
    const value = globalData.value[i];
    console.log(value);
    console.log(blank);
    document.querySelector(".madlibText");
    story += value + completedBlanks[i];
    words.push(completedBlanks[i]);
  }
  document.querySelector(".madlibText").innerHTML = makeBold(story, words); //make inputs bold in final madlib
  document.querySelector(".madlibText").innerHTML += "."; //add period at the end of madlib

  archiveStory(); //send this story to local storage

  //display updated word cloud
  document.getElementById(`inputs`).style.display = "none"; //hide input boxes
  let completedBlanksString = completedBlanks.join(" "); //convert array to string
  let savedBlanks = localStorage.getItem("savedBlanks"); //pull previously saved blanks
  console.log(savedBlanks === null);
  if (savedBlanks === null) {
    savedBlanks = "";
  }
  savedBlanks += completedBlanksString; //append saved blanks with words inputted for this madlib
  localStorage.setItem("savedBlanks", savedBlanks); //save updated save blanks in local storage
});

const showStoryButton = document.getElementById("showStory"); //selecting showStory button in HTML
const showArchives = document.querySelector(".showArchives"); //empty div where we're displaying the previously played story titles and links

showStoryButton.addEventListener("click", () => {
  document.getElementById("showArchivesBox").style.display = "flex";

  let numberOfStories = localStorage.length; //getting number of stories already available in local Storage
  for (let i = 0; i < numberOfStories - 1; i++) {
    let story = JSON.parse(localStorage.getItem(`savestory${i}`)); //converting from string to JS object again; we initially converted to a string (line 15) so need to change it back
    let a = document.createElement("a"); //creating anchor tag
    a.setAttribute("href", `story.html?storyId=savestory${i}`); //setting link for anchor tag
    a.className = "custom-class"; // added class name to style it in the css
    a.innerHTML = `<h4>${story.title}</h4>`; //setting the text as the story title
    showArchives.append(a); //adding all of the links inside of the initially empty div tag
  }
});

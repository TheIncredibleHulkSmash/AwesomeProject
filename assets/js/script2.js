let url = location.search.split("="); //splits based on the equal sign and convert to an array: ["storyId","savestory1"]
let storyId = url[1]; //accessing the last value that we get from the url: story.html?storyId=savestory${i}

let story = localStorage.getItem(storyId); //getting access to story data from local storage based on storyID above

let data = JSON.parse(story); //converting back into a JS object -> can't store JS object into local storage, convert it back so it can be displayed

//selecting div tags from lines 27 & 29 in index.html
let title = document.querySelector(".madlibTitle");
let content = document.querySelector(".madlibText");

//putting the data into the div tags so that the user can actually see the title and content
title.innerHTML = `<h3>${data.title}</h3>`;
content.innerHTML = data.content;

const buttonHomepage = document.getElementById("buttonHomepage");
buttonHomepage.addEventListener("click", () => {
  window.location.href = "./index.html";
});
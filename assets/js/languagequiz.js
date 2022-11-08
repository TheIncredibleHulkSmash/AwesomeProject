// TODO , replace test data.
var wordsToTranslate = ["cat", "rat", "bat"];
var translatedWords = [];

//
var mainQuestionElement = document.getElementById("mainQuestion");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");

// TODO: TEST DATA TO REPLACE WITH CALL

var currentQuestion = 0;

function setupLanguageQuiz() {
  translateWords();
  setupQuestion();

  testAPIToTranslate("cat");
}

async function testAPIToTranslate(translatedWord) {
  // !!!! PRIVATE KEY DO NOT SHARE IN GITHUB
  const keyForGoogleTranslate = "AIzaSyDhVj3IoQElFvXNvblP5GGM_1U6s0XdAvg";

  let url = `https://translation.googleapis.com/language/translate/v2?key=${keyForGoogleTranslate}`; // Modified
  url += "&source=" + "EN";
  url += "&target=" + "ES";
  url += "&q=" + escape(translatedWord);

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();

  console.log(result);

  console.log(result.data.translations[0].translatedText);
}

function translateWords() {
  // Batch over word's that have been saved and create their translation.
  /*for (i = 0; i<wordsToTranslate.length;i++)
  {
    // First Get 4 Random Words
    // ? Could get Antonyms 
    // ? Could get Thesaurus
    translatedWords[i] = "";
  }*/

  // TODO: remove test data
  translatedWords = [
    {
      sourceWord: "cat",
      translatedWord: "pero",
      translationLanguage: "Spanish",
      sourceLanguage: "English",
      incorrectWords: ["blanco", "parrot", "kat"],
      possibleAnswers: ["blanco", "pero", "parrot", "kat"],
      correctAnswerIndex: 1,
    },

    {
      sourceWord: "ice cream",
      translatedWord: "helado",
      translationLanguage: "Spanish",
      sourceLanguage: "English",
      incorrectWords: ["blanco", "parrot", "kat"],
      possibleAnswers: ["helado", "blanco", "parrot", "kat"],
      correctAnswerIndex: 0,
    },
  ];
}

function setupQuestion() {
  if (currentQuestion >= translatedWords.length) {
    startNewGame();
    return;
  }

  //
  mainQuestionElement.textContent =
    //"Translate: "+translatedWords[currentQuestion].sourceWord + " to " + translatedWords[currentQuestion].translatedWord;

    `Translate the word ${translatedWords[currentQuestion].sourceWord} in ${translatedWords[currentQuestion].sourceLanguage} to ${translatedWords[currentQuestion].translationLanguage} `;

  answer1.textContent = translatedWords[currentQuestion].possibleAnswers[0];
  answer2.textContent = translatedWords[currentQuestion].possibleAnswers[1];
  answer3.textContent = translatedWords[currentQuestion].possibleAnswers[2];
  answer4.textContent = translatedWords[currentQuestion].possibleAnswers[3];
}

function answerQuestion(answer) {
  if (translatedWords[currentQuestion].correctAnswerIndex == answer) {
    // YEAH THEY GOT RIGHT ANSWER
    currentQuestion++;
    setupQuestion();

    // TODO: Per requirements, remove
    alert("Correct");
  } else {
    // Picked wrong answer
    // TODO: Per requirements, remove

    alert("Wrong , keep trying");
  }
}

function startNewGame() {
  // TODO : Replace with a check they finished all the languages.

  location.replace("./index.html");
}

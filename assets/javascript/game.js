
  //GLOBAL VARIABLES
  //---

  //ARRAYS AND VARIABLES FOR HOLDONG DATA
  var wordsToGuess = ["will smith", "run dmc", "ice cube", "ll cool j", "mc hammer", "tupac", "Jay Z",
   "dr dre", "snoop dogg", "eazy e", "biggie smalls"];
  var selectedWord = " ";
  var lettersInWord = [];
  var numBlanks = 0;
  var blanksAndSuccesses = [];
  var wrongLetters = [];

  //GAME COUNTERS
  var totalWins = 0;
  var totalLosses = 0;
  var guessesLeft = 12;


  //FUNCTIONS (Reusable blocks of code that gets called upon when needed)
  //FUNCTION STARTGAME
  function startGame () {
  selectedWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
  lettersInWord = selectedWord.split("");
  numBlanks = lettersInWord.length;


      //RESET
      guessesLeft = 9;
      wrongLetters = [];
      blanksAndSuccesses = [];

      //POPULATE BLANKS (Populate blanks and successes with right numbers of blanks)
      for (var i=0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_ ");
      }

      document.getElementById("wordtoGuess").innerHTML = blanksAndSuccesses.join(" ");
      document.getElementById("guessesLeft").innerHTML = guessesLeft;
      document.getElementById("totalWins").innerHTML = totalWins;
      //document.getElementById("totalLosses").innerHTML = totalLosses;

      //TESTING/DEBUGGING
      console.log(selectedWord);
      console.log(lettersInWord);
      console.log(numBlanks);
      console.log(blanksAndSuccesses);
  }


  //ROUND STATUS (Change HTML to reflect round conditions)
  function checkLetters(letter) {

     var isletterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] == letter) {
          isletterInWord = true;
          //alert("letter found");
        }
    }

  //check the letter in word, then populate the blanksAndSuccesses array
  if(isletterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if(selectedWord[i] == letter) {
        blanksAndSuccesses[i] = letter;
      }
    }
  }
  else {
    wrongLetters.push(letter);
    guessesLeft--;
  }
  console.log(blanksAndSuccesses);
  document.getElementById("guessesLeft").innerHTML = guessesLeft;
  document.getElementById("wrongLetters").innerHTML = wrongLetters.join(", ");
  document.getElementById("wordtoGuess").innerHTML = blanksAndSuccesses.join(" ");

  };

  //check if the usr wins
  function roundComplete() {
      if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        totalWins++
        alert("Winner!");

        //update the counter in html
        document.getElementById("totalWins").innerHTML = totalWins;

        startGame();
      }
      else if (guessesLeft == 0) {
        totalLosses++
        alert("You Lost!");

        //update the counter in html
        //document.getElementById("totalLosses").innerHTML = totalLosses;

        startGame();
      }
  }



  //MAIN PROCESS
  
  //Starts the game for the first time
  startGame ();

  document.onkeyup = function(event) {
  // alert("working!");

  //this is function that is run over and over to prevent user error when the user presses a key
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();

  console.log(letterGuessed);
  }
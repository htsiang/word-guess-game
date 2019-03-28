// function for console logging array
function consoleLogArr(arr) {
    for (var i = 0; i<arr.length; i++) {
        console.log(arr[i]);
    };
};

// array of potential word choices
var kpopChoices = [
    {word: "bangtan", img: "bts.jpeg", song: "Idol by Bangtan Sonyeondan", songsrc: "idol-bangtan.mp3"},
    {word: "monstax", img: "monstax.jpg", song: "Spotlight by Monsta X", songsrc: "spotlight-monstax.mp3"},
    {word: "blackpink", img: "blackpink.jpg", song: "DDU-DU DDU-DU by Blackpink", songsrc: "ddududdudu-blackpink.mp3"},
    {word: "epikhigh", img: "epikhigh.jpg", song: "It's Cold by Epik High ft. Lee Hi", songsrc: "itscold-epikhigh.mp3"},
    {word: "shinee", img: "shinee.jpg", song: "Sherlock by SHINee", songsrc: "sherlock-shinee.mp3"},
    {word: "sunmi", img: "sunmi.jpg", song: "Siren by Sunmi", songsrc: "siren-sunmi.mp3"},
    {word: "girlsgeneration", img: "girlsgeneration.jpg", song: "Genie by Girl's Generation", songsrc: "genie-girlsgeneration.mp3"},
    {word: "twice", img: "twice.jpg", song: "What is Love by Twice", songsrc: "whatislove-twice.mp3"},
    {word: "mamamoo", img: "mamamoo.jpg", song: "Starry Night by Mamamoo", songsrc: "starrynight-mamamoo.mp3"}];
var guessesRemaining = 15; // # of guesses allowed
var winCount = 0; // track number of wins
var lossCount = 0; // track number of losses
var attemptedGuesses = []; // track already attempted guesses
var hangmanWord = ""; //empty string to hold word pseudo randomly selected by computer
var hangmanArray = []; // array to store each letter of hangmanWord
var blankArray = []; // to store blanks & correct guesses

// dynamically create element showing hangman progress
var targetWord = document.getElementById("current-word");
var currentWord; // child element for targetWord

// dynamically create element that displays # of guesses remaining
var trackGuesses = document.getElementById("guesses-remaining");

// dynamically create element that will display letters already guessed
var targetLettersUsed = document.getElementById("letters-used");
var lettersUsed;



newGame();

document.onkeyup = function() {
    
    // record user's guess
    var userGuess = event.key;
    userGuess = userGuess.toLowerCase();

    // checking if letter has already been tried
    if (attemptedGuesses.indexOf(userGuess) === -1) {
        // decrease # of remaining guesses by 1 & display
        guessesRemaining--;
        trackGuesses.textContent = guessesRemaining;
        

        // add key pressed to array recording tries
        attemptedGuesses.push(userGuess);

        // displays attempted guesses on html document
        lettersUsed = document.createElement("span");
        lettersUsed.textContent = userGuess + ", ";
        targetLettersUsed.appendChild(lettersUsed);

        console.log(userGuess);

        // if user user guess is one of the letters in the hangman word
        if (hangmanArray.indexOf(userGuess) > -1) {

            // run loop to check userGuess against each letter of hangmanArray
            for (var i=0; i<hangmanArray.length; i++) {
                if(userGuess===hangmanArray[i]) {
                    blankArray[i] = userGuess;
                };
            };

            consoleLogArr(blankArray);

            //reset & override targetWord & currentWord
            targetWord.textContent = "";
            // append new version of currentWord
            for (var i=0; i<blankArray.length; i++) {
                currentWord = document.createElement("span");
                currentWord.textContent = blankArray[i] + " ";
                targetWord.appendChild(currentWord);
            };
        };

        // check if word is completely guessed
        for (var i=0; i<hangmanArray.length; i++) {

            if (hangmanArray[i]!==blankArray[i]) {
                console.log("Not yet.");
                break;
            }
            else if (i===hangmanArray.length-1 && hangmanArray[i]===blankArray[i]) {
                // increment winCount & display new # of wins
                winCount++;
                var targetWin = document.getElementById("win-count");
                targetWin.textContent = winCount;

                showImageAndSong(hangmanWord);

                newGame();
            }
            else {
                continue;
            };
        };

        if (guessesRemaining===0) {
            console.log("You lost");
            lossCount++;
            var targetLoss = document.getElementById("loss-count");
            targetLoss.textContent = lossCount;

            showImageAndSong(hangmanWord);

            newGame();
        };
    }
    else {
        console.log("Already tried.");
    };
};

// ******all my functions defined here*******

// new game function resets hangman word & letter tracking for new hangman game
function newGame() {
    // resets # of guesses
    guessesRemaining = 15;
    trackGuesses.textContent = guessesRemaining

    // resets letters we've tried already to nothing
    attemptedGuesses.length=0;

    // resets display of letters already guessed on html document
    targetLettersUsed.textContent = "";

    // resets hangmanArray to nothing
    hangmanArray.length = 0;

    // computer selects new word from array
    hangmanWord = kpopChoices[Math.floor(Math.random()*kpopChoices.length)].word;
    console.log(hangmanWord);
    // pushes new word into hangmanArray
    for (var i=0; i<hangmanWord.length; i++) {
        hangmanArray.push(hangmanWord.charAt(i));
    };
    consoleLogArr(hangmanArray);

    blankArray.length = 0; // resets blankArray
    // resets targetWord to fill blankArray using new word
    targetWord.textContent = "";
    for (var i=0; i<hangmanWord.length; i++) {
        currentWord = document.createElement("span");
        currentWord.textContent = "_ ";
        targetWord.appendChild(currentWord);

        // creates array w/ # of blanks needed to be filled
        blankArray.push("_ ");
    };

    consoleLogArr(blankArray);
};

// show image & song associated w/ hangman word
function showImageAndSong(hangmanWord) {
    for(var i=0; i<kpopChoices.length; i++) {
        if(hangmanWord===kpopChoices[i].word) {
            // display correct song title
            document.getElementById("song-title").textContent = kpopChoices[i].song;

            // change image & display image
            document.getElementById("kpop-image").src = "assets/images/" + kpopChoices[i].img;
            document.getElementById("kpop-image").alt = kpopChoices[i].word;

            // change song & play song
            document.getElementById("kpop-song").src = "assets/songs/" + kpopChoices[i].songsrc;
            document.getElementById("kpop-song").play();
        };
    };
};
// Require letter.js to use in this file
// nmp install cli-color to get text colors


var Letter = require("./letter.js");
var clc = require('cli-color');


// Create Word constructor

function Word(value) {
    this.value = value;
    this.letters = [];
    this.userGuesses = "";
    this.guessesLeft = 10;
    this.space = false;

    // Create a for loop and push the letters value

    for (var i = 0; i < this.value.length; i++) {
        this.letters.push(new Letter(this.value[i]));
    }
}


// Creat a function to check if the user guessed the word correctly
// The user has guessed the right word if all of the letter's show properties are = to true  
// Otherwise return false

// Create a prototype for this method

Word.prototype.guessedCorrect = function () {
    for (var i = 0; i < this.letters.length; i++) {
        if (!this.letters[i].show)
            return false;
    }
    return true;
};



// If the user guesses a correct letter, change the dash to the letter
// Let the user know if they have already guessed that letter and do not take away a guess
// Use indexOf method to get the letter, it is case sensitive 

Word.prototype.findLetter = function (letter) {
    var lowerCaseLetter = letter.toLowerCase();
    this.space = false;
    if (this.userGuesses.indexOf(lowerCaseLetter) != -1) {
        console.log("You have already guessed that letter!" + "\n");
        this.space = true;
        return;
    }

    // If the letter is not already guessed, store the letter

    this.userGuesses += lowerCaseLetter;
    for (var i = 0; i < this.letters.length; i++) {


        // If the letter is in the letters array, change the show value to true to replace the dash

        if (this.letters[i].value.toLowerCase() === lowerCaseLetter) {
            this.letters[i].show = true;
            this.space = true;
        }
    }

    // If the user guesses an incorrect letter guessesLeft minus 1, alert incorrect
    // Otherwise alert correct and don't take away a guess

    if (!this.space) {
        console.log(clc.red("\n" + "Incorrect!!!" + "\n"));
        this.guessesLeft--;
    } else
        console.log(clc.green("\n" + "Correct!!!" + "\n"));
};



// Create a prototype to convert the random instrument to a string

Word.prototype.toString = function () {
    var output = "";
    for (var i = 0; i < this.letters.length; i++) {
        output += this.letters[i].dash();
    }
    return output;
};

// Export to use in other files

module.exports = Word;
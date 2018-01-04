// NPM init to get package.json
// NPM install inquirer 
// Require from other js files


var compChoices = require("./wordpick.js");
var Word = require("./word.js");
var Letter = require("./letter.js");
var inquirer = require("inquirer");
var wordToGuess = compChoices();
var clc = require('cli-color');


// Create variables to keep track of the user's wins and losses

var wins = 0;
var losses = 0;

var myInstrument = new Word(wordToGuess);

// Create a function to start up the game


function startUp() {
    console.log("\n" + "Guess A Letter! " + myInstrument + "\n")

    // If the user does not have any guesses left alert them and end the game
    // Increase their losses by 1
    // Ask them if they want to play again

    if (myInstrument.guessesLeft < 1) {
        console.log(clc.red('Sorry!!! You are out of guesses, better luck next time!'));
        losses++;
        askAgain();
    }

    // If the user has more guesses left ask them to select a letter again
    else {
        guessLetter();
    }
}

// Prompt inquirer to ask questions to the user and get the information

var guessLetter = function () {
    inquirer.prompt([{
        name: 'letter',
        type: 'text',
        message: 'Guess a letter:',

    }]).then(function (answer) {
        var letter = answer.letter;
        myInstrument.findLetter(letter);
        if (myInstrument.guessedCorrect()) {
            console.log(clc.yellow('You Win!! The correct instrument is: ' + myInstrument.toString()));
            wins++;
            askAgain();
        } else {
            console.log('Guesses Left : ' + myInstrument.guessesLeft);


            // Call the startUp function

            startUp();
        }

    });
}

// Create the askAgain function

var askAgain = function () {
    inquirer.prompt([{
        name: 'choice',
        type: 'text',
        message: '\n' + 'Do you want to play again? (y/n) ',

    }]).then(function (answer) {
        var choice = answer.choice;
        if (choice === 'y' || choice === 'Y') {
            newWord();
            startUp();

        } else {
            scoreboard();
            return;
        }
    });
}

// Create a function to generate a new word
// add in the variable myInstrument again in this function 

function newWord() {
    wordToGuess = compChoices();
    myInstrument = new Word(wordToGuess);
}

// Show the user the scoreboard at the end of the game

function scoreboard() {
    console.log(

        "Scoreboard \n" +
        "Wins : " + wins + "\n" +
        "Losses : " + losses + "\n"
    );
}

// Call the start up function to start

startUp();
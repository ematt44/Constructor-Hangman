// Create a function for the computer to randomly select a word for the user to guess

//  Use Math.random for the computer to select the work from the array

var compChoices = function () {
    var instruments = ["guitar", "drums", "didgeridoo", "youkelele", "harmonica", "triangle", "piano", "xylophone"];
    var randomInstrument = Math.floor(Math.random() * instruments.length);
    return instruments[randomInstrument];
};

// Export so it can be used in other files

module.exports = compChoices;
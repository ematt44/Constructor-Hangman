// Create Letter constructor with parameter "value"

function Letter(value) {
    this.value = value;
    this.show = false;
    if (this.value === ' ')
        this.show = true;
}

// Create a prototype for the letter to replace the dash

Letter.prototype.dash = function () {
    if (this.show) {
        return this.value;
    }
    return "_ ";
}


// Export to use in other files
module.exports = Letter;
let randomNumber = Math.floor(Math.random() * 100) + 1;
const submit = document.querySelector('.submit');
const input = document.querySelector('.inputField');
const prevGuess = document.querySelector('.PrevGuesses');
const guessRemaining = document.querySelector('.GuessRemaining');
const lowOrHigh = document.querySelector('.LowOrHigh');
const reset = document.querySelector('.resetButton');
const prevDisplay = document.querySelector('.PrevGuessDisplay');

let playGame = true;
let numberOfGuesses = 0;
let previousGuesses = [];

reset.addEventListener('click', resetGame);

if (playGame) {
    submit.addEventListener('click', handleGuess);
}

function handleGuess() {
    const guess = parseInt(input.value);
    if (validateGuess(guess)) {
        previousGuesses.push(guess);
        displayGuess(guess);

        if (guess === randomNumber) {
            displayMessage('Hurray!! You guessed it right.', 'green');
            endGame();
        } else if (numberOfGuesses === 10) {
            displayMessage(`Game Over. Random number was ${randomNumber}`, 'red');
            endGame();
        } else if (guess > randomNumber) {
            displayMessage('Ooppps your entered number is greater than the actual number', 'red');
        } else {
            displayMessage('Ooppps your entered number is smaller than the actual number', 'red');
        }
    }
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Enter a valid number');
        return false;
    } else if (guess > 100 || guess <= 0) {
        alert('Enter a number between range 1 to 100');
        return false;
    }
    return true;
}

function displayGuess(guess) {
    prevDisplay.innerHTML = 'Previous Guess:';
    input.value = '';
    prevGuess.innerHTML = previousGuesses.join(', ');
    numberOfGuesses++;
    guessRemaining.innerHTML = `${10 - numberOfGuesses}`;
}

function displayMessage(message, color = 'red') {
    lowOrHigh.innerHTML = `<h4 style="color: ${color}">${message}</h4>`;
}

function endGame() {
    input.value = '';
    input.setAttribute('disabled', '');
    playGame = false;
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    previousGuesses = [];
    numberOfGuesses = 0;
    prevGuess.innerHTML = '';
    guessRemaining.innerHTML = `${10}`;
    lowOrHigh.innerHTML = '';
    input.removeAttribute('disabled');
    playGame = true;
}

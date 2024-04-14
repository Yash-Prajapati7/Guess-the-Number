let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('.submit');
const input = document.querySelector('.inputField');
const prevGuess = document.querySelector('.PrevGuesses');
const guessRemaining = document.querySelector('.GuessRemaining');
const lowOrHigh = document.querySelector('.LowOrHigh');
const result = document.querySelector('.result');
const reset = document.querySelector('.resetButton');

const p = document.createElement('p');

let playGame = true;
let numberOfGuess = 0;
let previousGuess = [];

reset.addEventListener('click', function(e) {
  randomNumber = parseInt(Math.random() * 100 + 1);
  previousGuess = [];
  numberOfGuess = 0;
  prevGuess.innerHTML = '';
  guessRemaining.innerHTML = `${10 - numberOfGuess}`;
  lowOrHigh.innerHTML = '';
  input.removeAttribute('disabled');
  playGame = true;
});

if (playGame) {
  submit.addEventListener('click', function(e) {
    const guess = parseInt(input.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Enter a valid number");
  } else if (guess > 100 || guess <= 0) {
    alert("Enter a number between range 1 to 100");
  } else {
    previousGuess.push(guess);
    if (numberOfGuess === 9) {
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`, "red");
      endGame();
    } else {
      checkGuess(guess);
      displayGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`Hurray!! You guessed it right.`, "green");
    endGame();
  } else if (guess > randomNumber) {
    displayMessage('Ooppps your entered number is greater than the actual number', "red");
  } else {
    displayMessage('Ooppps your entered number is smaller than the actual number', "red");
  }
}

function displayGuess(guess) {
  input.value = '';
  prevGuess.innerHTML = `<span>Previous guesses : </span>${previousGuess.join(",")}`;
  numberOfGuess += 1;
  guessRemaining.innerHTML = `${10 - numberOfGuess}`;
}

function displayMessage(message, color = "red") {
  lowOrHigh.innerHTML = `<h4 style="color: ${color}">${message}</h4>`;
}

function endGame() {
  input.value = '';
  input.setAttribute('disabled', '');
  playGame = false;
}

'use strict';

// Variables
const elementScore0 = document.getElementById('score--0');
const elementScore1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const elementDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Initial conditions
let scores, activePlayer, currentScore, playing;

const init = () => {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  elementScore0.textContent = 0;
  elementScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  elementDice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    elementDice.classList.remove('hidden');
    elementDice.src = `./images/dice-${dice}.png`;
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      elementDice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

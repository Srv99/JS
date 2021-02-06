'use strict';

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
const displayMsg = (message) => {
  document.querySelector('.message').textContent = message;
};
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (guess == 0) displayMsg('⛔ No Number!!');
  else if (guess === secretNumber) {
    displayMsg('🎉 Sucess...');
    document.querySelector('.number').textContent = secretNumber;
    let currentHighScore = Number(
      document.querySelector('.highscore').textContent
    );
    document.querySelector('.highscore').textContent = Math.max(
      score,
      currentHighScore
    );
    document.body.style.background = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').style.left = '60%';
  } else if (guess != secretNumber) {
    if (score > 1) {
      displayMsg(guess > secretNumber ? '📈 Too High!!' : '📉 Too Low!!');
      score = score - 1;
      document.querySelector('.score').textContent = score;
    } else {
      displayMsg('🔥 You lost the game !!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  displayMsg('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.body.style.background = '#222';
  document.querySelector('.score').textContent = '20';
  score = 20;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').style.left = '52%';
});

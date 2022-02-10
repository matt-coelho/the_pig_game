'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score_pl1 = document.querySelector('#score--0');
const score_pl2 = document.querySelector('#score--1');
const current_score_pl1 = document.querySelector('#current--0');
const current_score_pl2 = document.querySelector('#current--1');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
const the_dice_img = document.querySelector('.dice');

let player = 0;
let current_score = 0;
let score = [0, 0];
let isPlaying = true;

the_dice_img.classList.add('hidden');

const changePlayer = function () {
  if (player === 0) {
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  } else {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
  player === 1 ? (player = 0) : (player = 1);
  console.log(`${score[0]} vs ${score[1]}.`);
  console.log('switch player.');
  the_dice_img.classList.add('hidden');
};

btn_hold.addEventListener('click', function () {
  if (isPlaying) {
    console.log(`player ${player + 1}, score ${current_score}.`);
    if (player === 0) {
      score[0] += current_score;
      score_pl1.textContent = score[0];
      current_score_pl1.textContent = 0;
    } else {
      score[1] += current_score;
      score_pl2.textContent = score[1];
      current_score_pl2.textContent = 0;
    }
    current_score = 0;
    if (score[0] >= 100 || score[1] >= 100) {
      isPlaying = false;
      if (score[0] >= 100) {
        player1.classList.add('player--winner');
      } else {
        player2.classList.add('player--winner');
      }
      console.log(`${score[0]} vs ${score[1]}.`);
      console.log('victory!!!');
      btn_roll.classList.add('hidden');
      btn_hold.classList.add('hidden');
    } else {
      changePlayer();
    }
  }
});

btn_roll.addEventListener('click', function () {
  if (isPlaying) {
    const dice_v = Math.trunc(Math.random() * 6) + 1;
    console.log(`current player ${player + 1}, dice ${dice_v}.`);
    the_dice_img.src = `dice-sides/dice-${dice_v}.png`;

    if (the_dice_img.classList.contains('hidden')) {
      the_dice_img.classList.remove('hidden');
    }

    dice_v === 1 ? (current_score = 0) : (current_score += dice_v);
    player === 0
      ? (current_score_pl1.textContent = current_score)
      : (current_score_pl2.textContent = current_score);

    if (dice_v === 1) {
      changePlayer();
    }
  }
});

btn_new.addEventListener('click', function () {
  current_score = 0;
  score[0] = 0;
  score[1] = 0;
  isPlaying = true;
  player = 0;
  current_score_pl1.textContent = 0;
  current_score_pl2.textContent = 0;
  score_pl1.textContent = 0;
  score_pl2.textContent = 0;
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  btn_roll.classList.remove('hidden');
  btn_hold.classList.remove('hidden');
});

window.addEventListener('load', init);

let time = 6;
let score = 0;
let highScore = 0;
let isPlaying;
let difficulty = 'medium';
let timeInterval;

// DOM
const currentWord = document.querySelector('#current-word');
const wordInput = document.getElementById('word-input');
const timeDisplay = document.querySelector('#time');
const scoreDisplay = document.querySelector('#score');
const message = document.querySelector('#message');
const highScoreDisplay = document.querySelector('#high-score');

// وشەکان
const words = [
  " ژیر لەفە", " ڤێنوار لەفە", "ولیام", "خواستی", "هەستی", "پەیوەند", "محمەد",
  "ئاکار", "حوسێن", "ڕامین", "ئەحمەد", "کۆڤین", "شادە", "مەنسا", "خولەی بچووک",
  "میرشاد", "فلاوفل", "مریشک", "ئەنەس", "کتێب", "جگەر", "کوبە", "شفتە", "بۆرەک",
  "ماسی", "کەر", "بزن", "مەڕ", "کۆتر", "شێر", "کەروێشک"
];

// Start game
function init() {
  // گەڕانەوەی خاڵی باشترین یاریزان
  highScore = localStorage.getItem('highScore') || 0;
  highScoreDisplay.innerHTML = highScore;

  showWord(words);

  timeInterval = setInterval(countDown, 1000);
  setInterval(cheackStatus, 50);

  wordInput.addEventListener('input', startGame);
}

// Random word display
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  const word = words[randIndex];
  currentWord.innerHTML = word;

  const colors = ['text-green-400', 'text-yellow-400', 'text-pink-400', 'text-cyan-400'];
  currentWord.className = `mb-5 text-2xl font-bold ${colors[Math.floor(Math.random() * colors.length)]}`;
}

// Countdown
function countDown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

// Check status
function cheackStatus() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    highScoreDisplay.innerHTML = highScore;
  }

  if (score === 50) {
    isPlaying = false;
    message.innerHTML = '🏆 تۆ بردی یارییەکە!';
    clearInterval(timeInterval);
  }

  if (time === 0 && isPlaying === false) {
    message.innerHTML = '💀 یاری تەواو بوو';
    score = 0;
    scoreDisplay.innerHTML = 0;
  }
}

// Start game logic
function startGame() {
  if (matchWord()) {
    isPlaying = true;

    // زمانەکە پەیوەندیدار بە قورسییە
    if (difficulty === 'easy') time = 8;
    if (difficulty === 'medium') time = 6;
    if (difficulty === 'hard') time = 4;

    showWord(words);
    wordInput.value = '';
    score++;
  }

  scoreDisplay.innerHTML = score < 0 ? 0 : score;
}

// Check match
function matchWord() {
  if (wordInput.value.trim() === currentWord.innerHTML.trim()) {
    message.innerHTML = '✅ ڕاستە! بەردەوام بە 🚀';
    return true;
  } else {
    message.innerHTML = '❌ هەڵەیە!';
    return false;
  }
}

// Difficulty switcher
function setDifficulty(level) {
  difficulty = level;
}

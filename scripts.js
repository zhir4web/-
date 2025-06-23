  window.addEventListener('load', init);

    let time = 6;
    let score = 0;
    let highScore = 0;
    let isPlaying;
    let difficulty = 'medium';
    let timeInterval;

    const currentWord = document.querySelector('#current-word');
    const wordInput = document.getElementById('word-input');
    const timeDisplay = document.querySelector('#time');
    const scoreDisplay = document.querySelector('#score');
    const message = document.querySelector('#message');
    const highScoreDisplay = document.querySelector('#high-score');

    const words = [
      " ژیر لەفە", " ڤێنوار لەفە", "ولیام", "خواستی", "هەستی", "پەیوەند", "محمەد",
      "ئاکار", "حوسێن", "ڕامین", "ئەحمەد", "کۆڤین", "شادە", "مەنسا", "خولەی بچووک",
      "میرشاد", "فلاوفل", "مریشک", "ئەنەس", "کتێب", "جگەر", "کوبە", "شفتە", "بۆرەک",
      "ماسی", "کەر", "بزن", "مەڕ", "کۆتر", "شێر", "کەروێشک"
    ];

   function init() {
  highScore = localStorage.getItem('highScore') || 0;
  highScoreDisplay.innerHTML = highScore;

  // ناینووسرێ وشە یان کات
  message.innerHTML = 'سەرەتا  هەڵبژێرە و دوگمەی \"دەست پێکردن\" بکە';
  wordInput.value = '';
  wordInput.disabled = true;
}


    function showWord(words) {
      const randIndex = Math.floor(Math.random() * words.length);
      const word = words[randIndex];
      currentWord.innerHTML = word;

      const colors = ['text-green-400', 'text-yellow-400', 'text-pink-400', 'text-cyan-400'];
      currentWord.className = `mb-5 text-2xl font-bold ${colors[Math.floor(Math.random() * colors.length)]}`;
    }

  function countDown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
    message.innerHTML = '💀 کات تەواو بوو';
    wordInput.disabled = true;
    wordInput.removeEventListener('input', startGame);
    clearInterval(timeInterval);
  }

  timeDisplay.innerHTML = time;
}

    function cheackStatus() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    highScoreDisplay.innerHTML = highScore;
  }

  if (score === 50) {
    isPlaying = false;
    message.innerHTML = '🏆  تۆ  یارییەکە و بردەوە!';
    wordInput.disabled = true;
    clearInterval(timeInterval);
    wordInput.removeEventListener('input', startGame); // ⚠️ لابردنی گوێگر
  }

  if (time === 0 && isPlaying === false) {
    message.innerHTML = '💀 یاری تەواو بوو';
    score = 0;
    scoreDisplay.innerHTML = 0;
    wordInput.disabled = true;
    clearInterval(timeInterval);
    wordInput.removeEventListener('input', startGame); // ⚠️ لابردنی گوێگر
  }
}


    function startGame() {
      if (matchWord()) {
        isPlaying = true;

        if (difficulty === 'easy') time = 8;
        if (difficulty === 'medium') time = 6;
        if (difficulty === 'hard') time = 4;

        showWord(words);
        wordInput.value = '';
        score++;
      }

      scoreDisplay.innerHTML = score < 0 ? 0 : score;
    }

    function matchWord() {
      if (wordInput.value.trim() === currentWord.innerHTML.trim()) {
        message.innerHTML = '✅ ڕاستە! بەردەوام بە 🚀';
        return true;
      } else {
        message.innerHTML = '❌ هەڵەیە!';
        return false;
      }
    }

    function setDifficulty(level) {
      difficulty = level;
    }

    function startGameHandler() {
  score = 0;
  wordInput.value = '';
  scoreDisplay.innerHTML = score;
  message.innerHTML = '🕹️ یاری دەستی پێکرد!';
  showWord(words);
  wordInput.focus();
  wordInput.disabled = false;

  if (difficulty === 'easy') time = 8;
  if (difficulty === 'medium') time = 6;
  if (difficulty === 'hard') time = 4;

  isPlaying = true;

  clearInterval(timeInterval);
  timeInterval = setInterval(countDown, 1000);

  // لەوێ ئەمجار دەست پێ بکە بە گوێنەگرنی input
  wordInput.addEventListener('input', startGame);
}

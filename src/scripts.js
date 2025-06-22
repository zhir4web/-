window.addEventListener('load',init);
let time = 6;
let score = 0;
let isPlaying;

//DOM 
const currentWord = document.querySelector('#current-word');
const wordInput = document.getElementById('word-input');
const timeDisplay= document.querySelector('#time');
const scoreDisplay= document.querySelector('#score');
const message = document.querySelector('#message');


// array

const words = [
    "parachute",
    "suburb",
    "method",
    "cover",
    "praise",
    "pace",
    "beard",
    "shadow",
    "boat",
    "weight",
    "gloom",
    "invisible",
    "book",
    "hole",
    "tight",
    "pill",
    "photography",
    "civilization",
    "flight",
    "shiver",
    "teach",
    "cluster",
    "throat",
    "glue",
    "surprise",
    "concrete",
    "council",
    "trouser",
    "survivor",
    "excuse"
];


// init game 

function init(){
    showWord(words);

    setInterval(countDown,1000);

    setInterval(cheackStatus,50);

    wordInput.addEventListener('input',startGame);

}

function showWord(words){
    const randIndex =Math.floor(Math.random()* words.length);
   currentWord.innerHTML = words[randIndex];
}

function countDown(){
    if (time>0){
        time--;
    }else if (time ==0){
    isPlaying = false;
    }
    timeDisplay.innerHTML=time;
}


function cheackStatus(){
    if (time === 0 && isPlaying === false){
        message.innerHTML = 'game over';
        score=-1;
    }
}

function startGame(){
    if(matchWord()){
        isPlaying = true;
        time = 6;
        showWord(words);
        wordInput.value ='';
        score++;
    }
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }else{
        scoreDisplay.innerHTML=score;
    }
}

function matchWord(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'correct';
        return true;
    }else {
        message.innerHTML = '';
        return false;
    }
}
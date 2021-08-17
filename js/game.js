// Variables
var height = 0;
var width = 0;
var life = 1;
var time = 30;
var timeCreateFly = 1000;

// Level
var level = window.location.search;
level = level.replace('?', '');

if (level === 'easy') {
    timeCreateFly = 2000;
    document.getElementById('level').innerHTML = 'Fácil';
} else if (level === 'normal') {
    timeCreateFly = 1500;
    document.getElementById('level').innerHTML = 'Normal';
} else if (level === 'hard') {
    timeCreateFly = 1000;
    document.getElementById('level').innerHTML = 'Difícil';
} else {
    window.location.href = './index.html';
}

// Responsive size of screen
function sizeOfScreen() {
    height = window.innerHeight;
    width = window.innerWidth;
}

// Timer
var timer = setInterval(() => {
    time--;

    if (time < 0) {
        clearInterval(timer);
        clearInterval(createFly);
        window.location.href = './gameWin.html';
    } else {
        document.getElementById('timer').innerHTML = time;
    }
}, 1000);

// Creating flys in random positions
function randomPosition() {
    if (document.getElementById('fly')) {
        document.getElementById('fly').remove();
        document.getElementById('heart' + life).src = './img/emptyHeart.png';

        life > 2 ? window.location.href = './gameOver.html' : life++;
    }

    var positionY = Math.floor(Math.random() * height) - 90;
    var positionX = Math.floor(Math.random() * width) - 90;

    positionY = positionY < 0 ? 0 : positionY;
    positionX = positionX < 0 ? 0 : positionX;

    var fly = document.createElement('img');
    fly.src = 'img/fly.png';
    fly.className = randomSize() + ' ' + randomSide();
    fly.style.position = 'absolute';
    fly.style.top = positionY + 'px';
    fly.style.left = positionX + 'px';
    fly.style.filter = 'drop-shadow(0px 5px 15px #0005)';
    fly.id = 'fly';
    fly.onclick = function() {
        this.remove()
    } 

    document.body.appendChild(fly);
}

// Random size of fly
function randomSize() {
    var sizeOfFly = Math.floor(Math.random() * 3);

    if (sizeOfFly === 0) {
        return 'fly-small';
    } else if (sizeOfFly === 1) {
        return 'fly-medium';
    } else if (sizeOfFly === 2) {
        return 'fly-big';
    }
}

// Random side of fly
function randomSide() {
    var side = Math.floor(Math.random() * 2);

    if (side === 0) {
        return 'side-left';
    } else if (side === 1) {
        return 'side-right';
    }
}

sizeOfScreen();
var createFly = setInterval(() => randomPosition(), timeCreateFly);
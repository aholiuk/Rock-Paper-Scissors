let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

let autoPlayElement = document.querySelector('.js-auto-play-button');

function autoPlay() {
  if (!isAutoPlaying) {
    isAutoPlaying = true;
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    autoPlayElement
      .innerHTML = 'Stop spielen';

  } else {
    isAutoPlaying = false;
    clearInterval(intervalId);
    
    autoPlayElement
      .innerHTML = 'Auto spielen';
  }
}

autoPlayElement
  .addEventListener('click', () => {
    autoPlay();
  });

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    resetScore();
  });
  
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'Tab') {
    resetScore();
  } else if (event.key === 'Space') {
    autoPlay();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'Du verlierst.';
    } else if (computerMove === 'paper') {
      result = 'Du gewinnst.';
    } else if (computerMove === 'scissors') {
      result = 'Unentschied.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'Du gewinnst.';
    } else if (computerMove === 'paper') {
      result = 'Unentschied.';
    } else if (computerMove === 'scissors') {
      result = 'Du verlierst.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Unentschied.';
    } else if (computerMove === 'paper') {
      result = 'Du verlierst.';
    } else if (computerMove === 'scissors') {
      result = 'Du gewinnst.';
    }
  }

  if (result === 'Du gewinnst.') {
    score.wins ++;
  } else if (result === 'Du verlierst.') {
    score.losses ++;
  } else if (result === 'Unentschied.') {
    score.ties ++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `Du
  <img src="Bilder/${playerMove}-emoji.png"
  class="move-icon">
  <img src="Bilder/${computerMove}-emoji.png"
  class="move-icon">
  Computer`;
}


function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Gewinns: ${score.wins}, Verluste: ${score.losses}, Unentschieden: ${score.ties}`;
    
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } 
  else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  
  return computerMove;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

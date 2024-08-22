// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const resetButton = document.getElementById('reset');

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let score = 0;
    let matches = 0;
    let isFlipping = false;
    let startTime;
    let timerInterval;

    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    function startGame() {
        resetGame();
        initializeBoard();
        startTimer();
    }

    function initializeBoard() {
        const shuffledValues = shuffle([...cardValues, ...cardValues]);
        shuffledValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.innerHTML = `<span class="card-value">${value}</span>`;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function flipCard() {
        if (isFlipping) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkMatch();
        }
    }

    function checkMatch() {
        isFlipping = true;
        const match = firstCard.dataset.value === secondCard.dataset.value;
        if (match) {
            disableCards();
            score += 10;
            matches++;
            if (matches === cardValues.length) {
                stopTimer();
                alert(`Congratulations! Your final score is ${score}`);
            }
        } else {
            unflipCards();
            score -= 2;
        }
        scoreDisplay.textContent = score;
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetFlip();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetFlip();
        }, 1000);
    }

    function resetFlip() {
        firstCard = null;
        secondCard = null;
        isFlipping = false;
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetGame() {
        clearInterval(timerInterval);
        gameBoard.innerHTML = '';
        score = 0;
        matches = 0;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = '00:00';
        firstCard = null;
        secondCard = null;
        isFlipping = false;
    }

    resetButton.addEventListener('click', startGame);

    startGame();
});

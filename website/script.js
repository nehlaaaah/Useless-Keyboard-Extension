let startTime;
let timer;
let isTyping = false;

const textToType = document.getElementById('text-to-type').innerText;
const userInput = document.getElementById('user-input');
const results = document.getElementById('results');
const timeDisplay = document.getElementById('time');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');

document.getElementById('start-btn').addEventListener('click', startTest);

function startTest() {
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    results.classList.add('hidden');
    isTyping = true;
    startTime = new Date();

    userInput.addEventListener('input', checkInput);
}

function checkInput() {
    if (!isTyping) return;

    const currentText = userInput.value;
    const expectedText = textToType.substring(0, currentText.length);

    if (currentText === expectedText) {
        if (currentText.length === textToType.length) {
            endTest();
        }
    } else {
        userInput.value = expectedText;
    }
}

function endTest() {
    isTyping = false;
    clearInterval(timer);

    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    const wpm = Math.round((userInput.value.split(' ').length / timeTaken) * 60);
    const accuracy = Math.round((userInput.value.length / textToType.length) * 100);

    timeDisplay.textContent = timeTaken.toFixed(2);
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;

    results.classList.remove('hidden');
    userInput.disabled = true;
}

// Add click event listeners to all keys
const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        key.classList.add('clicked'); // Add the clicked class to trigger the animation
    });

    key.addEventListener('transitionend', () => {
        key.classList.remove('clicked'); // Remove the clicked class after the animation ends
    });

    key.addEventListener('click', () => {
        handleKeyPress(key);
    });
});

// Handle keypress events for keyboard input
userInput.addEventListener('keydown', (event) => {
    const keyValue = event.key === ' ' ? 'Space' : event.key.toUpperCase();
    const key = Array.from(keys).find(k => k.textContent === keyValue);
    if (key) {
        handleKeyPress(key);
    }
});

// Function to handle key press logic
function handleKeyPress(key) {
    key.classList.add('clicked'); // Add animation class
    const keyValue = key.textContent === 'Space' ? ' ' : key.textContent;
    userInput.value += keyValue; // Append key value to textarea

    // Remove the class after animation
    setTimeout(() => {
        key.classList.remove('clicked'); // Ensure the class is removed after a short delay
    }, 100); // Match the duration in CSS
}


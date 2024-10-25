document.addEventListener('DOMContentLoaded', () => {
  const keys = document.querySelectorAll('.key');
  const output = document.getElementById('output');

  // Prevent mouse clicks from doing anything
  keys.forEach(key => {
    key.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  // Handle keyboard input
  document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`) ||
                      (event.key === ' ' && document.querySelector('.key[data-key=" "]'));
    
    if (keyElement) {
      keyElement.classList.add('pressed');
      if (output) {
        output.value += event.key;
        // Keep cursor at end of input
        output.scrollLeft = output.scrollWidth;
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    const key = event.key.toUpperCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`) ||
                      (event.key === ' ' && document.querySelector('.key[data-key=" "]'));
    
    if (keyElement) {
      keyElement.classList.remove('pressed');
    }
  });
});
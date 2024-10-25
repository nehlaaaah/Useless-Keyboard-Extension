document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key');
    const output = document.getElementById('output');
  
    // Prevent clicking on keys
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
        output.value += event.key;
        output.scrollLeft = output.scrollWidth;
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
// Create the keyboard layout
const createKeyboard = () => {
    const keyboard = document.createElement('div');
    keyboard.className = 'useless-keyboard';
    keyboard.innerHTML = `
      <div class="keyboard">
        <div class="row">
          <div class="key" data-key="Q">Q</div>
          <div class="key" data-key="W">W</div>
          <div class="key" data-key="E">E</div>
          <div class="key" data-key="R">R</div>
          <div class="key" data-key="T">T</div>
          <div class="key" data-key="Y">Y</div>
          <div class="key" data-key="U">U</div>
          <div class="key" data-key="I">I</div>
          <div class="key" data-key="O">O</div>
          <div class="key" data-key="P">P</div>
        </div>
        <div class="row">
          <div class="key" data-key="A">A</div>
          <div class="key" data-key="S">S</div>
          <div class="key" data-key="D">D</div>
          <div class="key" data-key="F">F</div>
          <div class="key" data-key="G">G</div>
          <div class="key" data-key="H">H</div>
          <div class="key" data-key="J">J</div>
          <div class="key" data-key="K">K</div>
          <div class="key" data-key="L">L</div>
        </div>
        <div class="row">
          <div class="key" data-key="Z">Z</div>
          <div class="key" data-key="X">X</div>
          <div class="key" data-key="C">C</div>
          <div class="key" data-key="V">V</div>
          <div class="key" data-key="B">B</div>
          <div class="key" data-key="N">N</div>
          <div class="key" data-key="M">M</div>
        </div>
        <div class="row">
          <div class="key space" data-key=" ">SPACE</div>
        </div>
        <input type="text" id="keyboard-output" placeholder="Type using your external keyboard">
      </div>
    `;
    return keyboard;
  };
  
  // Create and inject styles
  const style = document.createElement('style');
  style.textContent = `
    .useless-keyboard {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 2147483647;
      background: #f0f0f0;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: fit-content;
      font-family: Arial, sans-serif;
    }
  
    .useless-keyboard .row {
      display: flex;
      justify-content: center;
      margin-bottom: 8px;
    }
  
    .useless-keyboard .key {
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px 15px;
      margin: 0 4px;
      cursor: not-allowed;
      user-select: none;
      transition: background-color 0.2s;
    }
  
    .useless-keyboard .key.space {
      width: 200px;
    }
  
    .useless-keyboard .key.pressed {
      background-color: #e0e0e0;
      transform: translateY(1px);
    }
  
    .useless-keyboard #keyboard-output {
      display: block;
      width: calc(100% - 20px);
      margin: 20px auto 0;
      padding: 10px;
      font-size: 16px;
    }
  
    .keyboard-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 2147483647;
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: Arial, sans-serif;
    }
  
    .keyboard-toggle:hover {
      background: #45a049;
    }
  
    .keyboard-draggable {
      cursor: move;
      padding: 5px;
      background: #e0e0e0;
      margin-bottom: 10px;
      border-radius: 5px;
      text-align: center;
      font-weight: bold;
    }
  `;
  
  // Inject the keyboard and styles
  document.head.appendChild(style);
  
  // Create and inject keyboard
  const keyboardElement = createKeyboard();
  document.body.appendChild(keyboardElement);
  
  // Add draggable header
  const draggableHeader = document.createElement('div');
  draggableHeader.className = 'keyboard-draggable';
  draggableHeader.textContent = 'Drag to move - Useless Keyboard';
  keyboardElement.insertBefore(draggableHeader, keyboardElement.firstChild);
  
  // Make keyboard draggable
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;
  
  draggableHeader.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  
  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  
    if (e.target === draggableHeader) {
      isDragging = true;
    }
  }
  
  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
  
      xOffset = currentX;
      yOffset = currentY;
  
      setTranslate(currentX, currentY, keyboardElement);
    }
  }
  
  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }
  
  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
  }
  
  // Handle keyboard events
  document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    const keyElement = keyboardElement.querySelector(`.key[data-key="${key}"]`) ||
                      (event.key === ' ' && keyboardElement.querySelector('.key[data-key=" "]'));
    
    if (keyElement) {
      keyElement.classList.add('pressed');
      const output = keyboardElement.querySelector('#keyboard-output');
      if (output) {
        output.value += event.key;
        output.scrollLeft = output.scrollWidth;
      }
    }
  });
  
  document.addEventListener('keyup', (event) => {
    const key = event.key.toUpperCase();
    const keyElement = keyboardElement.querySelector(`.key[data-key="${key}"]`) ||
                      (event.key === ' ' && keyboardElement.querySelector('.key[data-key=" "]'));
    
    if (keyElement) {
      keyElement.classList.remove('pressed');
    }
  });
  
  // Prevent clicks on keys from doing anything
  keyboardElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('key')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
  
  // Save position to storage when moved
  function savePosition() {
    const position = {
      x: xOffset,
      y: yOffset
    };
    chrome.storage.local.set({ keyboardPosition: position });
  }
  
  // Load position from storage
  chrome.storage.local.get(['keyboardPosition'], function(result) {
    if (result.keyboardPosition) {
      xOffset = result.keyboardPosition.x;
      yOffset = result.keyboardPosition.y;
      setTranslate(xOffset, yOffset, keyboardElement);
    }
  });
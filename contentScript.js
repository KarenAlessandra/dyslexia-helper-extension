// Function to create the line element
function createLine() {
  line = document.createElement('div');
  line.id = 'line';
  line.style.position = 'fixed';
  line.style.top = '0';
  line.style.left = '0';
  line.style.width = '100%';
  line.style.height = '5px';
  line.style.pointerEvents = 'none';
  document.body.appendChild(line);
}

// Function to remove the line element from the DOM
function removeLine() {
  if (line && line.parentNode) {
    line.parentNode.removeChild(line);
    line = null; // Reset line variable
    chrome.runtime.onMessage.removeListener();
  }
}
// Create the line initially
createLine();

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'applyLineStyle') {
    var selectedStyle = message.style;
    var selectedColor = message.color; // Get the selected color
    var rgbaColor = hexToRGBA(selectedColor, 0.3); // Convert hex color to RGBA with 0.3 opacity

    if (selectedStyle === 'thin') {
      line.style.height = '5px'; // Thin line
      line.style.backgroundColor = rgbaColor; // Apply translucent color to the line
    } else if (selectedStyle === 'med') {
      line.style.height = '20px'; // Med line
      line.style.backgroundColor = rgbaColor; // Apply translucent color to the line
    } else if (selectedStyle === 'thick') {
      line.style.height = '40px'; // Thick line
      line.style.backgroundColor = rgbaColor; // Apply translucent color to the line
    } else if (message.type === 'disableExtension') {
      // Deactivate the line and turn off the extension
      line.style.display = 'none'; // Hide the line
      removeLine();
      // sendResponse({ status: 'Extension disabled' }); // Send response back to the background script
      chrome.runtime.sendMessage({ type: 'disableExtension' }); // Send message to background script to disable the extension
      return; // Stop execution
  }
    line.style.display = 'block'; // Ensure the line is visible
  }
});

// Add event listener to update line position based on mouse movement
document.addEventListener('mousemove', function (e) {
  if (line && line.style.display !== 'none') {
    line.style.top = e.clientY + 'px';
  }
});

// // Function to convert hex color to RGBA with specified opacity
function hexToRGBA(hex, opacity) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}
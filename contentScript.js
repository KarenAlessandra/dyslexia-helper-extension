var line; // Declare line variable outside functions

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
    createLine(); // Recreate the line element
  }
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) { // Add listener for messages from the popup script
  if (message.type === 'applyLineStyle') { // Apply the selected line style
    var selectedStyle = message.style; // Get the selected style
    var selectedColor = message.color; // Get the selected color
    var isDisabled = message.isDisabled; // Get the disabled status
    var rgbaColor = hexToRGBA(selectedColor, 0.3); // Convert hex color to RGBA with 0.3 opacity

    if (!isDisabled) { // Check if the line is not disabled
      if (!line) {
        createLine(); // Create the line if it doesn't exist
      }

      if (selectedStyle === 'thin') {
        line.style.height = '5px'; // Thin line
        line.style.backgroundColor = rgbaColor; // Apply translucent color to the line
      } else if (selectedStyle === 'med') {
        line.style.height = '20px'; // Med line
        line.style.backgroundColor = rgbaColor; // Apply translucent color to the line
      } else if (selectedStyle === 'thick') {
        line.style.height = '40px'; // Thick line
        line.style.backgroundColor = rgbaColor; // Apply translucent color to the line
      }

      line.style.display = 'block'; // Ensure the line is visible
    } else { // If the line is disabled
      line.style.display = 'none'; // Hide the line
    }
  } else if (message.type === 'disableExtension') { // Disable the extension
    removeLine(); // Remove the line
  }
  
  sendResponse({ message: 'Line style applied' }); // Send response to the popup script
});

// Add event listener to update line position based on mouse movement
document.addEventListener('mousemove', function (e) {
  if (line && line.style.display !== 'none') {
    line.style.top = e.clientY + 'px';
  }
});

// Function to convert hex color to RGBA with specified opacity
function hexToRGBA(hex, opacity) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}

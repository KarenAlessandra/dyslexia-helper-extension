var line = document.createElement('div');
line.id = 'line';
line.style.position = 'fixed';
line.style.top = '0';
line.style.left = '0';
line.style.width = '100%';
line.style.height = '1px';
line.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
line.style.pointerEvents = 'none';
line.style.display = 'none';
document.body.appendChild(line);

document.addEventListener('mousemove', function (e) {
  if (line.style.display !== 'none') {
    line.style.top = e.clientY + 'px';
  }
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'applyLineStyle') {
    var selectedStyle = message.style;
    var selectedColor = message.color; // Get the selected color
    var rgbaColor = hexToRGBA(selectedColor, 0.3); // Convert hex color to RGBA with 0.3 opacity

    if (selectedStyle === 'thin') {
      line.style.height = '1px'; // Thin line
      line.style.display = 'block'; // Ensure the line is visible
    } else if (selectedStyle === 'thick') {
      line.style.height = '20px'; // Thick line
      line.style.display = 'block'; // Ensure the line is visible
    } else if (selectedStyle === 'disable') {
      // Deactivate the line
      line.style.display = 'none'; // Hide the line
      isLineEnabled = false;
      return;
    }
    // Apply translucent color to the line
    line.style.backgroundColor = rgbaColor;
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
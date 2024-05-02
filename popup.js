// alert("Popup script loaded");
console.log("Popup script loaded"); // Add this line at the beginning of your popup.js file

document.addEventListener('DOMContentLoaded', function () { // Wait for the DOM content to be fully loaded
  var lineStyleSelect = document.getElementById('lineStyle');
  var lineColorInput = document.getElementById('lineColor');
  var applyStyleButton = document.getElementById('applyStyle');
  var disableLineButton = document.getElementById('disableLine');

  applyStyleButton.addEventListener('click', applyLineStyle);
  disableLineButton.addEventListener('click', disableLine);

  var isLineDisabled = false; // Flag to track if the line is disabled

  function applyLineStyle() {
    var selectedStyle = lineStyleSelect.value;
    var selectedColor = lineColorInput.value;

    isLineDisabled = false; // Reset the flag to indicate that the line is enabled

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'applyLineStyle', style: selectedStyle, color: selectedColor, isDisabled: isLineDisabled });
    });
  }

  function disableLine() {
    isLineDisabled = true; // Update the flag to indicate that the line is disabled

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) { // Query the active tab
      chrome.tabs.sendMessage(tabs[0].id, { type: 'disableExtension', isDisabled: isLineDisabled }); // Send a message to the content script to disable the line
    });
  }
});

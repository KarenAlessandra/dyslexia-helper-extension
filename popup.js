document.addEventListener('DOMContentLoaded', function () {
  var lineStyleSelect = document.getElementById('lineStyle');
  var lineColorInput = document.getElementById('lineColor');
  var applyStyleButton = document.getElementById('applyStyle');
  var disableLineButton = document.getElementById('disableLine');

  applyStyleButton.addEventListener('click', applyLineStyle);
  disableLineButton.addEventListener('click', disableLine);

  function applyLineStyle() {
    var selectedStyle = lineStyleSelect.value;
    var selectedColor = lineColorInput.value;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'applyLineStyle', style: selectedStyle, color: selectedColor});
    });
  }

  function disableLine() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'applyLineStyle', style: 'disable'});
    });
  }
});
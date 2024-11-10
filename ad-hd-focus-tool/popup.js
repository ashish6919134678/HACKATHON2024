//OPTIONAL

document.getElementById('start-tracking').addEventListener('click', () => {
    chrome.scripting.executeScript({
      target: {tabId: yourTabId},
      function: startTracking
    });
  });
  
  document.getElementById('stop-tracking').addEventListener('click', () => {
    chrome.scripting.executeScript({
      target: {tabId: yourTabId},
      function: stopTracking
    });
  });
  
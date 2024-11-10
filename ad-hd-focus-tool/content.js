// Initialize WebGazer and define tracking functions
function initializeEyeTracking() {
  // Start WebGazer
  webgazer
    .setGazeListener((data, elapsedTime) => {
      if (data) {
        const gazeX = data.x;
        const gazeY = data.y;
        handleGaze(gazeX, gazeY);
      }
    })
    .begin();
}

// Handle gaze data by checking if it's focused on a specific paragraph
function handleGaze(gazeX, gazeY) {
  const paragraphs = document.querySelectorAll("p");

  paragraphs.forEach((paragraph) => {
    const rect = paragraph.getBoundingClientRect();
    if (
      gazeX >= rect.left &&
      gazeX <= rect.right &&
      gazeY >= rect.top &&
      gazeY <= rect.bottom
    ) {
      focusOnParagraph(paragraph);
    }
  });
}

// Function to set focus on a paragraph
function focusOnParagraph(paragraph) {
  document
    .querySelectorAll("p")
    .forEach((p) => p.classList.add("blur-paragraph"));
  paragraph.classList.remove("blur-paragraph");
  paragraph.classList.add("focus-paragraph");

  // Set current focused paragraph
  currentFocus = paragraph;
}

// Add event listener for double-click to refocus on a paragraph
document.addEventListener("dblclick", function (event) {
  if (event.target.tagName === "P") {
    focusOnParagraph(event.target);
  }
});

// Add text-to-speech functionality
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("focus-paragraph")) {
    const text = event.target.innerText;
    if (!speechSynthesis.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }
  }
});

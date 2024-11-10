// Initialize WebGazer and start gaze tracking
function initializeEyeTracking() {
  if (typeof webgazer === "undefined") {
    console.error("WebGazer failed to load.");
    return;
  }

  // Start WebGazer and set gaze listener
  webgazer
    .setGazeListener((data, elapsedTime) => {
      if (data) {
        const gazeX = data.x;
        const gazeY = data.y;
        handleGaze(gazeX, gazeY);
      } else {
        console.log("No gaze data received.");
      }
    })
    .begin();

  console.log("WebGazer initialized successfully.");
}

// Store the current focused paragraph
let currentFocus = null;

// Function to apply focus based on gaze coordinates
function handleGaze(gazeX, gazeY) {
  const paragraphs = document.querySelectorAll("p");

  // Check if the gaze is on any paragraph
  let paragraphInFocus = null;
  paragraphs.forEach((paragraph) => {
    const rect = paragraph.getBoundingClientRect();
    if (
      gazeX >= rect.left &&
      gazeX <= rect.right &&
      gazeY >= rect.top &&
      gazeY <= rect.bottom
    ) {
      paragraphInFocus = paragraph;
    }
  });

  // If gaze is on a new paragraph, update focus
  if (paragraphInFocus && paragraphInFocus !== currentFocus) {
    focusOnParagraph(paragraphInFocus);
  } else if (!paragraphInFocus) {
    // If gaze is not on any paragraph, blur the screen
    blurScreen();
  }
}

// Function to set focus on a specific paragraph
function focusOnParagraph(paragraph) {
  document
    .querySelectorAll("p")
    .forEach((p) => p.classList.add("blur-paragraph"));
  paragraph.classList.remove("blur-paragraph");
  paragraph.classList.add("focus-paragraph");

  // Update the current focused paragraph
  currentFocus = paragraph;
}

// Function to blur the screen
function blurScreen() {
  document
    .querySelectorAll("p")
    .forEach((p) => p.classList.add("blur-paragraph"));
  currentFocus = null;
}

// Double-click event to refocus on a paragraph
document.addEventListener("dblclick", function (event) {
  if (event.target.tagName === "P") {
    focusOnParagraph(event.target);
  }
});

// Click event to trigger text-to-speech for the focused paragraph
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("focus-paragraph")) {
    const text = event.target.innerText;
    if (!window.speechSynthesis.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  }
});

// Explicitly call initializeEyeTracking to start gaze tracking
initializeEyeTracking();

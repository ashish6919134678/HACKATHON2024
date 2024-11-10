// Load GazeCloudAPI
GazeCloudAPI.StartEyeTracking();

let currentFocus = null;
const speechSynthesis = window.speechSynthesis;

// Initialize eye tracking and apply blur to all paragraphs except the focused one
GazeCloudAPI.OnGaze = function (gazeData) {
  const paragraphs = document.querySelectorAll("p");

  paragraphs.forEach((paragraph) => {
    const rect = paragraph.getBoundingClientRect();

    // Check if gaze is within the paragraph bounds
    if (
      gazeData.GazeX >= rect.left &&
      gazeData.GazeX <= rect.right &&
      gazeData.GazeY >= rect.top &&
      gazeData.GazeY <= rect.bottom
    ) {
      if (currentFocus !== paragraph) {
        focusOnParagraph(paragraph);
      }
    }
  });
};

// Function to set focus on a paragraph
function focusOnParagraph(paragraph) {
  // Blur all paragraphs except the focused one
  document.querySelectorAll("p").forEach((p) => {
    p.classList.add("blur-paragraph");
  });
  paragraph.classList.remove("blur-paragraph");
  paragraph.classList.add("focus-paragraph");

  // Update current focused paragraph
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

/*
Explanation of content.js
Eye-Tracking: GazeCloudAPI.OnGaze listens for gaze events, checking if the gaze coordinates are within the bounds of each paragraph. When it detects focus on a paragraph, it calls focusOnParagraph.

Focus and Blur Logic:

focusOnParagraph applies a blur effect to all paragraphs except the currently focused one. It uses CSS classes to add and remove blurring.
Double-Click Event for Refocusing: When a user double-clicks on a paragraph, it sets that paragraph as the focused one, removing the blur effect.

Text-to-Speech: When the user single-clicks on the focused paragraph, the paragraph text is read aloud using the browser's speechSynthesis API. If the user clicks again during reading, it stops.

*/

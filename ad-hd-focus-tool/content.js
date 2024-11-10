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
        console.log(
          "Gaze coordinates:",
          gazeX,
          gazeY,
          "Elapsed time:",
          elapsedTime
        );

        // Call function to handle gaze focus
        handleGaze(gazeX, gazeY);
      } else {
        console.log("No gaze data received.");
      }
    })
    .begin();

  console.log("WebGazer initialized successfully.");
}

// Function to apply focus based on gaze coordinates
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

// Function to set focus on a specific paragraph
function focusOnParagraph(paragraph) {
  document
    .querySelectorAll("p")
    .forEach((p) => p.classList.add("blur-paragraph"));
  paragraph.classList.remove("blur-paragraph");
  paragraph.classList.add("focus-paragraph");
}

// Start WebGazer directly since it's already loaded as part of the extension
initializeEyeTracking();

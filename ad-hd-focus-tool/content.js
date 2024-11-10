// Include localforage library
const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.min.js";
document.head.appendChild(script);

// Start WebGazer and check if it can access the webcam
function startWebGazer() {
  if (typeof webgazer === "undefined") {
    console.error("WebGazer failed to load.");
    return;
  }

  // Enable individual display settings for testing
  webgazer.showVideo(true);
  webgazer.showFaceOverlay(true);

  // Error handling for camera access
  webgazer.OnCamDenied = function () {
    console.error("Camera access denied by the user.");
  };

  webgazer.OnError = function (msg) {
    console.error("WebGazer error:", msg);
  };

  // Start WebGazer and set gaze listener
  webgazer
    .setGazeListener((data, elapsedTime) => {
      if (data) {
        const boundedPrediction = webgazer.util.bound(data);
        const gazeX = boundedPrediction.x;
        const gazeY = boundedPrediction.y;
        handleGaze(gazeX, gazeY);
      } else {
        console.log("No gaze data received.");
      }
    })
    .begin()
    .then(() => {
      console.log(
        "WebGazer initialized successfully and webcam access granted."
      );
    })
    .catch((error) => {
      console.error("Failed to initialize WebGazer:", error);
    });

  // Check if calibration is needed
  checkCalibrationData();
}

// Function to check for existing calibration data
function checkCalibrationData() {
  localforage
    .getItem("webgazerGlobalData")
    .then((data) => {
      if (!data) {
        console.log(
          "No existing calibration data found. Starting calibration."
        );
        addCalibrationPoints();
      } else {
        console.log("Calibration data found. Skipping calibration.");
      }
    })
    .catch((error) => {
      console.error("Error accessing calibration data:", error);
      addCalibrationPoints(); // Fallback in case of error
    });
}

// Function to add calibration points for initial calibration
function addCalibrationPoints() {
  const calibrationPoints = [
    { x: 0.1, y: 0.1 },
    { x: 0.9, y: 0.1 },
    { x: 0.5, y: 0.5 },
    { x: 0.1, y: 0.9 },
    { x: 0.9, y: 0.9 },
  ];

  calibrationPoints.forEach((point) => {
    const target = document.createElement("div");
    target.classList.add("calibration-target");
    target.style.position = "absolute";
    target.style.left = `${point.x * window.innerWidth}px`;
    target.style.top = `${point.y * window.innerHeight}px`;
    target.style.width = "20px";
    target.style.height = "20px";
    target.style.backgroundColor = "red";
    target.style.borderRadius = "50%";
    target.style.zIndex = "1000"; // Ensures visibility on top of other elements
    document.body.appendChild(target);

    target.addEventListener("click", () => {
      target.style.backgroundColor = "green"; // Visual feedback on click
      setTimeout(() => document.body.removeChild(target), 500);
    });
  });
}

// Function to handle gaze tracking
function handleGaze(gazeX, gazeY) {
  const paragraphs = document.querySelectorAll("p");
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

  if (paragraphInFocus) {
    focusOnParagraph(paragraphInFocus);
  } else {
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
}

// Function to blur the screen when gaze is not on any paragraph
function blurScreen() {
  document
    .querySelectorAll("p")
    .forEach((p) => p.classList.add("blur-paragraph"));
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

// Start WebGazer initialization and calibration
startWebGazer();

/*
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

*/

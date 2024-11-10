// Create a gaze dot element for tracking visualization
const gazeDot = document.createElement("div");
gazeDot.id = "gaze-dot";
gazeDot.style.position = "absolute";
gazeDot.style.width = "10px";
gazeDot.style.height = "10px";
gazeDot.style.backgroundColor = "red";
gazeDot.style.borderRadius = "50%";
gazeDot.style.zIndex = "1000";
gazeDot.style.display = "none";
document.body.appendChild(gazeDot);

// Store the current focused paragraph
let currentFocus = null;

// Function to handle the gaze coordinates and apply blur/focus effects
function handleGaze(gazeX, gazeY) {
  // const paragraphs = document.querySelectorAll("p");
  //
  //
  //

  const paragraphs = document.querySelectorAll("p");
  // const divs = document.querySelectorAll("div");
  // const sections = document.querySelectorAll("section");
  const h1s = document.querySelectorAll("h1");
  const h2s = document.querySelectorAll("h2");
  const h3s = document.querySelectorAll("h3");
  const h4s = document.querySelectorAll("h4");
  const h5s = document.querySelectorAll("h5");
  const h6s = document.querySelectorAll("h6");
  // let currentIndex = 0;
  const elements = [
    ...paragraphs,
    // ...divs,
    // ...sections,
    ...h1s,
    ...h2s,
    ...h3s,
    ...h4s,
    ...h5s,
    ...h6s,
  ];

  elements.forEach((element) => {
    element.style.opacity = 0.3;
  });

  const elementUnderCursor = document.elementFromPoint(gazeX, gazeY);
  if (elementUnderCursor) {
    elementUnderCursor.style.opacity = 1;
  }

  let paragraphInFocus = null;

  // paragraphs.forEach((paragraph) => {
  //   const rect = paragraph.getBoundingClientRect();
  //   if (
  //     gazeX >= rect.left &&
  //     gazeX <= rect.right &&
  //     gazeY >= rect.top &&
  //     gazeY <= rect.bottom
  //   ) {
  //     paragraphInFocus = paragraph;
  //   }
  // });

  // If gaze is on a new paragraph, update focus
  // if (paragraphInFocus && paragraphInFocus !== currentFocus) {
  //   focusOnParagraph(paragraphInFocus);
  // } else if (!paragraphInFocus) {
  //   // If gaze is not on any paragraph, blur the screen
  //   blurScreen();
  // }
}

// Function to set focus on a specific paragraph
function focusOnParagraph(paragraph) {
  // document.querySelectorAll("p").forEach((p) => {
  //   p.classList.add("blur-paragraph");
  //   p.classList.remove("focus-paragraph");
  // });
  // paragraph.classList.remove("blur-paragraph");
  // paragraph.classList.add("focus-paragraph");

  // Update the current focused paragraph
  currentFocus = paragraph;
}

// Function to blur all paragraphs when gaze is not on any paragraph
function blurScreen() {
  document.querySelectorAll("p").forEach((p) => {
    p.classList.add("blur-paragraph");
    p.classList.remove("focus-paragraph");
  });
  currentFocus = null;
}

// Initialize WebGazer and start tracking
function initializeEyeTracking() {
  if (typeof webgazer === "undefined") {
    console.error("WebGazer failed to load.");
    return;
  }

  // Start WebGazer and set the gaze listener
  webgazer
    .setGazeListener((data, elapsedTime) => {
      if (data) {
        const gazeX = data.x;
        const gazeY = data.y;
        handleGaze(gazeX, gazeY);

        // Optional: Update the position of the gaze dot
        if (gazeDot) {
          gazeDot.style.display = "block";
          gazeDot.style.left = `${gazeX - 5}px`;
          gazeDot.style.top = `${gazeY - 5}px`;
        }
      } else {
        console.log("No gaze data received.");
      }
    })
    .begin();

  console.log("WebGazer initialized successfully.");
}

// Optional: add calibration points for initial setup (only run once)

// 5 POINTS
/*function addCalibrationPoints() {
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
    target.style.zIndex = "1000";
    document.body.appendChild(target);

    target.addEventListener("click", () => {
      target.style.backgroundColor = "green";
      setTimeout(() => document.body.removeChild(target), 500);
    });
  });
}*/

// Function to add a 3x3 grid of calibration points for improved accuracy
// 3x3 -> 9 points
/*
function addCalibrationPoints() {
  const gridSize = 3; // 3x3 grid
  const calibrationPoints = [];

  // Generate grid points across the screen
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      calibrationPoints.push({
        x: i / (gridSize - 1), // Normalize x to be between 0 and 1
        y: j / (gridSize - 1), // Normalize y to be between 0 and 1
      });
    }
  }

  // Add each calibration point to the screen
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
    target.style.zIndex = "1000";
    document.body.appendChild(target);

    // Register click event to capture gaze data
    target.addEventListener("click", () => {
      target.style.backgroundColor = "green"; // Indicate point has been clicked
      setTimeout(() => document.body.removeChild(target), 500); // Remove after click
    });
  });
}*/

// Function to add a grid of calibration points for improved accuracy
//4x4 -> 16 points
function addCalibrationPoints() {
  const gridSize = 3; // Number of points along each axis (4x4 grid)
  const calibrationPoints = [];

  // Generate grid points across the screen
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      calibrationPoints.push({
        x: i / (gridSize - 1), // Normalize x to be between 0 and 1
        y: j / (gridSize - 1), // Normalize y to be between 0 and 1
      });
    }
  }

  // Add each calibration point to the screen
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
    target.style.zIndex = "1000";
    document.body.appendChild(target);

    // Register click event to capture gaze data
    target.addEventListener("click", () => {
      target.style.backgroundColor = "green"; // Indicate point has been clicked
      setTimeout(() => document.body.removeChild(target), 500); // Remove after click
    });
  });
}

// Initialize eye-tracking and calibration (first run only)
initializeEyeTracking();
// Uncomment this to run calibration only once for initial setup
addCalibrationPoints();

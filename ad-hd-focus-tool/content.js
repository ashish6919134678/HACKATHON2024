// Initialize the eye tracking
GazeCloudAPI.StartEyeTracking();

GazeCloudAPI.OnGaze = function(gazeData) {
  const paragraph = document.querySelector('.focus-paragraph');
  
  // Assuming you have a bounding box for the current paragraph
  const rect = paragraph.getBoundingClientRect();
  
  // Check if the gaze is within the paragraph bounds
  if (
    gazeData.GazeX >= rect.left && 
    gazeData.GazeX <= rect.right &&
    gazeData.GazeY >= rect.top &&
    gazeData.GazeY <= rect.bottom
  ) {
    // If within bounds, remove dimming effect
    document.body.classList.remove('dimmed');
  } else {
    // If gaze moves away, apply dimming effect
    document.body.classList.add('dimmed');
  }
};

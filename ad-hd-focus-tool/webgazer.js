function loadWebGazer() {
  const script = document.createElement("script");
  script.src = "https://webgazer.cs.brown.edu/webgazer.js";
  script.onload = () => {
    console.log("WebGazer loaded successfully");
    initializeEyeTracking();
  };
  document.head.appendChild(script);
}

loadWebGazer();

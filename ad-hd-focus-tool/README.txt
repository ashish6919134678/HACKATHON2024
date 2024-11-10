WebGazer.js is a free, open-source JavaScript library that uses webcam-based gaze tracking, and it can be directly embedded in your Chrome extension since you can load it from a CDN or host it locally. Here’s how you can integrate WebGazer.js for your ADHD focus tool.



5. Explanation
WebGazer Initialization: The script loads WebGazer.js dynamically and starts tracking the user’s gaze.
Gaze Data Handling: handleGaze checks whether the gaze coordinates fall within a paragraph’s bounding box. If so, it calls focusOnParagraph.
Focus and Blur: focusOnParagraph blurs all paragraphs except the one in focus. The focus effect is defined in style.css.
Double-Click Refocus: Double-clicking on any paragraph brings it back into focus.
Text-to-Speech: Clicking the focused paragraph triggers a text-to-speech reading of the text.


6. Testing the Extension
Go to chrome://extensions/ in Chrome, enable Developer Mode, and load your ad-hd-focus-tool directory.
Navigate to a webpage with paragraphs, and activate the extension to test gaze tracking and blurring.

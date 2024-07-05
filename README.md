# Browser Extension Template
This is a template for a browser extension. It is a simple extension that demonstrates:
- Send a request from the popup to the content script to return the current text
- Passing data to the popup when the selected text changes on the page
- Intercepting a request from the content script in the background script
- Open a popup in the side bar when the extension icon is clicked.

## Getting Started
1. Clone the repository
2. Open the browser and navigate to `chrome://extensions/`
3. Enable developer mode
4. Click on `Load unpacked` and select the cloned repository
5. Click on the extension icon in the browser toolbar to open the popup
6. Select some text on the page to see the selected text in the popup
7. Click the popup button to send a request to the content script to return the current content of the entire page

## Deploying to the Chrome Web Store
1. Update the `manifest.json` file with the appropriate details
2. Zip the contents of the repository
3. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
4. Click on `Add new item`
5. Upload the zip file
6. Add the necessary details and click on `Publish`
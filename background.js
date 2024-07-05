// Handles background tasks for the extension
(() => {
    console.log('background.js loaded');

    // Ensure the sidePanel API is available before attempting to use it
    if (chrome.sidePanel) {
        chrome.runtime.onInstalled.addListener(() => {
            // Automatically open the side panel when the extension's action is clicked
            chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
        });
    } else {
        console.warn('This version of Chrome does not support sidePanel API.');
    }

    // Define a function to handle incoming messages
    const handleMessage = (request, sender, sendResponse) => {
        console.log('Message received:', request);
        switch (request.type) {
            case 'SELECTED_TEXT':
                // Process the selected text, e.g., save it or call an API
                console.log('Background: Selected text:', request.content);
                break;
            // Add more cases as needed
            default:
                console.warn('Unhandled message type:', request.type);
        }
        // Indicate that sendResponse will be called asynchronously
        return true;
    };

    // Listen for messages from content scripts or popup
    chrome.runtime.onMessage.addListener(handleMessage);
})();
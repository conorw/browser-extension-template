// Handles background tasks for the extension
(() => {
    console.log('background.js loaded');
    chrome.runtime.onInstalled.addListener(() => {
        chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    });
    // Listen for messages from both parts of the extension
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('Message received:', request);
        // Handle different actions
        switch (request.type) {
            case 'SELECTED_TEXT':
                // if we wanted to do something with the selected text e.g. save it to local storage, call an api etc
                console.log('Background: Selected text:', request.content);
                break;
        }
        // Return true to indicate that sendResponse will be called asynchronously
        return true;
    });

})();
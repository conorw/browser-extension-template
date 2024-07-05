(async () => {
    console.log('popup.js loaded');

    const getTabSelectedText = async () => {
        console.log('Popup: getTabSelectedText clicked');
        // Send a message to the content script to get the selected text
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs.length === 0) return; // Exit if no active tab found
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_PAGE_CONTENT' }, (response) => {
            console.log('Popup: Received response:', response);
            const responseElement = document.getElementById('response');
            if (responseElement) responseElement.innerText = response?.content || 'No content';
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        // Add event listener for the getTabSelectedText button
        const clickMeButton = document.getElementById('clickme');
        if (clickMeButton) clickMeButton.addEventListener('click', getTabSelectedText);
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === "SELECTED_TEXT") {
            // The page html content
            const content = request.content;
            const responseElement = document.getElementById('response');
            if (responseElement) responseElement.innerText = content;
        }
        return true; // Indicate that sendResponse will be called asynchronously
    });
})();
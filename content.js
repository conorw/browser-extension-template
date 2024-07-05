(async () => {
    "use strict";

    console.log('browser extension content.js loaded');

    const sendSelectedText = () => {
        const selectedText = window.getSelection()?.toString();
        if (selectedText) {
            console.log('SENDING SELECTED_TEXT message:', selectedText);
            chrome.runtime.sendMessage({ type: 'SELECTED_TEXT', content: selectedText }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Error sending message:', chrome.runtime.lastError.message);
                }
            });
        }
    };

    document.addEventListener('mouseup', function (event) {
        console.log('mouseup event');
        sendSelectedText();
    });

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.type === "GET_PAGE_CONTENT") {
                // Extract the page's text content and the current selection
                const content = document.body.innerText;
                const selectedText = window.getSelection()?.toString() || '';
                sendResponse({ type: 'SEND_PAGE_CONTENT', content, selectedText });
            }
            return true; // Keep the message channel open for asynchronous response
        }
    );
})();
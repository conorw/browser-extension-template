(async () => {

    console.log('browser extension content.js loaded');
    document.addEventListener('mouseup', function (event) {
        // send a message to the background script to pass a message to the popup if there is selected text
        console.log('mouseup event');
        if (window.getSelection()?.toString()) {
            console.log('SENDING SELECTED_TEXT message:', window.getSelection()?.toString());
            chrome.runtime.sendMessage({ type: 'SELECTED_TEXT', content: window.getSelection()?.toString() });
        }
    });

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.type === "GET_PAGE_CONTENT") {
                // the page html content
                const content = document.body.innerText;
                const selectedText = window.getSelection()?.toString() || '';
                sendResponse({ type: 'SEND_PAGE_CONTENT', content, selectedText});
            }
            return true;
        }
    );
})();
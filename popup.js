(function(){
    console.log('popup.js loaded');
    function getTabSelectedText(){
        console.log('Popup: getTabSelectedText clicked');
        // send a message to the content script to get the selected text
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_PAGE_CONTENT' }, function (response) {
                console.log('Popup: Received response:', response);
                document.getElementById('response').innerText = response?.content;
            });
        });
    }
    // await document loaded
    document.addEventListener('DOMContentLoaded', function() {
        // add event listener for the getTabSelectedText button
        document.getElementById('clickme').addEventListener('click', getTabSelectedText);
    });
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.type === "SELECTED_TEXT") {
                // the page html content
                const content = request.content;
                document.getElementById('response').innerText = content;
            }
            return true;
        }
    );
})()

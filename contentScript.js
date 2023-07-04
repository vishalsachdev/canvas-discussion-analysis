```javascript
const analyzeText = () => {
    let text = document.body.innerText;
    // Analyze the text here
    // This is a placeholder for your text analysis logic
    return text;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'GET_COMMENTS') {
        sendResponse(analyzeText());
    }
});
```
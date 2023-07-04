```javascript
let comments = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitBtn').addEventListener('click', saveComment);
    getComments();
});

function saveComment() {
    let commentText = document.getElementById('commentBox').value;
    let pageUrl = window.location.href;
    let timestamp = new Date().getTime();

    let comment = {
        pageUrl: pageUrl,
        commentText: commentText,
        timestamp: timestamp
    };

    comments.push(comment);

    chrome.runtime.sendMessage({type: "SAVE_COMMENT", payload: comment}, function(response) {
        console.log(response);
    });

    document.getElementById('commentBox').value = '';
    displayComments();
}

function getComments() {
    chrome.runtime.sendMessage({type: "GET_COMMENTS", payload: window.location.href}, function(response) {
        comments = response;
        displayComments();
    });
}

function displayComments() {
    let commentList = document.getElementById('commentList');
    commentList.innerHTML = '';

    comments.forEach(function(comment) {
        let listItem = document.createElement('li');
        listItem.textContent = comment.commentText;
        commentList.appendChild(listItem);
    });
}

function analyzeText() {
    chrome.tabs.executeScript({
        file: 'contentScript.js'
    });
}
```
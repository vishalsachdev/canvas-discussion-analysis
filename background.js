```javascript
let comments = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ comments: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'GET_COMMENTS') {
    chrome.storage.sync.get('comments', (data) => {
      comments = data.comments.filter(comment => comment.pageUrl === request.pageUrl);
      sendResponse({ comments: comments });
    });
  }

  if (request.message === 'SAVE_COMMENT') {
    chrome.storage.sync.get('comments', (data) => {
      comments = data.comments;
      comments.push({
        pageUrl: request.pageUrl,
        commentText: request.commentText,
        timestamp: new Date().getTime()
      });
      chrome.storage.sync.set({ comments: comments });
      sendResponse({ status: 'Comment saved' });
    });
  }

  return true;
});
```
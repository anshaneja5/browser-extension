document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { action: "getLinkedInPostData" }, function(response) {
      if (response) {
        document.getElementById('likes').textContent = response.likes;
        document.getElementById('comments').textContent = response.comments;
        document.getElementById('reshares').textContent = response.reshares;
      } else {
        console.error("Failed to receive response from content script");
      }
    });
  });
});
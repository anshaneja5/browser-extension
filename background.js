chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getLinkedInPostData") {
    function retryFetchData() {
      chrome.tabs.sendMessage(sender.tab.id, { action: "getLinkedInPostData" }, function(response) {
        if (response && !response.error) {
          sendResponse(response);
        } else {
          setTimeout(retryFetchData, 1000);
        }
      });
    }
    retryFetchData();
    return true; // Keeps the message channel open for async response
  }
});


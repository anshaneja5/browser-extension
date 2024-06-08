chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getLinkedInPostData") {
      function fetchLinkedInData() {
        try {
          const reactionsElement = document.querySelector('span[class="social-details-social-counts__social-proof-fallback-number"]');
          const commentsElement = document.querySelector('button[aria-label*="comments"]');
          const resharesElement = document.querySelector('button[aria-label*="reposts"]');
          console.log('reactionsElement:', reactionsElement.innerText);
          return {
            likes: reactionsElement.innerText,
            comments: commentsElement.getAttribute('aria-label').match(/\d+/)[0],
            reshares: resharesElement.getAttribute('aria-label').match(/\d+/)[0]
          };
        } catch (error) {
          console.error("Error reading LinkedIn post data:", error);
          return null;
        }
      }
  
      const data = fetchLinkedInData();
      if (data) {
        sendResponse(data);
      } else {
        sendResponse({ error: "Elements not found" });
      }
    }
    return true;
  });
  
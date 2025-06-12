export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  // Listen for messages from the popup
  browser.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    // console.log("Received message", sender);
    if (request.action === "updateReadingListItem") {
      // console.log("Updating reading list item", request.item.url);
      browser.readingList.updateEntry({
        url: request.item.url,
        hasBeenRead: true,
      });
      sendResponse({ success: true });
    }

    // Always return true for asynchronous response
    return true;
  });
});

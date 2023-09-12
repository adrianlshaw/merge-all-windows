console.log("background started");

chrome.runtime.onConnect.addListener(function (port) {
  console.log("Connected to content script");

  port.onMessage.addListener(function (message) {
    console.log("Message received:", message);
    if (message.action === "mergeWindows") {

      chrome.windows.getAll({ populate: true }, function (windows) {
        // Get the first window
        var firstWindow = windows[0];

        // Loop through all other windows
        for (var i = 1; i < windows.length; i++) {
          var window = windows[i];

          // Loop through all tabs in the window
          for (var j = 0; j < window.tabs.length; j++) {
            var tab = window.tabs[j];

            // Move the tab to the first window
            chrome.tabs.move(tab.id, { windowId: firstWindow.id, index: -1 });
          }

          // Close the window
          chrome.windows.remove(window.id);
        }
      });
    }
  });
});
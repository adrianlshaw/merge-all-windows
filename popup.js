
var mergeWindowsButton = document.getElementById("mergeWindowsButton");
console.log("started");

mergeWindowsButton.addEventListener("click", function() {
    console.log("clicked");

var port = chrome.runtime.connect({name: "contentScript"});

port.postMessage({action: "mergeWindows"});

});
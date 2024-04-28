console.log('chrome.js has loaded.');

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log(message, '------------')
})
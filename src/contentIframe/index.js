const IFRAME = {}

IFRAME.createIframe = {
  init(){
    const addIframe = (id, pagePath) => {
      const contentIframe = document.createElement("iframe");
      contentIframe.id = id;
      contentIframe.style.cssText = "width: 0; height: 0; position: fixed; inset: 0px; margin: 0px auto; z-index: 100; border: none";
      const getContentPage = chrome.runtime.getURL(pagePath);
      contentIframe.src = getContentPage;
      document.body.appendChild(contentIframe);
    }
  
    addIframe('ft-iframe', 'content.html')
  }
}

IFRAME.createIframe.init()

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if(message.type === 'DATE-PICKER-VISIBLE'){
   const iframe = document.querySelector('#ft-iframe')

    iframe.style.width= message.visible ? "100%" : 0
    iframe.style.height=  message.visible ? "100%" : 0
  }
})
console.log("hello background")

// when chrome start, the service work is inactive
// then add below listener to keep service work active
chrome.runtime.onStartup.addListener( () => {
    console.log(`onStartup()`);
});


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log(message, '------------')
  })

chrome.runtime.onInstalled.addListener(() => {

chrome.action.setBadgeText({
    text: 'OFF',
});

// 注册右键菜单

    chrome.contextMenus.create({
        id: 'test',
        title: 'test',
        contexts:  ['all'],
        documentUrlPatterns: [
            "http://*/*", 
            "https://*/*"
        ],
    });

    // chrome.tabs.update({
    //     url: "https://www.baidu.com",
    //     active: true
    // });

});

chrome.contextMenus.onClicked.addListener(async e => {
	console.log('点击右键菜单 =》 ', e);

	/**
	 * @description 导出数据右键菜单
	 * @author fengsi<294068744@qq.com>
	 * @date 2023-02-02 11:16:56
	 */
    console.log(e.menuItemId, chrome);
    
	if (e.menuItemId.startsWith('test')) {
		
		chrome.tabs.query({
			active: true,
			lastFocusedWindow: true,
		}).then(tabs => {
			if (tabs.length > 0) {
				chrome.tabs.sendMessage(tabs[0].id, 'DATE-PICKER')
					.then(() => {})
					.catch(error => {

					});
			}
		});
	}
});

  
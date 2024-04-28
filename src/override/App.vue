<template>
    <div id="override">
        override
        <el-button type="primary" @click="sendMessage">1231313</el-button>
    </div>
   
</template>

<script setup>
console.log(chrome.runtime,'chrome.runtime');


const sendMessage = () => {
    chrome.runtime.sendMessage(chrome.runtime.id, {
        type: 'test',
        message: 'test'
    })

    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    }).then(tabs => {
        if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {
            message: '点击按钮'
        }).then(()=>{
 
        })
        }
    })
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log(message, '------------')
})
</script>

<style>
#override {
    font-size: 32px;
    color: blue;
    position: fixed;
    top: 100px;
    right: 20px;
}
</style>
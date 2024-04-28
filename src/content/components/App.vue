<template>
  <el-dialog v-model="state.visible" title="选择数据同步时间段" @close="handleClose" width="460">
    <el-date-picker
      v-model="state.date"
      type="daterange"
      range-separator="至"
      value-format="YYYY-MM-DD"
      :disabled-date="disabledDate"
      :clearable="false"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          同步
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { nextTick, reactive } from 'vue';
import dayjs from 'dayjs'

const defaultDate = [
  dayjs().subtract(91, 'days').format('YYYY-MM-DD'),
  dayjs().subtract(1, 'days').format('YYYY-MM-DD'),
]

const disabledDate = (time) => time.getTime() > Date.now()

const state = reactive({
  visible: false,
  date: defaultDate
})

console.log(chrome, '------------');

const handleConfirm = () => {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  }).then(tabs => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'FT-START-SYNC',
        date: getDiff()
      }).then(()=>{
        state.visible = false
      })
    }
  })
}

const getDiff  = () => {
  const start = state.date[0]
  const end = state.date[1]
  return {
    startIndex: dayjs().diff(end, 'd'),
    endIndex: dayjs().diff(start, 'd')
  }
}

const open = () => {
  sendMessage(true)
}

const handleClose = () => {
  sendMessage(false)
}

const sendMessage = (flag) => {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  }).then(tabs => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'DATE-PICKER-VISIBLE',
        visible: flag
      }).then(()=>{
        nextTick(()=>{
          state.visible = flag
        })
      })
    }
  })
}


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if(message === 'DATE-PICKER'){
    open()
  }
})
</script>
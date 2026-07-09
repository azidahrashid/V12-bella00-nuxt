<script setup lang="ts">
const isOpen = ref(false)
const messages = ref([
  '안녕하세요. BellaBet demo chat입니다.',
  '이 채팅은 UI 테스트용이며 실제 상담원 연결은 없습니다.'
])
const draft = ref('')

const send = () => {
  const value = draft.value.trim()
  if (!value) return
  messages.value.push(value)
  draft.value = ''
  window.setTimeout(() => messages.value.push('데모 응답: 문의가 접수된 것처럼 표시했습니다.'), 350)
}
</script>

<template>
  <div class="floating-chat" :class="{ 'is-open': isOpen }">
    <button class="floating-chat__button" type="button" @click="isOpen = !isOpen">
      Chat with us
    </button>
    <section v-if="isOpen" class="chat-panel" aria-label="Demo chat panel">
      <header>
        <strong>LiveChat</strong>
        <button type="button" @click="isOpen = false">×</button>
      </header>
      <div class="chat-messages">
        <p v-for="(message, index) in messages" :key="`${index}-${message}`">{{ message }}</p>
      </div>
      <form @submit.prevent="send">
        <input v-model="draft" type="text" placeholder="메시지 입력" />
        <button type="submit">전송</button>
      </form>
    </section>
  </div>
</template>

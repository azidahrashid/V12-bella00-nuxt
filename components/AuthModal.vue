<script setup lang="ts">
const props = defineProps<{
  mode: 'login' | 'register'
}>()

const emit = defineEmits<{
  close: []
  switchMode: [mode: 'login' | 'register']
  success: [name: string]
}>()

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  inviteCode: '',
  remember: true
})

const touched = ref(false)
const successMessage = ref('')

const title = computed(() => (props.mode === 'login' ? '로그인' : '회원가입'))
const submitLabel = computed(() => (props.mode === 'login' ? '로그인' : '가입하기'))
const alternativeLabel = computed(() => (props.mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'))
const alternativeAction = computed(() => (props.mode === 'login' ? '회원가입' : '로그인'))

const validationError = computed(() => {
  if (!touched.value) return ''
  if (form.username.trim().length < 3) return '아이디는 3자 이상 입력하세요.'
  if (form.password.trim().length < 4) return '비밀번호는 4자 이상 입력하세요.'
  if (props.mode === 'register') {
    if (form.password !== form.confirmPassword) return '비밀번호 확인이 일치하지 않습니다.'
    if (form.phone.trim().length < 8) return '연락처를 입력하세요.'
  }
  return ''
})

const submit = () => {
  touched.value = true
  successMessage.value = ''
  if (validationError.value) return

  successMessage.value = props.mode === 'login'
    ? '데모 로그인 성공. 실제 세션/API는 연결되어 있지 않습니다.'
    : '데모 회원가입 완료. 실제 계정 생성은 backend 연결 후 처리하세요.'

  emit('success', form.username.trim())
}

const switchMode = () => {
  touched.value = false
  successMessage.value = ''
  emit('switchMode', props.mode === 'login' ? 'register' : 'login')
}

const handleEsc = (event: KeyboardEvent) => {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleEsc))
onBeforeUnmount(() => window.removeEventListener('keydown', handleEsc))
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" role="presentation" @click.self="emit('close')">
      <section class="auth-modal" role="dialog" aria-modal="true" :aria-label="title">
        <button class="modal-close" type="button" aria-label="Close modal" @click="emit('close')">×</button>

        <div class="auth-modal__brand">
          <span>BELLABET</span>
          <strong>{{ title }}</strong>
          <p>Frontend demo modal. Enter any valid-looking details to test the UI state.</p>
        </div>

        <form class="auth-form" @submit.prevent="submit">
          <label>
            <span>아이디</span>
            <input v-model="form.username" type="text" autocomplete="username" placeholder="아이디 입력" />
          </label>

          <label>
            <span>비밀번호</span>
            <input v-model="form.password" type="password" autocomplete="current-password" placeholder="비밀번호 입력" />
          </label>

          <template v-if="mode === 'register'">
            <label>
              <span>비밀번호 확인</span>
              <input v-model="form.confirmPassword" type="password" autocomplete="new-password" placeholder="비밀번호 다시 입력" />
            </label>
            <label>
              <span>연락처</span>
              <input v-model="form.phone" type="tel" autocomplete="tel" placeholder="010-0000-0000" />
            </label>
            <label>
              <span>가입코드</span>
              <input v-model="form.inviteCode" type="text" placeholder="선택 입력" />
            </label>
          </template>

          <label class="checkbox-row">
            <input v-model="form.remember" type="checkbox" />
            <span>아이디 저장</span>
          </label>

          <p v-if="validationError" class="form-alert form-alert--error">{{ validationError }}</p>
          <p v-if="successMessage" class="form-alert form-alert--success">{{ successMessage }}</p>

          <button class="btn btn--primary btn--wide" type="submit">{{ submitLabel }}</button>
        </form>

        <button class="switch-auth" type="button" @click="switchMode">
          {{ alternativeLabel }} <strong>{{ alternativeAction }}</strong>
        </button>
      </section>
    </div>
  </Teleport>
</template>

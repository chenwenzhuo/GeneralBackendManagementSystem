<template>
  <div class="login-form-container">
    <Form ref="loginRegFormRef" :model="loginRegFormData" :rules="rules" layout="vertical">
      <FormItem :label="t('login.content.username')" name="username">
        <Input
          v-model:value="loginRegFormData.username"
          :placeholder="t('login.content.usernamePlaceholder')"
          allow-clear
        />
      </FormItem>
      <FormItem :label="t('login.content.password')" name="password">
        <Input
          v-model:value="loginRegFormData.password"
          :placeholder="t('login.content.passwordPlaceholder')"
          type="password"
          allow-clear
        />
      </FormItem>
      <FormItem
        v-if="formType === 'register'"
        :label="t('login.content.passwordConfirm')"
        name="passwordConfirm"
      >
        <Input
          v-model:value="loginRegFormData.passwordConfirm"
          :placeholder="t('login.content.passwordConfirmPlaceholder')"
          type="password"
          allow-clear
        />
      </FormItem>
    </Form>

    <Flex v-if="formType === 'login'" justify="flex-end">
      <ResetPwdModal />
    </Flex>

    <Button type="primary" class="login-button" @click="submit">
      {{ submitBtnText[formType] }}
    </Button>

    <Flex v-if="formType === 'login'" justify="center" align="center">
      <span>{{ t('login.content.noAccount') }}</span>
      <Button type="link" size="small" @click="() => switchTab('register')">
        {{ t('login.content.registerNow') }}
      </Button>
    </Flex>
  </div>
</template>

<script setup lang="ts">
import { Button, Flex, Form, FormItem, Input, message } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { login, register } from '@/api/LoginRegister';
import { useValidationRules } from '@/pages/login/loginRegisterCommon';
import ResetPwdModal from '@/pages/login/ResetPwdModal.vue';

export type LoginRegisterFormType = 'login' | 'register';
const props = defineProps<{ formType: LoginRegisterFormType }>();
const emits = defineEmits(['switchTab']);

const { t } = useI18n();
const router = useRouter();
const loginRegFormRef = ref(null);
const loginRegFormData = ref({
  username: '',
  password: '',
  passwordConfirm: '',
});
const validationRules = useValidationRules(loginRegFormData);

const rules = computed(() => {
  const commonRules = {
    username: validationRules.username,
    password: validationRules.password,
  };

  if (props.formType === 'login') return commonRules;
  return {
    ...commonRules,
    passwordConfirm: validationRules.confirmPwd,
  };
});

const submitBtnText = computed(() => ({
  login: t('login.content.login'),
  register: t('login.content.register'),
}));

function submit() {
  const fnMap = { register: submitRegister, login: submitLogin };
  loginRegFormRef.value?.validate().then(() => {
    fnMap[props.formType]?.();
  });
}

async function submitRegister() {
  const { username, password } = loginRegFormData.value;
  const res = await register({ username, password });

  if (res.status === 0) {
    message.success(res.message);
    resetForm();
    switchTab('login');
  } else {
    message.error(res.message);
  }
}

async function submitLogin() {
  const { username, password } = loginRegFormData.value;
  const res = await login({ username, password });

  if (res.status === 0) {
    message.success(res.message);
    resetForm();
    localStorage.setItem('token', res.token);
    await router.replace('/admin/home');
  } else {
    message.error(res.message);
  }
}

function resetForm() {
  loginRegFormData.value = {
    username: '',
    password: '',
    passwordConfirm: '',
  };
  loginRegFormRef.value.resetFields();
  loginRegFormRef.value.clearValidate();
}

function switchTab(tab: LoginRegisterFormType) {
  emits('switchTab', tab);
}

defineExpose({ resetForm });
</script>

<style scoped lang="scss">
.login-form-container {
  .login-button {
    width: 100%;
    height: 40px;
    margin-bottom: 15px;
  }
}
</style>

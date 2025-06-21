<template>
  <div class="login-form-container">
    <Form ref="loginFormRef" :model="loginFormData" :rules="rules" layout="vertical">
      <FormItem :label="t('login.content.username')" name="username">
        <Input
          v-model:value="loginFormData.username"
          :placeholder="t('login.content.usernamePlaceholder')"
          allow-clear
        />
      </FormItem>
      <FormItem :label="t('login.content.password')" name="password">
        <Input
          v-model:value="loginFormData.password"
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
          v-model:value="loginFormData.passwordConfirm"
          :placeholder="t('login.content.passwordConfirmPlaceholder')"
          type="password"
          allow-clear
        />
      </FormItem>
    </Form>

    <Flex v-if="formType === 'login'" justify="flex-end">
      <ResetPwdModal />
    </Flex>

    <Button type="primary" class="login-button">{{ submitBtnText[formType] }}</Button>

    <Flex v-if="formType === 'login'" justify="center" align="center">
      <span>{{ t('login.content.noAccount') }}</span>
      <Button type="link" size="small" @click="switchToRegister">
        {{ t('login.content.registerNow') }}
      </Button>
    </Flex>
  </div>
</template>

<script setup lang="ts">
import { Button, Flex, Form, FormItem, Input } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useLoginValidationRules } from '@/pages/login/loginCommon';
import ResetPwdModal from '@/pages/login/ResetPwdModal.vue';

export type LoginRegisterFormType = 'login' | 'register';
const props = defineProps<{ formType: LoginRegisterFormType }>();
const emits = defineEmits(['switchReg']);

const { t } = useI18n();
const loginFormRef = ref(null);
const loginFormData = ref({
  username: '',
  password: '',
  passwordConfirm: '',
});
const validationRules = useLoginValidationRules(loginFormData);

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

function resetForm() {
  loginFormData.value = {
    username: '',
    password: '',
    passwordConfirm: '',
  };
  loginFormRef.value.resetFields();
  loginFormRef.value.clearValidate();
}

function switchToRegister() {
  emits('switchReg');
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

<template>
  <Button type="link" @click="showModal">{{ t('login.content.forget') }}</Button>
  <Modal
    v-model:open="isModalVisible"
    :title="t('login.content.resetPwd')"
    :mask-closable="false"
    centered
    @cancel="hideModal"
    @ok="hideModal"
  >
    <Form
      v-show="curStep === 1"
      ref="step1FormRef"
      :model="step1FormData"
      :rules="step1Rules"
      layout="vertical"
    >
      <FormItem :label="t('login.content.username')" name="username">
        <Input
          v-model:value="step1FormData.username"
          :placeholder="t('login.content.usernamePlaceholder')"
          allow-clear
        />
      </FormItem>
      <FormItem :label="t('login.content.email')" name="email">
        <Input
          v-model:value="step1FormData.email"
          :placeholder="t('login.content.emailPlaceholder')"
          allow-clear
        />
      </FormItem>
    </Form>

    <Form
      v-show="curStep === 2"
      ref="step2FormRef"
      :model="step2FormData"
      :rules="step2Rules"
      layout="vertical"
    >
      <FormItem :label="t('login.content.password')" name="password">
        <Input
          v-model:value="step2FormData.password"
          :placeholder="t('login.content.passwordPlaceholder')"
          type="password"
          allow-clear
        />
      </FormItem>
      <FormItem :label="t('login.content.passwordConfirm')" name="passwordConfirm">
        <Input
          v-model:value="step2FormData.passwordConfirm"
          :placeholder="t('login.content.passwordConfirm')"
          type="password"
          allow-clear
        />
      </FormItem>
    </Form>

    <template #footer>
      <Button @click="hideModal">{{ t('login.content.cancel') }}</Button>
      <Button v-if="curStep === 2" type="primary" @click="() => setStep(1)">
        {{ t('login.content.prev') }}
      </Button>
      <Button v-if="curStep === 1" type="primary" @click="() => setStep(2)">
        {{ t('login.content.next') }}
      </Button>
      <Button v-if="curStep === 2" type="primary" @click="hideModal">
        {{ t('login.content.confirm') }}
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Button, Form, FormItem, Input, Modal } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useLoginValidationRules } from '@/pages/login/loginCommon';

const { t } = useI18n();
const isModalVisible = ref(false);
const curStep = ref<number>(1);
const step1FormRef = ref(null);
const step2FormRef = ref(null);
const step1FormData = ref({
  username: '',
  email: '',
});
const step2FormData = ref({
  password: '',
  passwordConfirm: '',
});

const validationRules = useLoginValidationRules(step2FormData);
const step1Rules = computed(() => ({
  username: validationRules.username,
  email: validationRules.email,
}));
const step2Rules = computed(() => ({
  password: validationRules.password,
  passwordConfirm: validationRules.confirmPwd,
}));

function showModal() {
  isModalVisible.value = true;
}

function hideModal() {
  step1FormData.value = { username: '', email: '' };
  step1FormRef.value?.resetFields();
  step1FormRef.value?.clearValidate();

  step2FormData.value = { password: '', passwordConfirm: '' };
  step2FormRef.value?.resetFields();
  step2FormRef.value?.clearValidate();

  curStep.value = 1;
  isModalVisible.value = false;
}

function setStep(step: number) {
  if (step === 2)
    step1FormRef.value?.validate().then(() => {
      curStep.value = step;
    });
  else if (step === 1) {
    step2FormData.value = { password: '', passwordConfirm: '' };
    step2FormRef.value?.resetFields();
    step2FormRef.value?.clearValidate();
    curStep.value = step;
  }
}
</script>

<style scoped lang="scss"></style>

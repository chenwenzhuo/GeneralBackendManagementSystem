import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useValidationRules = (formData?: Ref<Record<string, any>>) => {
  const { t } = useI18n();

  return {
    username: [
      { required: true, message: t('login.content.required1'), trigger: 'blur' },
      { min: 6, max: 16, message: t('login.content.error2'), trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9_]+$/, message: t('login.content.error3'), trigger: 'change' },
    ],
    password: [
      { required: true, message: t('login.content.required2'), trigger: 'blur' },
      { min: 6, max: 16, message: t('login.content.error2'), trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9_]+$/, message: t('login.content.error3'), trigger: 'change' },
    ],
    confirmPwd: [
      { required: true, message: t('login.content.required3'), trigger: 'blur' },
      {
        validator: (_, value) => {
          return value === formData?.value.password
            ? Promise.resolve()
            : Promise.reject(new Error(t('login.content.error4')));
        },
        trigger: 'blur',
      },
    ],
    email: [
      { required: true, message: t('login.content.required4'), trigger: 'blur' },
      { type: 'email', message: t('login.content.error5'), trigger: 'blur' },
    ],
  };
};

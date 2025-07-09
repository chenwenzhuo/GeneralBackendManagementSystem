import { useTranslation } from 'react-i18next';

export const useValidationRules = (formData?: Record<string, any>) => {
  const { t } = useTranslation();

  let rules: Record<string, any> = {
    username: [
      { required: true, message: t('login.content.required1'), validateTrigger: 'onBlur' },
      { min: 6, max: 16, message: t('login.content.error2'), validateTrigger: 'onBlur' },
      {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: t('login.content.error3'),
        validateTrigger: 'onChange',
      },
    ],
    password: [
      { required: true, message: t('login.content.required2'), validateTrigger: 'onBlur' },
      { min: 6, max: 16, message: t('login.content.error2'), validateTrigger: 'onBlur' },
      {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: t('login.content.error3'),
        validateTrigger: 'onChange',
      },
    ],
    email: [
      { required: true, message: t('login.content.required4'), validateTrigger: 'onBlur' },
      { type: 'email', message: t('login.content.error5'), validateTrigger: 'onBlur' },
    ],
  };

  if (formData)
    rules = {
      ...rules,
      confirmPwd: [
        { required: true, message: t('login.content.required3'), validateTrigger: 'onBlur' },
        {
          validator: (_: any, value: any) => {
            return value === formData?.password
              ? Promise.resolve()
              : Promise.reject(new Error(t('login.content.error4')));
          },
          validateTrigger: 'onBlur',
        },
      ],
    };

  return rules;
};

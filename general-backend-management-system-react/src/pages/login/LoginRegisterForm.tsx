import { Button, Flex, Form, Input } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useValidationRules } from '@/pages/login/loginRegisterCommon.ts';
import ResetPwdModal from '@/pages/login/ResetPwdModal.tsx';

import styles from './LoginRegisterForm.module.scss';

export type LoginRegisterFormType = 'login' | 'register';

interface LoginRegisterFormProps {
  formType: LoginRegisterFormType;
  switchTab: (tabKey: LoginRegisterFormType) => void;
}

interface LoginRegisterFormData {
  username: string;
  password: string;
  passwordConfirm?: string;
}

type FormRules = Record<keyof LoginRegisterFormData, any[]>;

const { Item: FormItem } = Form;
const { Password } = Input;

export default function LoginRegisterForm({ formType, switchTab }: LoginRegisterFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<LoginRegisterFormData>({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const validationRules = useValidationRules(formData);
  const formRules: FormRules = useMemo(() => {
    const { username, password, confirmPwd } = validationRules;
    const commonRules = { username, password } as FormRules;

    if (formType === 'login') return commonRules;
    return { ...commonRules, passwordConfirm: confirmPwd };
  }, [formType, validationRules]);

  function handleFormDataChange(fieldName: keyof LoginRegisterFormData, value: string) {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }

  return (
    <>
      <Form layout={'vertical'} form={form} autoComplete={'off'}>
        <FormItem
          name={'username'}
          label={t('login.content.username')}
          rules={formRules.username}
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
        >
          <Input
            placeholder={t('login.content.usernamePlaceholder')}
            onChange={(e) => handleFormDataChange('username', e.target.value)}
          />
        </FormItem>
        <FormItem
          name={'password'}
          label={t('login.content.password')}
          rules={formRules.password}
          validateTrigger={['onBlur', 'onChange']}
          validateFirst
        >
          <Password
            placeholder={t('login.content.passwordPlaceholder')}
            onChange={(e) => handleFormDataChange('password', e.target.value)}
          />
        </FormItem>
        {formType === 'register' && (
          <FormItem
            name={'passwordConfirm'}
            label={t('login.content.passwordConfirm')}
            rules={formRules.passwordConfirm}
            validateTrigger={['onBlur']}
            validateFirst
          >
            <Password
              placeholder={t('login.content.passwordConfirmPlaceholder')}
              onChange={(e) => handleFormDataChange('passwordConfirm', e.target.value)}
            />
          </FormItem>
        )}
      </Form>

      {formType === 'login' && (
        <Flex justify={'flex-end'}>
          <ResetPwdModal />
        </Flex>
      )}
      <Button type={'primary'} size={'large'} className={styles['login-reg-button']}>
        {t(`login.content.${formType}`)}
      </Button>
      {formType === 'login' && (
        <Flex justify={'center'} align={'center'} className={styles['go-reg-bar']}>
          <span>{t('login.content.noAccount')}</span>
          <Button
            type={'link'}
            size={'small'}
            className={styles['go-reg-button']}
            onClick={() => switchTab(formType === 'login' ? 'register' : 'login')}
          >
            {t('login.content.registerNow')}
          </Button>
        </Flex>
      )}
    </>
  );
}

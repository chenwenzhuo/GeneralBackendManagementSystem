import { Button, Flex, Form, Input, message } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { LoginRegisterDataType } from '@/api/LoginRegister.ts';
import { login, register } from '@/api/LoginRegister.ts';
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
const actionMap = { login, register };

export default function LoginRegisterForm({ formType, switchTab }: LoginRegisterFormProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loginRegisterForm] = Form.useForm();
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

  function handleSubmit() {
    loginRegisterForm.validateFields().then(async (values) => {
      console.log(values);
      const { username, password } = values;
      const data: LoginRegisterDataType = { username, password };

      const res: any = await actionMap[formType](data);
      const space = i18n.language === 'zh' ? '' : ' ';
      if (res.status === 0) {
        messageApi.success(
          `${t('login.content.' + formType)}${space}${t('login.content.success')}`,
        );
        formType === 'login' && navigate('/admin', { replace: true });
      } else {
        messageApi.error(`${t('login.content.' + formType)}${space}${t('login.content.fail')}`);
      }
    });
  }

  return (
    <>
      {contextHolder} {/* 必须放在组件中，用于挂载 message 容器 */}
      <Form layout={'vertical'} form={loginRegisterForm} autoComplete={'off'}>
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
      <Button
        type={'primary'}
        size={'large'}
        className={styles['login-reg-button']}
        onClick={handleSubmit}
      >
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

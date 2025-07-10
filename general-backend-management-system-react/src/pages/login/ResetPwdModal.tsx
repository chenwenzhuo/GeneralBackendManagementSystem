import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useValidationRules } from '@/pages/login/loginRegisterCommon.ts';

const { Item: FormItem } = Form;
const { Password } = Input;

export default function ResetPwdModal() {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const [step1Form] = Form.useForm();
  const [step2Form] = Form.useForm();
  const [step1FormData, setStep1FormData] = useState({ username: '', email: '' });
  const [step2FormData, setStep2FormData] = useState({ password: '', passwordConfirm: '' });
  const validationRules = useValidationRules(step2FormData);

  const modalFooterBtns = [
    <Button key={'cancel'} onClick={closeModal}>
      {t('login.content.cancel')}
    </Button>,
  ];
  if (step === 1) {
    modalFooterBtns.push(
      <Button key={'next'} type={'primary'} onClick={() => gotoStep(2)}>
        {t('login.content.next')}
      </Button>,
    );
  } else if (step === 2) {
    modalFooterBtns.push(
      <Button key={'prev'} type={'primary'} onClick={() => gotoStep(1)}>
        {t('login.content.prev')}
      </Button>,
      <Button key={'confirm'} type={'primary'} onClick={closeModal}>
        {t('login.content.confirm')}
      </Button>,
    );
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function gotoStep(nextStep: number) {
    setStep(nextStep);
  }

  return (
    <>
      <Button type={'link'} onClick={openModal}>
        {t('login.content.forget')}
      </Button>
      <Modal
        open={isModalOpen}
        title={t('login.content.resetPwd')}
        footer={modalFooterBtns}
        centered
        maskClosable={false}
      >
        {step === 1 && (
          <Form form={step1Form} layout={'vertical'} autoComplete={'off'}>
            <FormItem
              name={'username'}
              label={t('login.content.username')}
              rules={validationRules.username}
              validateTrigger={['onBlur', 'onChange']}
              validateFirst
            >
              <Input
                placeholder={t('login.content.usernamePlaceholder')}
                onChange={(e) => setStep1FormData({ ...step1FormData, username: e.target.value })}
              />
            </FormItem>
            <FormItem
              name={'email'}
              label={t('login.content.email')}
              rules={validationRules.email}
              validateTrigger={['onBlur', 'onChange']}
              validateFirst
            >
              <Input
                placeholder={t('login.content.emailPlaceholder')}
                onChange={(e) => setStep1FormData({ ...step1FormData, email: e.target.value })}
              />
            </FormItem>
          </Form>
        )}
        {step === 2 && (
          <Form form={step2Form} layout={'vertical'} autoComplete={'off'}>
            <FormItem
              name={'password'}
              label={t('login.content.password')}
              rules={validationRules.password}
              validateTrigger={['onBlur', 'onChange']}
              validateFirst
            >
              <Password
                placeholder={t('login.content.passwordPlaceholder')}
                onChange={(e) => setStep2FormData({ ...step2FormData, password: e.target.value })}
              />
            </FormItem>
            <FormItem
              name={'passwordConfirm'}
              label={t('login.content.passwordConfirm')}
              rules={validationRules.confirmPwd}
              validateTrigger={['onBlur']}
              validateFirst
            >
              <Password
                placeholder={t('login.content.passwordConfirmPlaceholder')}
                onChange={(e) =>
                  setStep2FormData({ ...step2FormData, passwordConfirm: e.target.value })
                }
              />
            </FormItem>
          </Form>
        )}
      </Modal>
    </>
  );
}

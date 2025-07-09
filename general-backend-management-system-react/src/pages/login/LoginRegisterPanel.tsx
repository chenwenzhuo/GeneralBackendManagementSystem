import { Card, Tabs } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { LoginRegisterFormType } from '@/pages/login/LoginRegisterForm.tsx';
import LoginRegisterForm from '@/pages/login/LoginRegisterForm.tsx';

import styles from './LoginRegisterPanel.module.scss';

export default function LoginRegisterPanel() {
  const { t } = useTranslation();
  const [activeTabKey, setActiveTabKey] = useState<LoginRegisterFormType>('login');

  const tabItems = [
    { label: t('login.content.login'), key: 'login' },
    { label: t('login.content.register'), key: 'register' },
  ];

  function handleTabChange(activeKey: string) {
    setActiveTabKey(activeKey as LoginRegisterFormType);
  }

  return (
    <Card className={styles['login-panel-card']}>
      <Tabs
        activeKey={activeTabKey}
        items={tabItems}
        size={'large'}
        tabBarStyle={{ width: '100%' }}
        centered
        onChange={handleTabChange}
      />
      <LoginRegisterForm formType={activeTabKey} switchTab={handleTabChange} />
    </Card>
  );
}

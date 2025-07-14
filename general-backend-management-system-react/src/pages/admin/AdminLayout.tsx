import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

import NavHeader from '@/components/nav-header/NavHeader.tsx';
import NavMenu from '@/components/nav-menu/NavMenu.tsx';

import styles from './AdminLayout.module.scss';

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const { t } = useTranslation();

  return (
    <Layout className={styles['admin-layout']}>
      <Sider className={styles['sider']}>
        <div className={styles['title']}>{t('message.title')}</div>
        <div className={styles['menu']}>
          <NavMenu />
        </div>
      </Sider>
      <Layout className={styles['content-layout']}>
        <Header className={styles['header']}>
          <NavHeader />
        </Header>
        <Content className={styles['content']}>
          <div className={styles['content-inner']}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

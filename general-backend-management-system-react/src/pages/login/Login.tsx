import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';

import LangSwitch from '@/components/lang-switch/LangSwitch.tsx';

import styles from './Login.module.scss';

const { Header, Footer, Content } = Layout;

export default function Login() {
  const { t } = useTranslation();

  const footerText = {
    techs: [
      t('login.footer.devMode'),
      t('login.footer.vue'),
      t('login.footer.vueRouter'),
      t('login.footer.nodejs'),
      t('login.footer.antdVue'),
    ],
    copyright: [t('login.footer.copyright')],
  };
  const footerTechsElem = footerText.techs.map((tech, index) => <li key={index}>{tech}</li>);
  const footerCopyrightElem = footerText.copyright.map((cr, index) => <li key={index}>{cr}</li>);

  return (
    <Layout className={styles['login-layout']}>
      <Header className={styles['login-header']}>
        <div className={styles['header-content']}>
          <h1 className={styles['header-title']}>{t('message.title')}</h1>
          <div className={styles['header-shortcuts']}>
            <div className={styles['welcome']}>{t('login.header.welcome')}</div>
            <LangSwitch />
          </div>
        </div>
      </Header>
      <Content className={styles['login-body']}>
        <div className={styles['body-content']}>Content</div>
      </Content>
      <Footer className={styles['login-footer']}>
        <div className={styles['footer-content']}>
          <ul className={styles['footer-techs']}>{footerTechsElem}</ul>
          <ul className={styles['footer-copyright']}>{footerCopyrightElem}</ul>
        </div>
      </Footer>
    </Layout>
  );
}

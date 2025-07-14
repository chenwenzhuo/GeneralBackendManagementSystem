import { SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import MessageModal from '@/components/nav-header/MessageModal.tsx';

import styles from './NavHeader.module.scss';

const dropdownItems = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' },
];

export default function NavHeader() {
  const { t } = useTranslation();

  return (
    <Flex justify={'space-between'} align={'center'}>
      <span className={styles['welcome-text']}>{t('login.header.welcome')}</span>

      <Avatar src={'https://picsum.photos/200'} alt={'avatar'} />
      <MessageModal className={styles['msg-modal']} />
      <Dropdown menu={{ items: dropdownItems }}>
        <Button
          type={'link'}
          icon={<SettingOutlined />}
          style={{ fontSize: '20px', padding: '0' }}
        />
      </Dropdown>
    </Flex>
  );
}

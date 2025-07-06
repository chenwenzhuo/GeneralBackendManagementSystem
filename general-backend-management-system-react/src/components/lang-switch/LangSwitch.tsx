import { TranslationOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

const dropdownMenuItems: MenuProps['items'] = [
  { key: 'zh', label: '简体中文' },
  { key: 'en', label: 'English' },
];

export default function LangSwitch() {
  const { t, i18n } = useTranslation();

  const switchLang = ({ key }: any) => i18n.changeLanguage(key);

  return (
    <Dropdown menu={{ items: dropdownMenuItems, onClick: switchLang }}>
      <Button type={'link'} icon={<TranslationOutlined />}>
        {t('login.header.switchLang')}
      </Button>
    </Dropdown>
  );
}

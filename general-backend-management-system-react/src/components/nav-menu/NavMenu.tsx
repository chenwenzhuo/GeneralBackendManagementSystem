import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router';

import { useNavMenu } from '@/components/nav-menu/useNavMenu.tsx';

type MenuItem = Required<MenuProps>['items'][number];

export default function NavMenu() {
  const navMenuConfig: MenuItem[] = useNavMenu();
  const navigate = useNavigate();

  function onSelectMenu({ keyPath }: Record<string, any>) {
    const path = keyPath.join('/');
    navigate(path);
  }

  return (
    <Menu
      items={navMenuConfig}
      defaultSelectedKeys={['home']}
      mode={'inline'}
      theme={'dark'}
      style={{ width: '100%' }}
      onSelect={onSelectMenu}
    />
  );
}

import {
  AuditOutlined,
  FileSearchOutlined,
  HomeOutlined,
  InboxOutlined,
  LoginOutlined,
  MessageOutlined,
  SettingOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

export type MenuItem = Required<MenuProps>['items'][number];

export const useNavMenu = (): MenuItem[] => {
  const { t } = useTranslation();

  return [
    { key: 'home', label: t('navMenu.home'), icon: <HomeOutlined /> },
    { key: 'sysOverview', label: t('navMenu.sysOverview'), icon: <FileSearchOutlined /> },
    {
      key: 'userManage',
      label: t('navMenu.userManage'),
      icon: <UserOutlined />,
      children: [
        {
          type: 'group',
          key: 'administratorManage',
          label: t('navMenu.administratorManage'),
          children: [
            { key: 'productManager', label: t('navMenu.productManager') },
            { key: 'userManager', label: t('navMenu.userManager') },
            { key: 'messageManager', label: t('navMenu.messageManager') },
          ],
        },
        {
          type: 'group',
          key: 'employeeManage',
          label: t('navMenu.employeeManage'),
          children: [{ key: 'userList', label: t('navMenu.userList') }],
        },
      ],
    },
    {
      key: 'productManage',
      label: t('navMenu.productManage'),
      icon: <InboxOutlined />,
      children: [
        {
          type: 'group',
          key: 'inventoryManage',
          label: t('navMenu.inventoryManage'),
          children: [{ key: 'productList', label: t('navMenu.productList') }],
        },
        {
          type: 'group',
          key: 'outboundManage',
          label: t('navMenu.outboundManage'),
          children: [{ key: 'outboundList', label: t('navMenu.outboundList') }],
        },
      ],
    },
    {
      key: 'msgManage',
      label: t('navMenu.msgManage'),
      icon: <MessageOutlined />,
      children: [
        { key: 'messageList', label: t('navMenu.messageList') },
        { key: 'recycleBin', label: t('navMenu.recycleBin') },
      ],
    },
    { key: 'contractManage', label: t('navMenu.contractManage'), icon: <AuditOutlined /> },
    { key: 'operationLog', label: t('navMenu.operationLog'), icon: <ToolOutlined /> },
    { key: 'loginLog', label: t('navMenu.loginLog'), icon: <LoginOutlined /> },
    { key: 'sysConfig', label: t('navMenu.sysConfig'), icon: <SettingOutlined /> },
  ];
};

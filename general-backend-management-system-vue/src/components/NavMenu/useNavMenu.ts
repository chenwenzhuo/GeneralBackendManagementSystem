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
} from '@ant-design/icons-vue';
import type { ItemType } from 'ant-design-vue';
import type { VueElement } from 'vue';
import { h } from 'vue';
import { useI18n } from 'vue-i18n';

export function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

export const useNavMenu = () => {
  const { t } = useI18n();

  const navMenuConfig: ItemType[] = [
    getItem(t('navMenu.home'), 'home', () => h(HomeOutlined)),
    getItem(t('navMenu.sysOverview'), 'sysOverview', () => h(FileSearchOutlined)),
    getItem(t('navMenu.userManage'), 'userManage', () => h(UserOutlined), [
      getItem(
        t('navMenu.administratorManage'),
        'administratorManage',
        null,
        [
          getItem(t('navMenu.productManager'), 'productManager'),
          getItem(t('navMenu.userManager'), 'userManager'),
          getItem(t('navMenu.messageManager'), 'messageManager'),
        ],
        'group',
      ),
      getItem(
        t('navMenu.employeeManage'),
        'employeeManage',
        null,
        [getItem(t('navMenu.userList'), 'userList')],
        'group',
      ),
    ]),
    getItem(t('navMenu.productManage'), 'productManage', () => h(InboxOutlined), [
      getItem(
        t('navMenu.inventoryManage'),
        'inventoryManage',
        null,
        [getItem(t('navMenu.productList'), 'productList')],
        'group',
      ),
      getItem(
        t('navMenu.outboundManage'),
        'outboundManage',
        null,
        [getItem(t('navMenu.outboundList'), 'outboundList')],
        'group',
      ),
    ]),
    getItem(t('navMenu.msgManage'), 'msgManage', () => h(MessageOutlined), [
      getItem(t('navMenu.messageList'), 'messageList'),
      getItem(t('navMenu.recycleBin'), 'recycleBin'),
    ]),
    getItem(t('navMenu.contractManage'), 'contractManage', () => h(AuditOutlined)),
    getItem(t('navMenu.operationLog'), 'operationLog', () => h(ToolOutlined)),
    getItem(t('navMenu.loginLog'), 'loginLog', () => h(LoginOutlined)),
    getItem(t('navMenu.sysConfig'), 'sysConfig', () => h(SettingOutlined)),
  ];

  return { navMenuConfig };
};

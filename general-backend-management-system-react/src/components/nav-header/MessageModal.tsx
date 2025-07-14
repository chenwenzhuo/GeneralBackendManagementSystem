import { MailOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';

import styles from './MessageModal.module.scss';

interface MessageModalProps {
  className: string;
}

export default function MessageModal({ className }: MessageModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function showModal() {
    setIsModalOpen(true);
  }

  function hideModal() {
    setIsModalOpen(false);
  }

  function handleOk() {
    hideModal();
  }

  return (
    <div className={`${className} ${styles['container']}`}>
      <Button
        type={'link'}
        icon={<MailOutlined />}
        onClick={showModal}
        className={styles['open-btn']}
      />

      <Modal
        title={'部门消息'}
        open={isModalOpen}
        maskClosable={false}
        onOk={handleOk}
        onCancel={hideModal}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem consectetur cum
          delectus distinctio dolorem doloremque dolores fugit harum itaque molestias mollitia
          perferendis quasi quisquam rerum ullam, unde? Consequatur, perferendis.
        </p>
      </Modal>
    </div>
  );
}

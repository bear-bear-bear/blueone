import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteButton = () => {
  return (
    <Tooltip title="삭제">
      <Button type="text" danger size="small" icon={<DeleteOutlined />} />
    </Tooltip>
  );
};

export default DeleteButton;

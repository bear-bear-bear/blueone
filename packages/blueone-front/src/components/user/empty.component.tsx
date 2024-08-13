import { Empty as AntdEmpty } from 'antd';

export default function Empty({ description }: { description: string }) {
  return (
    <AntdEmpty
      image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{
        height: 60,
      }}
      description={
        <span
          style={{
            color: '#fafafa',
            fontSize: 16,
          }}
        >
          {description}
        </span>
      }
      style={{
        width: '95%',
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

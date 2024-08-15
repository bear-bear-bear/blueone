import { Empty as AntdEmpty } from 'antd';

export default function Empty({ description }: { description: string }) {
  return (
    <AntdEmpty
      image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{ height: 60 }}
      description={<span className="text-gray-100 text-base">{description}</span>}
      className="w-[95%] absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
  );
}

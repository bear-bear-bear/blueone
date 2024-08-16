import { Empty as AntdEmpty } from 'antd';
import cn from '@/shared/lib/utils/cn';

type Props = {
  description: string;
  centered?: boolean;
};

export default function Empty({ description, centered = true }: Props) {
  return (
    <AntdEmpty
      image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{ height: 60 }}
      description={<span className="text-gray-100 text-base">{description}</span>}
      className={cn({
        'w-[95%] absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2': centered,
      })}
    />
  );
}

import { ReactNode } from 'react';
import { App, ConfigProvider } from 'antd';
import { ThemeConfig } from 'antd/lib';
import theme from '@/shared/ui/foundation/theme';

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme}>
      <App message={{ maxCount: 2 }}>{children}</App>
    </ConfigProvider>
  );
}

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: theme.primaryColor,
    borderRadius: theme.borderRadius,
  },
  components: {
    Alert: {
      /**
       * `banner: true`일 때의 스타일 또한 덮어씌우기 위해 important 사용
       */
      colorInfoBorder: `${theme.primaryColor} !important`,
      colorInfoBg: 'none !important',
      colorInfoText: '#fff !important',
    },
    Tabs: {
      itemColor: '#fff',
      itemSelectedColor: theme.primaryColor,
      itemHoverColor: theme.primaryColor,
      inkBarColor: theme.primaryColor,
    },
  },
};

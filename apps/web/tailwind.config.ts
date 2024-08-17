import { Config } from 'tailwindcss';
import theme from './src/shared/ui/foundation/theme';

const tailwindConfig: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: theme.screens,
    extend: theme,
  },
};

export default tailwindConfig;

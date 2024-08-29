export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					'--body-background': `${require('daisyui/src/theming/themes')['light']['base-100']}80`,
				}
			},
			{
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					'--body-background': `${require('daisyui/src/theming/themes')['dark']['base-100']}80`,
				}
			}],
  },
};
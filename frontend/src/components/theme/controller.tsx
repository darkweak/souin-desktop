import React from 'react';
import { Icon } from '../icon';

export const ThemeSwitcher: React.FC = () => {
  return (
    <>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          value="synthwave"
          onChange={e =>
            document.querySelector('html')?.setAttribute('data-theme', e.target.checked ? 'dark' : 'light')
          }
        />

        <Icon className="swap-on h-5" name="light-theme" />
        <Icon className="swap-off h-5" name="dark-theme" />
      </label>
    </>
  );
};

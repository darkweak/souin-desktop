import React from 'react';
import { Icon } from '@/components/icon';
import { Link } from 'wouter';
import { useInstances } from '@/context';
import { ThemeSwitcher } from '../theme/controller';

export const Navbar: React.FC = () => {
  const instances = useInstances();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 px-4">
        <span className="text-xl font-bold">
          Souin desktop <span className="text-base-content/25">v0.0.1</span>
        </span>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details className="dropdown-end">
              <summary>
                <Icon name="instances" />
                Instances
              </summary>
              <ul className="bg-base-100 dropdown-content border border-base-content/20 z-10">
                {instances.map(instance => (
                  <li key={`instance-${instance.name}-${instance.uuid}`}>
                    <Link
                      to={`/instances/${instance.uuid}/informations`}
                      className={active => `flex ${active ? 'active' : ''}`}
                    >
                      {instance.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/instances" className="flex">
                    <Icon name="add" /> Add new instance
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>
              <Icon name="settings" /> Settings
            </a>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </div>
  );
};

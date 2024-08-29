import React from 'react';
import {
  BuildingOfficeIcon,
  Cog8ToothIcon,
  MoonIcon,
  PencilIcon,
  PlusIcon,
  QueueListIcon,
  RectangleStackIcon,
  SunIcon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ClassName } from '@/types';

type allowedIcons =
  | 'add'
  | 'dark-theme'
  | 'delete'
  | 'edit'
  | 'group'
  | 'instance'
  | 'instances'
  | 'light-theme'
  | 'list'
  | 'settings';

const iconMapper = (name: allowedIcons): React.ElementType => {
  switch (name) {
    case 'add':
      return PlusIcon;
    case 'dark-theme':
      return SunIcon;
    case 'delete':
      return TrashIcon;
    case 'edit':
      return PencilIcon;
    case 'group':
      return TagIcon;
    case 'instance':
      return BuildingOfficeIcon;
    case 'instances':
      return RectangleStackIcon;
    case 'light-theme':
      return MoonIcon;
    case 'list':
      return QueueListIcon;
    case 'settings':
      return Cog8ToothIcon;
  }
};

export const Icon: React.FC<{ name: allowedIcons } & ClassName> = ({ className, name }) => {
  const T = iconMapper(name);

  return <T className={className ?? 'h-4'} />;
};

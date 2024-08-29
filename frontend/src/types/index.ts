import { UUID } from 'crypto';
import { v4 } from 'uuid';

export type ClassName = {
  className?: string;
};

export type Instance = {
  name: string;
  uuid?: string;
  url: string;
};

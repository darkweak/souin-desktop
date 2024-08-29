import { Instance } from '@/types';

export class LocalStorage {
  private keyPrefix = 'souin_desktop_';

  getInstances(): ReadonlyArray<Instance> {
    return JSON.parse(localStorage.getItem(this.keyPrefix + 'instances') ?? '[]');
  }

  setInstances(instances: ReadonlyArray<Instance>) {
    localStorage.setItem(this.keyPrefix + 'instances', JSON.stringify(instances));
  }
}

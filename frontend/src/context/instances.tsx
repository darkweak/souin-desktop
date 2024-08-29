import { Instance } from '@/types';
import { LocalStorage } from '@/utils';
import { v4 } from 'uuid';
import React, { useContext, useEffect, useReducer } from 'react';

export enum InstancesKind {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  UPDATE = 'UPDATE',
}
interface InstancesAction {
  type: InstancesKind;
  payload: Instance;
}
interface InstancesState {
  instances: ReadonlyArray<Instance>;
}
interface InstancesContext extends InstancesState {
  dispatch: React.Dispatch<InstancesAction>;
}
const defaultValue: InstancesContext = {
  dispatch: () => undefined,
  instances: new LocalStorage().getInstances(),
};
const InstanceContext = React.createContext<InstancesContext>(defaultValue);

const instancesReducer = (state: InstancesState, action: InstancesAction): InstancesState => {
  switch (action.type) {
    case InstancesKind.ADD:
      return {
        ...state,
        instances: [
          ...state.instances,
          {
            ...action.payload,
            uuid: v4(),
          },
        ],
      };
    case InstancesKind.REMOVE:
      return {
        ...state,
        instances: state.instances.filter(value => value.uuid !== action.payload.uuid),
      };
    case InstancesKind.UPDATE:
      const idx = state.instances.findIndex(value => value.uuid === action.payload.uuid);
      const instances: Instance[] = Object.assign([], state.instances);
      console.log(idx, instances, action.payload);
      instances[idx] = { ...instances[idx], ...action.payload };

      return {
        ...state,
        instances,
      };
  }
};

export const InstanceProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(instancesReducer, defaultValue);
  const value = { instances: state.instances, dispatch };

  useEffect(() => {
    new LocalStorage().setInstances(state.instances);
  }, [state.instances]);

  return <InstanceContext.Provider value={value}>{children}</InstanceContext.Provider>;
};

export const useInstances = () => {
  const { instances } = useContext(InstanceContext);

  return instances;
};
export const useDispatchInstances = () => {
  const { dispatch } = useContext(InstanceContext);

  return dispatch;
};
export const useInstance = (id: string): Instance | undefined => {
  const { instances } = useContext(InstanceContext);

  return instances.find(value => value.uuid === id);
};

import { Icon } from '@/components/icon';
import { InstancesKind, useDispatchInstances, useInstance } from '@/context';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, Redirect, Route, Switch, useLocation } from 'wouter';
import { Informations } from './instance/informations';
import { List } from './instance/list';
import { Surrogate } from './instance/surrogate';

const Status: React.FC<{ url: string }> = ({ url }) => {
  const [isUp, setUp] = useState<boolean>();
  useEffect(() => {
    fetch(url)
      .then(val => {
        setUp(val.ok && val.status === 200);
      })
      .catch(() => setUp(false));
  }, []);

  const [status, content] = useMemo(() => {
    console.log(isUp);
    switch (isUp) {
      case undefined:
        return ['badge-neutral-content', 'Contacting the API...'];
      case true:
        return ['badge-success', 'Successfully retrieved data from the API'];
      case false:
        return ['badge-error', 'Impossible to retrieve data from the API'];
    }
  }, [isUp]);

  return (
    <div className="tooltip tooltip-right my-auto" data-tip={content}>
      <div className={`badge ${status} badge-xs`} />
    </div>
  );
};

const InstancePage: React.FC<{ instance: string }> = ({ instance: instanceId }) => {
  const instance = useInstance(instanceId);
  const dispatch = useDispatchInstances();
  const [, setLocation] = useLocation();

  if (!instance) {
    setLocation('/');

    return null;
  }

  return (
    <>
      <div className="flex gap-4 max-h-full min-h-0">
        <div className="bg-base-100/90 rounded-box w-1/5 max-h-fit p-2 border border-neutral-content/50">
          <ul className="menu">
            <div className="flex pb-4 px-4 gap-2 max-w-full">
              <Status url={instance.url} />{' '}
              <span className="block font-black text-neutral-content uppercase text-xl text-ellipsis overflow-hidden">
                {instance.name}
              </span>
            </div>
            <li>
              <Link to="/informations" className={active => (active ? 'active' : '')}>
                <Icon name="instance" /> Informations
              </Link>
            </li>
            <li>
              <Link to="/list-keys" className={active => (active ? 'active' : '')}>
                <Icon name="list" /> List all keys
              </Link>
            </li>
            <li>
              <Link to="/surrogate-keys" className={active => (active ? 'active' : '')}>
                <Icon name="group" /> Surrogate keys
              </Link>
            </li>
          </ul>
          <div className="flex p-2 mt-auto w-full">
            <button
              className="w-full btn btn-outline btn-error"
              type="submit"
              onClick={() => {
                dispatch({ payload: instance, type: InstancesKind.REMOVE });
                setLocation('/');
              }}
            >
              <Icon name="delete" /> DELETE
            </button>
          </div>
        </div>
        <div className="w-4/5 max-h-full min-h-0">
          <Switch>
            <Route path="/informations" component={() => <Informations instance={instance} />} />
            <Route path="/list-keys" component={() => <List url={instance.url} />} />
            <Route path="/surrogate-keys" component={() => <Surrogate url={instance.url} />} />
            <Route>
              <Redirect to="/informations" />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default InstancePage;

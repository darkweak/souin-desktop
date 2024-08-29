import { InstancesKind, useDispatchInstances } from '@/context';
import React from 'react';

const defaultValue: Record<string, string> = {};

export const Instance: React.FC<{ defaultValues?: typeof defaultValue; type?: InstancesKind }> = ({
  defaultValues,
  type = InstancesKind.ADD,
}) => {
  const dispatch = useDispatchInstances();

  return (
    <form
      className="bg-base-100/90 px-8 py-4 rounded-xl flex flex-col gap-y-6"
      onSubmit={e => {
        e.preventDefault();
        if (e.target instanceof HTMLFormElement) {
          const elements = e.target.elements;
          const values = [...elements]
            .filter(el => el.tagName === 'INPUT')
            .reduce((prev, current) => {
              prev[current.getAttribute('name') ?? ''] = (current as HTMLInputElement).value;

              return prev;
            }, defaultValue);

          dispatch({
            payload: {
              ...defaultValues,
              name: values.name,
              url: values.url,
            },
            type,
          });
        }
      }}
    >
      <label>
        Name
        <input
          required
          name="name"
          type="text"
          placeholder="Your instance name"
          className="input input-bordered w-full"
          defaultValue={defaultValues?.['name']}
        />
      </label>
      <label>
        URL
        <input
          required
          name="url"
          type="url"
          placeholder="http://your-instance.com/souin-api/souin"
          className="input input-bordered w-full"
          defaultValue={defaultValues?.['url']}
        />
      </label>
      <div className="mx-auto">
        <button className="btn btn-outline btn-success" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const Surrogate: React.FC<{ url: string }> = ({ url }) => {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery(`surrogate-keys`, {
    refetchInterval: 2000,
    notifyOnChangeProps: ['data'],
    queryFn: () =>
      fetch(`${url}/surrogate_keys`)
        .then(res => res.json())
        .then((values: Record<string, string>) => values),
  });

  const mutation = useMutation({
    mutationFn: (keys: ReadonlyArray<string>) =>
      fetch(url, {
        headers: {
          'Surrogate-Key': keys.join(','),
        },
        method: 'PURGE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: `surrogate-keys` });
    },
  });

  const [toRemove, setToRemove] = useState<ReadonlyArray<string>>([]);
  const [search, setSearch] = useState<string>('');

  console.log(data);

  return (
    <div className="overflow-auto bg-base-100/90 flex flex-col rounded-box max-h-full min-h-0 border border-neutral-content/50">
      {Object.keys(data).length ? (
        <>
          <div className="flex mb-2 py-2 px-4 gap-2 sticky top-0 rounded-box bg-base-100/90">
            <input
              type="checkbox"
              className="checkbox my-auto"
              defaultChecked={toRemove.length === data?.length}
              onClick={e => {
                if (e.target instanceof HTMLInputElement) {
                  setToRemove(e.target.checked ? Object.keys(data ?? {}) : []);
                }
              }}
            />
            <input
              type="text"
              placeholder="Your key name"
              className="input input-sm input-bordered"
              onChange={({ target }) => setSearch(target.value)}
            />
            {!!toRemove.length && (
              <button className="btn btn-sm btn-outline btn-error" onClick={() => mutation.mutate(toRemove)}>
                PURGE {toRemove.length} {toRemove.length > 1 ? 'GROUPS' : 'GROUP'}
              </button>
            )}
          </div>
          <ul className="px-4">
            {Object.entries(data)
              .filter(
                ([key, value]) =>
                  key.toLowerCase().includes(search.toLowerCase()) ||
                  value.toLowerCase().includes(search.toLowerCase()),
              )
              .map(([itemKey, itemValue]) => (
                <li className="mb-2" key={`surrogate-${itemKey}`}>
                  <details>
                    <summary className="flex">
                      <label className="flex gap-2">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={toRemove.includes(itemKey)}
                          onChange={({ target }) => {
                            if (target instanceof HTMLInputElement) {
                              setToRemove(state =>
                                target.checked ? [...state, itemKey] : state.filter(i => i != itemKey),
                              );
                            }
                          }}
                        />
                        {itemKey}
                      </label>
                    </summary>
                    {itemValue
                      .slice(1)
                      .split(',')
                      .map(value => (
                        <li key={`surrogate-key-${itemKey}-${value}`}>{value}</li>
                      ))}
                  </details>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <span className="font-black text-base-content/50 py-2 px-4 mx-auto">No data to display</span>
      )}
    </div>
  );
};

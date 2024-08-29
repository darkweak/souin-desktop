import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const List: React.FC<{ url: string }> = ({ url }) => {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery(`list-keys-${url}`, {
    refetchInterval: 2000,
    notifyOnChangeProps: ['data'],
    isDataEqual: (old?: string[], current?: string[]) => old?.length === current?.length,
    queryFn: () =>
      fetch(url)
        .then(res => res.json())
        .then((values: ReadonlyArray<string>) => values.toSorted()),
  });

  const mutation = useMutation({
    mutationFn: (keys: ReadonlyArray<string>) =>
      Promise.allSettled(keys.map(key => fetch(`${url}/${key}`, { method: 'PURGE' }))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: `list-keys-${url}` });
    },
  });

  const [toRemove, setToRemove] = useState<ReadonlyArray<string>>([]);
  const [search, setSearch] = useState<string>('');

  return (
    <div className="overflow-auto bg-base-100/90 flex flex-col rounded-box max-h-full min-h-0 border border-neutral-content/50">
      {data.length ? (
        <>
          <div className="flex mb-2 py-2 px-4 gap-2 sticky top-0 bg-base-100/90 rounded-box">
            <input
              type="checkbox"
              className="checkbox my-auto"
              defaultChecked={toRemove.length === data?.length}
              onClick={e => {
                if (e.target instanceof HTMLInputElement) {
                  setToRemove(e.target.checked ? (data ?? []) : []);
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
                PURGE {toRemove.length} {toRemove.length > 1 ? 'TAGS' : 'TAG'}
              </button>
            )}
          </div>
          <ul className="px-4">
            {data
              .filter(item => item.toLowerCase().includes(search.toLowerCase()))
              .map(item => (
                <li className="mb-2" key={item}>
                  <label className="flex gap-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={toRemove.includes(item)}
                      onChange={({ target }) => {
                        if (target instanceof HTMLInputElement) {
                          setToRemove(state => (target.checked ? [...state, item] : state.filter(i => i != item)));
                        }
                      }}
                    />
                    {item}
                  </label>
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

import { FC, useEffect, useRef } from 'react';

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

const Search: FC<SearchProps> = ({ query, setQuery }) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (document.activeElement === inputEl.current) return;

      if (e.key === 'Enter') {
        inputEl?.current?.focus();
        setQuery('');
      }
    }

    document.addEventListener('keydown', callback);

    return function () {
      document.removeEventListener('keydown', callback);
    };
  }, [setQuery]);

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;

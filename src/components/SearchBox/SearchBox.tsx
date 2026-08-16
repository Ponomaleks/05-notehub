import css from './SearchBox.module.css';

interface SearchBoxProps {
  setQuery: (query: string) => void;
}

const SearchBox = ({ setQuery }: SearchBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
};

export default SearchBox;

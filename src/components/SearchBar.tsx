import { FormEvent, useRef } from 'react';

interface Params {
	onSearch: (e: FormEvent, value: string) => void;
}

const SearchBar = ({ onSearch }: Params) => {
	const search = useRef<HTMLInputElement>(null!);
	return (
		<div>
			<form onSubmit={(event) => onSearch(event, search.current.value)}>
				<input ref={search} type="text" />
				<button type="submit">Search</button>
			</form>
		</div>
	);
};

export default SearchBar;

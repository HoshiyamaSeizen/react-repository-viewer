import { FormEvent, useEffect, useRef } from 'react';

interface Params {
	onSearch: (e: FormEvent, value: string) => void;
	initValue: string;
}

const SearchBar = ({ onSearch, initValue }: Params) => {
	const search = useRef<HTMLInputElement>(null!);

	useEffect(() => {
		search.current.value = initValue;
	}, [onSearch, initValue]);

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

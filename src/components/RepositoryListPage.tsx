import { FormEvent, useContext, useRef } from 'react';
import { StoreContext } from '../stores/store';
import FoundRepos from './FoundRepos';
import { observer } from 'mobx-react-lite';
import { GET_USER_REPOS, SEARCH_REPOS } from '../graphql/queries';
import SearchBar from './SearchBar';

const RepositoryListPage = observer(() => {
	const store = useContext(StoreContext);

	const onSearch = (e: FormEvent, value: string) => {
		e.preventDefault();
		store.setSearch(value);
	};

	return (
		<div>
			<SearchBar onSearch={onSearch} />
			<FoundRepos
				query={store.searchText ? SEARCH_REPOS : GET_USER_REPOS}
				searchText={store.searchText}
			/>
		</div>
	);
});

export default RepositoryListPage;

import { FormEvent, useContext } from 'react';
import { StoreContext } from '../stores/store';
import FoundRepos from './FoundRepos';
import { observer } from 'mobx-react-lite';
import SearchBar from './SearchBar';
import Paginator from './Paginator';

const RepositoryListPage = observer(() => {
	const store = useContext(StoreContext);

	const onSearch = (e: FormEvent, value: string) => {
		e.preventDefault();
		store.setSearch(value);
	};

	const onPageChange = (target: number) => {
		if (target < store.currentPage) store.prevPage();
		if (target > store.currentPage) store.nextPage();
		store.setCurrentPage(target);
	};

	return (
		<div>
			<SearchBar onSearch={onSearch} />
			<Paginator
				current={store.currentPage}
				total={store.totalPages}
				onPageChange={onPageChange}
			/>
			<FoundRepos />
		</div>
	);
});

export default RepositoryListPage;

import { FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { StoreContext } from '../stores/store';
import FoundRepos from './FoundRepos';
import { observer } from 'mobx-react-lite';
import SearchBar from './SearchBar';
import Paginator from './Paginator';

const RepositoryListPage = observer(() => {
	const [checkPage, setCheckPage] = useState(true);
	const store = useContext(StoreContext);

	const onSearch = useCallback(
		(e: FormEvent, value: string) => {
			e?.preventDefault();
			store.setSearch(value);
		},
		[store]
	);

	const onPageChange = useCallback(
		(target: number) => {
			if (target > store.totalPages) return store.startPage();
			if (target < store.currentPage) store.prevPage(store.currentPage - target);
			if (target > store.currentPage) store.nextPage(target - store.currentPage);
			store.setCurrentPage(target);
		},
		[store]
	);

	useEffect(() => {
		if (store.initSearch) onSearch(null!, store.initSearch);
	}, [onSearch, store.initSearch]);

	useEffect(() => {
		if (checkPage && store.pageInfo && store.initPage !== 1) onPageChange(store.initPage);
		if (checkPage && store.pageInfo) setCheckPage(false);
	}, [checkPage, onPageChange, store.initPage, store.pageInfo]);

	return (
		<div>
			<SearchBar onSearch={onSearch} initValue={store.initSearch} />
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

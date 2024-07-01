import { QueryResult } from '@apollo/client';
import { TRelayPageInfo } from '@apollo/client/utilities/policies/pagination';
import { action, computed, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export class Store {
	data: QueryResult = null!;
	pageInfo: TRelayPageInfo = null!;
	searchText = '';
	resultCount = 0;
	currentPage = 1;
	amountPerPage = 10;
	before = '';
	after = '';

	constructor() {
		makeObservable(this, {
			data: observable,
			pageInfo: observable,
			searchText: observable,
			resultCount: observable,
			currentPage: observable,
			before: observable,
			after: observable,
			setData: action,
			setSearch: action,
			setResultCount: action,
			setCurrentPage: action,
			prevPage: action,
			nextPage: action,
			setPageInfo: action,
			totalPages: computed,
		});
	}

	get totalPages() {
		return Math.ceil(this.resultCount / this.amountPerPage);
	}

	setData(data: QueryResult) {
		this.data = data;
	}

	setSearch(searchText: string) {
		this.searchText = searchText;
	}

	setResultCount(resultCount: number) {
		this.resultCount = resultCount;
	}

	setCurrentPage(page: number) {
		this.currentPage = page;
	}

	prevPage() {
		this.before = this.pageInfo.hasPreviousPage ? this.pageInfo.startCursor : '';
		this.after = '';
	}

	nextPage() {
		this.after = this.pageInfo.hasNextPage ? this.pageInfo.endCursor : this.after;
		this.before = '';
	}

	setPageInfo(pageInfo: TRelayPageInfo) {
		this.pageInfo = pageInfo;
	}
}

export const StoreContext = createContext<Store>({} as Store);

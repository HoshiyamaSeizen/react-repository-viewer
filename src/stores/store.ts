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
	first: number | null = 10;
	last: number | null = null!;
	skip = false;

	constructor() {
		makeObservable(this, {
			data: observable,
			pageInfo: observable,
			searchText: observable,
			resultCount: observable,
			currentPage: observable,
			before: observable,
			after: observable,
			first: observable,
			last: observable,
			skip: observable,
			setData: action,
			setSearch: action,
			setCurrentPage: action,
			prevPage: action,
			nextPage: action,
			stopSkip: action,
			totalPages: computed,
		});
	}

	get totalPages() {
		return Math.ceil(this.resultCount / this.amountPerPage);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setData(data: any) {
		this.data = data;

		this.pageInfo = this.searchText
			? data.search.pageInfo
			: data.repositoryOwner.repositories.pageInfo;

		this.resultCount = this.searchText
			? data.search.repositoryCount
			: data.repositoryOwner.repositories.totalCount;

		if (this.skip) this.stopSkip();
	}

	setSearch(searchText: string) {
		this.searchText = searchText;
	}

	setCurrentPage(page: number) {
		this.currentPage = page;
	}

	prevPage(diff: number = 1) {
		this.before = this.pageInfo.hasPreviousPage ? this.pageInfo.startCursor : '';
		this.after = '';
		this.last = Math.max(10 * (diff - 1), 10);
		this.first = null;
		if (diff > 1) this.skip = true;
	}

	nextPage(diff: number = 1) {
		this.after = this.pageInfo.hasNextPage ? this.pageInfo.endCursor : this.after;
		this.before = '';
		this.first = Math.max(10 * (diff - 1), 10);
		this.last = null;
		if (diff > 1) this.skip = true;
	}

	stopSkip() {
		this.skip = false;
		if (this.first) this.nextPage();
		if (this.last) this.prevPage();
	}
}

export const StoreContext = createContext<Store>({} as Store);

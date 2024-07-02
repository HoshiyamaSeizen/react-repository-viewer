import { PageInfo, Query, Repository } from '@octokit/graphql-schema';
import { action, computed, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export class Store {
	data: Query = null!;
	repoData: Repository = null!;
	pageInfo: PageInfo = null!;
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
			repoData: observable,
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
			setRepoData: action,
			setSearch: action,
			setCurrentPage: action,
			prevPage: action,
			nextPage: action,
			stopSkip: action,
			startPage: action,
			totalPages: computed,
			initSearch: computed,
			initPage: computed,
		});
	}

	get totalPages() {
		return Math.ceil(this.resultCount / this.amountPerPage);
	}

	get initSearch() {
		return localStorage.getItem('search') || '';
	}

	get initPage() {
		return +(localStorage.getItem('page') || 1);
	}

	setData(data: Query) {
		this.data = data;
		this.pageInfo = data.search.pageInfo;

		if (this.skip) this.stopSkip();
		else {
			this.resultCount = data.search.repositoryCount;
		}
	}

	setRepoData(data: Repository) {
		this.repoData = data;
	}

	setSearch(searchText: string) {
		if (this.searchText !== searchText) this.startPage();
		this.searchText = searchText;
		localStorage.setItem('search', searchText);
	}

	setCurrentPage(page: number) {
		this.currentPage = page;
		localStorage.setItem('page', page.toString());
	}

	prevPage(diff: number = 1) {
		this.before = this.pageInfo.hasPreviousPage ? this.pageInfo.startCursor! : '';
		this.after = '';
		this.last = Math.max(10 * (diff - 1), 10);
		this.first = null;
		if (diff > 1) this.skip = true;
	}

	nextPage(diff: number = 1) {
		this.after = this.pageInfo.hasNextPage ? this.pageInfo.endCursor! : this.after;
		this.before = '';
		this.first = Math.max(10 * (diff - 1), 10);
		this.last = null;
		if (diff > 1) this.skip = true;
	}

	startPage() {
		this.after = '';
		this.before = '';
		this.first = 10;
		this.last = null;
		this.currentPage = 1;
	}

	stopSkip() {
		this.skip = false;
		if (this.first) this.nextPage();
		if (this.last) this.prevPage();
	}
}

export const StoreContext = createContext<Store>({} as Store);

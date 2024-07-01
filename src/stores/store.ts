import { QueryResult } from '@apollo/client';
import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export class Store {
	data: QueryResult | null = null;
	searchText: string = '';

	constructor() {
		makeObservable(this, {
			data: observable,
			searchText: observable,
			setData: action,
			setSearch: action,
		});
	}

	setData(data: QueryResult) {
		this.data = data;
	}

	setSearch(searchText: string) {
		this.searchText = searchText;
	}
}

export const StoreContext = createContext<Store>({} as Store);

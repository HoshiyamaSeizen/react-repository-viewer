import { QueryResult } from '@apollo/client';
import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export class Store {
	data: QueryResult | null = null;

	constructor() {
		makeObservable(this, {
			data: observable,
			setData: action,
		});
	}

	setData(data: QueryResult) {
		this.data = data;
	}
}

export const StoreContext = createContext<Store>({} as Store);

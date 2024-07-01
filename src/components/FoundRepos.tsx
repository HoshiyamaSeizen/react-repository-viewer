import { DocumentNode, useQuery } from '@apollo/client';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../stores/store';

interface Params {
	query: DocumentNode;
	searchText: string;
}

const FoundRepos = observer(({ query, searchText }: Params) => {
	const { loading, error, data } = useQuery(query, { variables: { searchText } });

	const store = useContext(StoreContext);

	useEffect(() => {
		if (!loading && !error) store.setData(data);
	}, [loading, error, data, store]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<pre>{JSON.stringify(store.data, null, 4)}</pre>
		</div>
	);
});

export default FoundRepos;

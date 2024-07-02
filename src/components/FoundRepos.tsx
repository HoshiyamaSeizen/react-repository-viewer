import { useQuery } from '@apollo/client';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../stores/store';
import { GET_USER_REPOS, SEARCH_REPOS } from '../graphql/queries';

const FoundRepos = observer(() => {
	const store = useContext(StoreContext);

	const { searchText, after, before, first, last, skip } = store;
	const query = searchText ? SEARCH_REPOS : GET_USER_REPOS;

	const { loading, error, data } = useQuery(query, {
		variables: { searchText, after, before, first, last },
	});

	useEffect(() => {
		if (!loading && !error) {
			store.setData(data);
		}
	}, [loading, error, data, store]);

	if (loading || skip) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<pre>{JSON.stringify(store.data, null, 4)}</pre>
		</div>
	);
});

export default FoundRepos;

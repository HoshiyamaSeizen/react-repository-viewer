import { useQuery } from '@apollo/client';
import { GET_USER_REPOS } from '../graphql/queries';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../stores/store';

const RepositoryListPage = observer(() => {
	const { loading, error, data } = useQuery(GET_USER_REPOS, { variables: {} });

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

export default RepositoryListPage;

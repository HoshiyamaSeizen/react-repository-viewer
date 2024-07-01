import { useQuery } from '@apollo/client';
import { GET_USER_REPOS } from '../graphql/queries';

const RepositoryListPage = () => {
	const { loading, error, data } = useQuery(GET_USER_REPOS, { variables: {} });

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</div>
	);
};

export default RepositoryListPage;

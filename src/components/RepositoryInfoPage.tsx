import { Link, useParams } from 'react-router-dom';
import { GET_REPO_INFO } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../stores/store';
import { observer } from 'mobx-react-lite';

const RepositoryInfoPage = observer(() => {
	const { owner, name } = useParams();
	const store = useContext(StoreContext);

	const { loading, error, data } = useQuery(GET_REPO_INFO, {
		variables: {
			owner,
			name,
		},
	});

	useEffect(() => {
		if (!loading && !error) {
			store.setRepoData(data.repository);
		}
	}, [loading, error, data, store]);

	if (loading || !store.repoData) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<Link to={'/'}>Back</Link>
			<div>
				<p>{name}</p>
				<p>Stars: {store.repoData.stargazerCount}</p>
				<p>Last commit: {store.repoData.pushedAt}</p>
			</div>
			<div>
				<p>{store.repoData.description}</p>
			</div>
			<div>
				<img width={64} src={store.repoData.owner?.avatarUrl} alt="pfp" />
				<p>{store.repoData.owner?.name}</p>
				<a href={store.repoData.owner?.url}>Link</a>
			</div>
			<div>
				<p>Languages</p>
				<ul>
					{store.repoData.languages?.nodes?.map((lang) => (
						<li key={lang?.name}>{lang?.name}</li>
					))}
				</ul>
			</div>
		</div>
	);
});

export default RepositoryInfoPage;

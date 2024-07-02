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

	// Set data from the query into storage
	useEffect(() => {
		if (!loading && !error) {
			store.setRepoData(data.repository);
		}
	}, [loading, error, data, store]);

	if (loading || !store.repoData) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="repository-info-page">
			<Link className="back-button" to={'/'}>
				Back
			</Link>
			<div className="info">
				<h2 className="name">{name}</h2>
				<p className="stars">{store.repoData.stargazerCount} ★</p>
				<p className="commit">Last commit: {store.repoData.pushedAt}</p>
			</div>
			<div className="description">
				<h2>Description</h2>
				<p>{store.repoData.description}</p>
			</div>
			<div className="owner">
				<h2>Owner</h2>
				<div className="user">
					<img src={store.repoData.owner?.avatarUrl} alt="pfp" />
					<a href={store.repoData.owner?.url} target="_blank">
						{store.repoData.owner?.login}
					</a>
				</div>
			</div>
			<div className="languages">
				<h2>Languages</h2>
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

import { useQuery } from '@apollo/client';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../stores/store';
import { SEARCH_REPOS, SKIP_SEARCH_REPOS } from '../graphql/queries';
import { Repository } from '@octokit/graphql-schema';
import { Link } from 'react-router-dom';

const FoundRepos = observer(() => {
	const store = useContext(StoreContext);

	const { searchText, after, before, first, last, skip, login } = store;
	const query = skip ? SKIP_SEARCH_REPOS : SEARCH_REPOS;

	const { loading, error, data } = useQuery(query, {
		variables: {
			searchText: searchText || `user:${login}`,
			after,
			before,
			first,
			last,
		},
	});

	// Set data from the query into storage
	useEffect(() => {
		if (!loading && !error) {
			store.setData(data);
		}
	}, [loading, error, data, store]);

	if (loading || skip) return <p className="loading">Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="repo-list-container">
			<div className="repo-list">
				{store.data?.search.edges?.map((edge) => {
					if (!edge) return;
					const repo = edge.node! as Repository;
					const name = `${repo.owner.login}/${repo.name}`;
					return (
						<div key={name} className="repo-item">
							<Link className="name" to={`repository/${name}`}>
								{name}
							</Link>
							<p className="stars">{repo.stargazerCount} ★</p>
							<p className="commit">Last commit: {repo.pushedAt}</p>
							<a className="url" href={repo.url} target="_blank">
								{repo.url}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
});

export default FoundRepos;

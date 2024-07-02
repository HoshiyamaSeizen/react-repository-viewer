import { gql } from '@apollo/client';

export const GET_VIEWER_LOGIN = gql`
	query getViewerLogin {
		viewer {
			login
		}
	}
`;

export const SEARCH_REPOS = gql`
	query SearchRepos(
		$searchText: String!
		$after: String!
		$before: String!
		$first: Int
		$last: Int
	) {
		search(
			query: $searchText
			type: REPOSITORY
			first: $first
			last: $last
			after: $after
			before: $before
		) {
			repositoryCount
			edges {
				node {
					... on Repository {
						name
						owner {
							login
						}
						stargazerCount
						pushedAt
						url
					}
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasPreviousPage
				hasNextPage
			}
		}
	}
`;

export const SKIP_SEARCH_REPOS = gql`
	query SkipSearchRepos(
		$searchText: String!
		$after: String!
		$before: String!
		$first: Int
		$last: Int
	) {
		search(
			query: $searchText
			type: REPOSITORY
			first: $first
			last: $last
			after: $after
			before: $before
		) {
			pageInfo {
				startCursor
				endCursor
				hasPreviousPage
				hasNextPage
			}
		}
	}
`;

export const GET_REPO_INFO = gql`
	query getRepoInfo($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) {
			name
			stargazerCount
			pushedAt
			owner {
				login
				avatarUrl
				url
			}
			languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
				nodes {
					name
				}
			}
			description
		}
	}
`;

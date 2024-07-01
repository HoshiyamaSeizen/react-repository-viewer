import { gql } from '@apollo/client';

//TODO: query to get login
//TODO: query to get repo info
//TODO: save to localstorage
//TODO: find certain fields

export const GET_USER_REPOS = gql`
	query GetUserRepos($after: String!, $before: String!) {
		repositoryOwner(login: "HoshiyamaSeizen") {
			repositories(ownerAffiliations: OWNER, first: 10, after: $after, before: $before) {
				totalCount
				nodes {
					name
				}
				pageInfo {
					startCursor
					endCursor
					hasPreviousPage
					hasNextPage
				}
			}
		}
	}
`;

export const SEARCH_REPOS = gql`
	query SearchRepos($searchText: String!, $after: String!, $before: String!) {
		search(query: $searchText, type: REPOSITORY, first: 10, after: $after, before: $before) {
			repositoryCount
			edges {
				node {
					... on Repository {
						name
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

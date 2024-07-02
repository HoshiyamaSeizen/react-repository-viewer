import { gql } from '@apollo/client';

//TODO: query to get login
//TODO: query to get repo info
//TODO: save to localstorage
//TODO: find certain fields

export const GET_USER_REPOS = gql`
	query GetUserRepos($after: String!, $before: String!, $first: Int, $last: Int) {
		repositoryOwner(login: "HoshiyamaSeizen") {
			repositories(
				ownerAffiliations: OWNER
				first: $first
				last: $last
				after: $after
				before: $before
			) {
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

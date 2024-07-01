import { gql } from '@apollo/client';

export const GET_USER_REPOS = gql`
	query GetUserRepos {
		repositoryOwner(login: "HoshiyamaSeizen") {
			repositories(ownerAffiliations: OWNER, first: 100) {
				totalCount
				nodes {
					name
				}
			}
		}
	}
`;

export const SEARCH_REPOS = gql`
	query SearchRepos($searchText: String!) {
		search(query: $searchText, type: REPOSITORY, first: 10) {
			edges {
				node {
					... on Repository {
						name
					}
				}
			}
		}
	}
`;

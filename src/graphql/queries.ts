import { gql } from '@apollo/client';

//TODO: query to get login
//TODO: save to localstorage

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
						url
						defaultBranchRef {
							target {
								... on Commit {
									history(first: 1) {
										edges {
											node {
												committedDate
											}
										}
									}
								}
							}
						}
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

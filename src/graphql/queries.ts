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

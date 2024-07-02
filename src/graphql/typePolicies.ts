import { TypePolicies } from '@apollo/client';

export const typePolicies: TypePolicies = {
	Query: {
		fields: {
			repositoryOwner: {
				merge(existing, incoming) {
					if (!existing) {
						return incoming;
					}

					if (!existing.repositories || !incoming.repositories) {
						return existing;
					}

					const mergedNodes = [...existing.repositories.nodes, ...incoming.repositories.nodes];

					const mergedObject = {
						...incoming,
						repositories: {
							...incoming.repositories,
							nodes: mergedNodes,
						},
					};

					return mergedObject;
				},
			},
		},
	},
};

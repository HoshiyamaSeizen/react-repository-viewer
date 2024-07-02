import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { typePolicies } from './typePolicies';

export default () => {
	const { VITE_GITHUB_TOKEN } = import.meta.env;

	const httpLink = createHttpLink({
		uri: 'https://api.github.com/graphql',
	});

	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: `Bearer ${VITE_GITHUB_TOKEN}`,
			},
		};
	});

	const client = new ApolloClient({
		cache: new InMemoryCache({
			typePolicies,
		}),
		link: authLink.concat(httpLink),
	});

	return client;
};

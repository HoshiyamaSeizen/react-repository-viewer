import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './components/App.tsx';
import init from './graphql/init.ts';
import './styles/index.sass';
import { GET_USER_REPOS } from './graphql/queries.ts';

const graphql = init();

// graphql
// 	.query({
// 		query: GET_USER_REPOS,
// 	})
// 	.then((result) => console.log(result.data));

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ApolloProvider client={graphql}>
		<App />
	</ApolloProvider>
);

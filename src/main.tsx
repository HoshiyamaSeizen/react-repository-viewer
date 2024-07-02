import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import init from './graphql/init.ts';
import { StoreContext, Store } from './stores/store.ts';
import './styles/index.sass';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { GET_VIEWER_LOGIN } from './graphql/queries.ts';

const graphql = init();

graphql.query({ query: GET_VIEWER_LOGIN }).then(({ data }) => {
	const store = new Store(data.viewer.login);

	ReactDOM.createRoot(document.getElementById('root')!).render(
		<ApolloProvider client={graphql}>
			<StoreContext.Provider value={store}>
				<RouterProvider router={router} />
			</StoreContext.Provider>
		</ApolloProvider>
	);
});

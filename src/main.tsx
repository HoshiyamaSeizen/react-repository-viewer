import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import init from './graphql/init.ts';
import './styles/index.sass';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';

const graphql = init();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ApolloProvider client={graphql}>
		<RouterProvider router={router} />
	</ApolloProvider>
);

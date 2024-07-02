import { createBrowserRouter } from 'react-router-dom';
import RepositoryListPage from './components/RepositoryListPage';
import ErrorPage from './components/ErrorPage';
import RepositoryInfoPage from './components/RepositoryInfoPage';

export const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <RepositoryListPage />,
			errorElement: <ErrorPage />,
		},
		{
			path: '/repository/:owner/:name',
			element: <RepositoryInfoPage />,
		},
	],
	{
		// basename is set in vite.config.ts and in github/workflows/deploy.yml as env
		basename: import.meta.env.VITE_BASENAME || '',
	}
);

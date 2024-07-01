import { createBrowserRouter } from 'react-router-dom';
import RepositoryListPage from './components/RepositoryListPage';
import ErrorPage from './components/ErrorPage';
import RepositoryInfoPage from './components/RepositoryInfoPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RepositoryListPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/repository/:id',
		element: <RepositoryInfoPage />,
	},
]);

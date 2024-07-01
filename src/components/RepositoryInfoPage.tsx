import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RepositoryInfoPage = () => {
	const params = useParams();

	useEffect(() => {
		console.log(params);
	}, [params]);

	return <div>RepositoryInfoPage</div>;
};

export default RepositoryInfoPage;

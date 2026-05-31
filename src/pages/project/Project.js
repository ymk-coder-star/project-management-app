import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';

//styles
import './Project.css';

export default function Project() {
	const { id } = useParams();

	const { doc, error } = useDocument('projects', id);

	if (error) {
		return <div className="error">{error}</div>;
	}
	if (!doc) {
		return <div className="loading">loading...</div>;
	}

	return (
		<div className="project-details">
			<ProjectSummary project={doc} />
			<ProjectComments project={doc} />
		</div>
	);
}

import ProjectsFilter from './ProjectsFilter';
import ProjectsList from '../../components/ProjectsList';
import { useCollection } from '../../hooks/useCollection';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

//styles
import './Dashboard.css';

export default function Dashboard() {
	const { user } = useAuthContext();
	const { docs, error } = useCollection('projects');
	const [currentFilter, setCurrentFilter] = useState('all');

	const changeFilter = (newFilter) => {
		setCurrentFilter(newFilter);
	};

	const projects = docs
		? docs.filter((doc) => {
				switch (currentFilter) {
					case 'all':
						return true;
					case 'mine':
						let assignedToMe = false;
						doc.assignedUsersList.forEach((u) => {
							if (u.id === user.uid) {
								assignedToMe = true;
							}
						});
						return assignedToMe;
					case 'design':
					case 'development':
					case 'sales':
					case 'marketing':
						return currentFilter === doc.category;
					default:
						return true;
				}
			})
		: null;

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{error && <p className="error">{error}</p>}
			{docs && (
				<ProjectsFilter
					currentFilter={currentFilter}
					changeFilter={changeFilter}
				/>
			)}
			{projects && <ProjectsList projects={projects} />}
		</div>
	);
}

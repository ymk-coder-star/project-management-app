import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useHistory } from 'react-router-dom';

//styles
import './Create.css';

const options = [
	{ value: 'development', label: 'Development' },
	{ value: 'design', label: 'Design' },
	{ value: 'sales', label: 'Sales' },
	{ value: 'marketing', label: 'Marketing' },
];

export default function Create() {
	const history = useHistory();
	const { addDocument, response } = useFirestore('projects');
	const { docs } = useCollection('users');
	const [users, setUsers] = useState([]);
	const { user } = useAuthContext();

	//form fields
	const [name, setName] = useState('');
	const [details, setDetails] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [category, setCategory] = useState('');
	const [assignedUsers, setAssignedUsers] = useState([]);
	const [formError, setFormError] = useState([]);

	useEffect(() => {
		setFormError(null);

		if (docs) {
			const options = docs.map((user) => {
				return { value: user, label: user.displayName };
			});
			setUsers(options);
		}
	}, [docs]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError(null);

		if (!category) {
			setFormError('Please select a project category');
			return;
		}
		if (assignedUsers.length < 1) {
			setFormError('Please assign project to at least 1 user');
			return;
		}

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		};
		const assignedUsersList = assignedUsers.map((u) => {
			return {
				displayName: u.value.displayName,
				photoURL: u.value.photoURL,
				id: u.value.id,
			};
		});

		const project = {
			name,
			details,
			dueDate: timestamp.fromDate(new Date(dueDate)),
			category: category.value,
			assignedUsersList,
			comments: [],
			createdBy,
		};

		await addDocument(project);

		if (!response.error) {
			history.push('/');
		}
	};

	return (
		<div className="create-form">
			<h2 className="page-title">Create a new project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project name:</span>
					<input
						required
						type="text"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</label>
				<label>
					<span>Project details:</span>
					<textarea
						required
						type="text"
						onChange={(e) => setDetails(e.target.value)}
						value={details}
					/>
				</label>
				<label>
					<span>Due date:</span>
					<input
						required
						type="date"
						onChange={(e) => setDueDate(e.target.value)}
						value={dueDate}
					/>
				</label>
				<label>
					<span>Category:</span>
					<Select
						options={options}
						onChange={(option) => setCategory(option)}
					/>
				</label>
				<label>
					<span>Assign to:</span>
					<Select
						options={users}
						onChange={(option) => setAssignedUsers(option)}
						isMulti
					/>
				</label>
				<button className="btn">Create project</button>
				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	);
}

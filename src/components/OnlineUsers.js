import { useCollection } from '../hooks/useCollection';

//styles
import './OnlineUsers.css';

//components
import Avatar from './Avatar';

export default function OnlineUsers() {
	const { error, docs } = useCollection('users');

	return (
		<div className="user-list">
			<h2>All users</h2>
			{error && <div className="error">{error}</div>}
			{docs &&
				docs.map((user) => (
					<div key={user.id} className="user-list-item">
						{user.isOnline && <span className="online-users" />}
						<span>{user.displayName}</span>
						<Avatar src={user.photoURL} />
					</div>
				))}
		</div>
	);
}

import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { timestamp } from '../../firebase/config';
import { useFirestore } from '../../hooks/useFirestore';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '../../components/Avatar';

export default function ProjectComments({ project }) {
	const { updateDocument, response } = useFirestore('projects');
	const [newComment, setNewComment] = useState('');
	const { user } = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const commentToAdd = {
			content: newComment,
			displayName: user.displayName,
			photoURL: user.photoURL,
			createdAt: timestamp.fromDate(new Date()),
			id: Math.random(),
		};

		await updateDocument(project.id, {
			comments: [...project.comments, commentToAdd],
		});

		if (!response.error) {
			setNewComment('');
		}
	};

	return (
		<div className="project-comments">
			<h4>Project Comments</h4>

			<ul>
				{project.comments.length > 0 &&
					project.comments.map((comment) => (
						<li key={comment.id}>
							<div className="comment-author">
								<Avatar src={comment.photoURL} />
								<p>{comment.displayName}</p>
							</div>
							<div className="comment-date">
								{formatDistanceToNow(comment.createdAt.toDate(), {
									addSuffix: true,
								})}
							</div>
							<div className="comment-content">
								<p>{comment.content}</p>
							</div>
						</li>
					))}
			</ul>

			<form className="add-comments" onSubmit={handleSubmit}>
				<label>
					<span>Add a comment:</span>
					<textarea
						required
						onChange={(e) => setNewComment(e.target.value)}
						value={newComment}
					/>
				</label>
				<button className="btn">Add Comment</button>
			</form>
		</div>
	);
}

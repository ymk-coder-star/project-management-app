import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

//styles
import './Signup.css';

export default function Signup() {
	const [displayName, setDisplayname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const [thumbnailError, setThumbnailError] = useState(null);
	const { signup, error, isPending } = useSignup();

	const handleFileChange = (e) => {
		setThumbnailError(null);
		let selected = e.target.files[0];

		if (!selected) {
			setThumbnailError('Please select a file');
			return;
		}
		if (!selected.type.includes('image')) {
			setThumbnailError('File type must be an image');
			return;
		}
		if (selected.size > 100000) {
			setThumbnailError('Selected file must be smaller than 100KB');
			return;
		}

		setThumbnailError(null);
		setThumbnail(null);

		setThumbnail(selected);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		signup(email, password, displayName, thumbnail);
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Sign up</h2>
			<label>
				<span>Email:</span>
				<input
					required
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>Password:</span>
				<input
					required
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>
			<label>
				<span>Display name:</span>
				<input
					required
					type="text"
					onChange={(e) => setDisplayname(e.target.value)}
					value={displayName}
				/>
			</label>
			<label>
				<span>Profile thumbnail:</span>
				<input required type="file" onChange={handleFileChange} />
				{thumbnailError && <div className="error">{thumbnailError}</div>}
			</label>
			{!isPending && <button className="btn">Create account</button>}
			{isPending && (
				<button className="btn" disabled>
					loading...
				</button>
			)}
			{error && <div className="error">{error}</div>}
		</form>
	);
}

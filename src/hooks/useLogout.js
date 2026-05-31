import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from './useAuthContext';
import { projectAuth, projectFirestore } from '../firebase/config';

export const useLogout = () => {
	const isCancelled = useRef(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch, user } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);
		isCancelled.current = false;

		try {
			const uid = user.uid;
			await projectFirestore
				.collection('users')
				.doc(uid)
				.update({ isOnline: false });

			await projectAuth.signOut();

			dispatch({ type: 'LOGOUT' });

			if (!isCancelled.current) {
				setError(null);
				setIsPending(false);
			}
		} catch (err) {
			if (!isCancelled.current) {
				console.log(err.message);
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => (isCancelled.current = true);
	}, []);

	return { logout, error, isPending };
};

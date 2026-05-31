import { useEffect, useRef, useState } from 'react';
import {
	projectAuth,
	projectFirestore,
	projectStorage,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const isCancelled = useRef(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName, thumbnail) => {
		setError(null);
		setIsPending(true);
		isCancelled.current = false;

		try {
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);

			if (!res) {
				throw new Error('Could not complete signup');
			}

			//upload image
			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail}`;
			const img = await projectStorage.ref(uploadPath).put(thumbnail);
			const imgUrl = await img.ref.getDownloadURL();

			//update user info
			await res.user.updateProfile({ displayName, photoURL: imgUrl });

			//set to db the public user data
			await projectFirestore.collection('users').doc(res.user.uid).set({
				isOnline: true,
				displayName,
				photoURL: imgUrl,
			});

			dispatch({ type: 'LOGIN', payload: res.user });

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

	return { signup, error, isPending };
};

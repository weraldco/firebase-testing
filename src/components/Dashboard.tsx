import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { auth, db } from './firebase';

type UserDetailsT = {
	email: string;
	firstName: string;
	lastName: string;
};
export default function Dashboard() {
	const [userDetails, setUserDetails] = useState<UserDetailsT>();
	const navigate = useNavigate();
	async function fetchUserData() {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const docRef = doc(db, 'Users', user.uid);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					console.log('User found!');
					const userData = docSnap.data() as UserDetailsT;
					setUserDetails(userData);
					console.log(docSnap.data());
				} else {
					console.log('User is not logged in');
				}
			}
		});
	}

	useEffect(() => {
		fetchUserData();
	}, []);

	async function handleLogout() {
		try {
			await auth.signOut();
			if (auth.currentUser === null) {
				console.log(auth.currentUser);
				navigate('/login');
			}
		} catch (err) {
			console.log(err.message);
		}
	}
	return (
		<div>
			{userDetails ? (
				<div className="flex flex-1 flex-col items-center justify-center">
					<h3>Welcome {userDetails?.firstName}</h3>
					<div>
						<p>Email: {userDetails.email}</p>
						<p>FirstName: {userDetails.firstName}</p>
						<p>LastName: {userDetails.lastName}</p>
					</div>
					<button
						className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-500 duration-200"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

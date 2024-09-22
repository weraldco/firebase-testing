import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';

export default function RegistrationForm() {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const user = auth.currentUser;
			console.log(user);
			if (user) {
				await setDoc(doc(db, 'Users', user.uid), {
					email: user.email,
					firstName: firstName,
					lastName: lastName,
				});
			}
			console.log('User Registered Successfully.');
		} catch (err) {
			console.log(err.message);
		}
	}
	return (
		<div className="flex flex-1 flex-col gap-4 p-5 items-center justify-center">
			<form
				className="flex flex-col place-content-center  gap-4 w-[250px]"
				onSubmit={handleRegister}
			>
				<h1 className="text-center font-semibold text-3xl">
					Registration Form
				</h1>
				<input
					className="border border-solid border-blue-500 px-4 py-2 rounded-full"
					type="text"
					placeholder="First name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<input
					className="border border-solid border-blue-500 px-4 py-2 rounded-full"
					type="text"
					placeholder="Last name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<input
					className="border border-solid border-blue-500 px-4 py-2 rounded-full"
					type="email"
					placeholder="Email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="border border-solid border-blue-500 px-4 py-2 rounded-full"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-blue-500 px-4 py-2 text-white rounded-full hover:opacity-80 duration-200"
				>
					Sign Up
				</button>
				<label className="text-right text-sm">
					Already registered?
					<Link to="/login" className="text-blue-400">
						Login here
					</Link>
				</label>
			</form>
		</div>
	);
}

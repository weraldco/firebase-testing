import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';

export default function LoginForm() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log('User logged in successfully');
			navigate('/');
		} catch (err) {
			console.log(err.message);
		}
	}
	return (
		<div className="flex flex-1 flex-col gap-4 p-5 items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col place-content-center  gap-4 w-[250px]"
			>
				<h1 className="text-center font-semibold text-3xl">Login Form</h1>
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
					Login
				</button>
				<label className="text-right text-sm">
					Not Register?{' '}
					<Link to="/register" className="text-blue-400">
						Sign up here
					</Link>
				</label>
			</form>
		</div>
	);
}

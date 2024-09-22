import { Route, Routes } from 'react-router';
import Dashboard from './components/Dashboard';
import LoginForm from './components/Login';
import RegistrationForm from './components/Register';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/register" element={<RegistrationForm />} />
			</Routes>
		</>
	);
}

export default App;

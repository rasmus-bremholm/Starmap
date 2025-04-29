import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import EditForm from "../components/EditForm";

export default function EditView() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// Do nothing
	}, []);

	return (
		<>
			<main>{!isAuthenticated ? <LoginForm onLogin={() => setIsAuthenticated(true)} /> : <EditForm />}</main>
		</>
	);
}

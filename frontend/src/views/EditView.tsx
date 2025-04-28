import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import EditForm from "../components/EditForm";

export default function EditView() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		console.log("Use Effect");
	});

	return (
		<>
			<main>
				(!isAuthenticated ? <LoginForm /> : <EditForm />)
			</main>
		</>
	);
}

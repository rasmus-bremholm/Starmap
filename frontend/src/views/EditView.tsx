import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import EditForm from "../components/EditForm";
import { useParams } from "react-router-dom";

export default function EditView() {
	const [isAuthenticated, setIsAuthenticated] = useState(true); // <-- ÄNDRA NÄR VI ÄR KLARA
	const action = useParams();

	useEffect(() => {
		// Do nothing, for now.
	}, []);

	return (
		<>
			<main>{!isAuthenticated ? <LoginForm onLogin={() => setIsAuthenticated(true)} /> : <EditForm action={action.action} />}</main>
		</>
	);
}

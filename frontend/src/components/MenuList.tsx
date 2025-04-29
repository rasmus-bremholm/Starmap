import { Link } from "react-router-dom";

export default function MenuList() {
	return (
		<>
			<aside>
				<Link to={"/edit?"}>Edit Planet</Link>
				<Link to={"/edit?"}>Add Planet</Link>
				<Link to={"/edit?"}>Delete Planet</Link>
			</aside>
		</>
	);
}

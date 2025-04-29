import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.aside`
	position: absolute;
	top: 10%;
	right: 10%;
	display: flex;
	flex-direction: column;
	padding: 2rem;
	background-color: var(--panel-color-focus);
	border-radius: var(--border-radius);
`;

export default function MenuList() {
	return (
		<>
			<Menu>
				<Link to={"/edit?"}>
					<div className='link-item'>
						<span className='material-symbols-outlined'>edit</span>Edit Planet
					</div>
				</Link>
				<Link to={"/edit?"}>
					<div className='link-item'>
						<span className='material-symbols-outlined'>add</span>Add Planet
					</div>
				</Link>
				<Link to={"/edit?"}>
					<div className='link-item'>
						<span className='material-symbols-outlined'>delete</span> Delete Planet
					</div>
				</Link>
			</Menu>
		</>
	);
}

import styled from "styled-components";

const SideBarNav = styled.nav`
	padding: 1rem;
	display: grid;
	grid-template-columns: auto;
`;

export default function SidebarNavigation() {
	return (
		<>
			<SideBarNav>
				<div>
					<h1>StarMap</h1>
					<h3>Your Guide to a Galaxy</h3>
				</div>
			</SideBarNav>
		</>
	);
}

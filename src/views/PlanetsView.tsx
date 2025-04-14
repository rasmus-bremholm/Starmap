import SidebarNavigation from "../components/SidebarNavigation";
import styled from "styled-components";

const MainGrid = styled.div`
	display: grid;
	min-height: 100svh;
	grid-template-columns: 300px auto;
`;

export default function PlanetsView() {
	return (
		<MainGrid>
			<SidebarNavigation />
			<h1>PlanetsView</h1>
		</MainGrid>
	);
}

import SidebarNavigation from "../components/SidebarNavigation";
import PlanetInfo from "../components/PlanetInfo";
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
			<PlanetInfo id={1} />
		</MainGrid>
	);
}

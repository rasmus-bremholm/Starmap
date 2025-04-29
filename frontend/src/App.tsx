import { Outlet } from "react-router-dom";
import "./App.css";
import SidebarNavigation from "./components/SidebarNavigation";
import styled from "styled-components";

const MainGrid = styled.div`
	display: grid;
	min-height: 100svh;
	grid-template-columns: 300px auto;
`;

function App() {
	return (
		<>
			<MainGrid>
				<SidebarNavigation />
				<Outlet />
			</MainGrid>
		</>
	);
}

export default App;

import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlanetsList } from "../utils/types";

const SideBarNav = styled.nav`
	padding: 1rem;
	display: grid;
	grid-template-columns: auto;

	// Colors
	background-color: var(--panel-color);
`;

const PlanetsNav = styled.div`
	display: flex;
	flex-direction: column;
`;

export default function SidebarNavigation() {
	const [planetList, setPlanetList] = useState<PlanetsList>();

	useEffect(() => {
		fetch("http://localhost:1337/planets-list")
			.then((response) => response.json())
			.then((result) => {
				setPlanetList(result);
			});
	});

	return (
		<SideBarNav>
			<div>
				<h1>StarMap</h1>
				<h3>Your Guide to a Galaxy</h3>
			</div>
			<PlanetsNav>
				{planetList?.map((planet) => (
					<li key={planet.id}></li>
				))}
			</PlanetsNav>
		</SideBarNav>
	);
}

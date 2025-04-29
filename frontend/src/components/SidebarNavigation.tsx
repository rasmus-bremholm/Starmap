import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlanetData } from "../utils/types";
import { Link } from "react-router-dom";

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
	const [planetList, setPlanetList] = useState<PlanetData[]>();

	useEffect(() => {
		fetch("http://localhost:1337/planets-list")
			.then((response) => response.json())
			.then((result) => {
				setPlanetList(result);
				console.log(planetList);
			});
	}, []);

	return (
		<SideBarNav>
			<div>
				<h1>StarMap</h1>
				<h3>Your Guide to a Galaxy</h3>
			</div>
			<PlanetsNav>
				{planetList?.map((planet) => (
					<Link key={planet.id} to={String(planet.id)}>
						<li>
							<h3>{planet.title}</h3>
						</li>
					</Link>
				))}
			</PlanetsNav>
		</SideBarNav>
	);
}

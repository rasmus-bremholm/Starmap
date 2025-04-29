import { useEffect, useState } from "react";
import { PlanetData } from "../utils/types";

interface PlanetInfoProps {
	id: number;
}

export default function PlanetInfo(props: PlanetInfoProps) {
	const [planet, setPlanet] = useState<PlanetData>();

	useEffect(() => {
		fetch(`http://localhost:1337/planet/${props.id}`)
			.then((response) => response.json())
			.then((result) => {
				setPlanet(result);
			});
	}, []);

	return (
		<>
			<main>
				<h1>System</h1>
				<img src={planet?.image} alt={planet?.title} />
				<div>
					<h2>{planet?.title}</h2>
					<p>{planet?.desc}</p>
				</div>
				<div>
					<h3>Overview</h3>
					<div>
						<p>Population: </p>
						<p>{planet?.population}</p>
					</div>
					<div>
						<p>System: </p>
						<p>{planet?.system}</p>
					</div>
					<div>
						<p>Diameter: </p>
						<p>{planet?.diameter}</p>
					</div>
					<div>
						<p>Mass: </p>
						<p>{planet?.mass}</p>
					</div>
					<div>
						<p>Temperature: </p>
						<p>{planet?.temperature}</p>
					</div>
				</div>
			</main>
		</>
	);
}

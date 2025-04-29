import { useEffect, useState } from "react";
import { PlanetData } from "../utils/types";
import MenuList from "./MenuList";

interface PlanetInfoProps {
	id: number;
}

export default function PlanetInfo(props: PlanetInfoProps) {
	const [planet, setPlanet] = useState<PlanetData>();

	useEffect(() => {
		fetch(`http://localhost:1337/planet/${props.id}`)
			.then((response) => response.json())
			.then((result) => {
				//console.log(result);
				setPlanet(result);
			});
	}, [props.id]);

	return (
		<>
			<main className='planet-info-container'>
				<div className='planet-info-wrapper'>
					<h1>System</h1>
					<div className='planet-image-container'>
						<img src={planet?.image} alt={planet?.title} className='planet-image' />
					</div>
					<div className='planet-info-title-container'>
						<h2 className='planet-title'>{planet?.title}</h2>
						<p className='planet-desc'>{planet?.desc}</p>
					</div>
					<h3>Overview</h3>
					<div className='stats-container'>
						<div>
							<p className='attribute-name'>Population: </p>
							<p className='attribute-value'>{planet?.population}</p>
						</div>
						<div>
							<p className='attribute-name'>System Sector: </p>
							<p className='attribute-value'>{planet?.system}</p>
						</div>
						<div>
							<p className='attribute-name'>Diameter: </p>
							<p className='attribute-value'>{planet?.diameter}</p>
						</div>
						<div>
							<p className='attribute-name'>Mass: </p>
							<p className='attribute-value'>{planet?.mass}</p>
						</div>
						<div>
							<p className='attribute-name'>Temperature: </p>
							<p className='attribute-value'>{planet?.temperature}</p>
						</div>
					</div>
				</div>
				<MenuList />
			</main>
		</>
	);
}

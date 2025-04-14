import { useEffect, useState } from "react";
import { PlanetData, PlanetsList } from "../utils/types";

interface PlanetInfoProps {
	id: number;
}

export default function PlanetInfo(props: PlanetInfoProps) {
	const [planets, setPlanets] = useState<PlanetsList>();

	useEffect(() => {
		console.log("Vi Fetchar");
	});

	return (
		<>
			<main></main>
		</>
	);
}

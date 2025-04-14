import { useEffect, useState } from "react";
import { PlanetData } from "../utils/types";

interface PlanetInfoProps {}

export default function PlanetInfo(props: PlanetInfoProps) {
	const [planets, setPlanets] = useState<PlanetData>();

	useEffect(() => {
		console.log("Vi Fetchar");
	});

	return (
		<>
			<main></main>
		</>
	);
}

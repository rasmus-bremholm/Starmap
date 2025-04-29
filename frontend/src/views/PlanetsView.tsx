import PlanetInfo from "../components/PlanetInfo";
import { useParams } from "react-router-dom";

export default function PlanetsView() {
	const { id } = useParams();
	// Bara så att jag har ett default värde.
	const planetId = id ? parseInt(id) : 1;

	return <PlanetInfo id={planetId} />;
}

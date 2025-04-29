import styled from "styled-components";
import { useState, useEffect } from "react";
import type { PlanetData } from "../utils/types";

interface EditActionProps {
	action: string | undefined;
}

const EditContainer = styled.main`
	height: 100%;
`;

export default function EditForm(action: EditActionProps) {
	const [editAction, setEditAction] = useState(action.action);
	const [planetList, setPlanetList] = useState<PlanetData[]>();
	const [activePlanet, setActivePlanet] = useState("");

	const actions = ["edit", "add", "delete"];

	useEffect(() => {
		fetch("http://localhost:1337/planets-list")
			.then((response) => response.json())
			.then((result) => {
				setPlanetList(result);
			});
	}, []);

	return (
		<main className='planet-info-container'>
			<EditContainer>
				{editAction && <h1>{editAction} Planet</h1>}
				<div>
					<form>
						<label htmlFor='select-planet'>Choose Planet:</label>
						<select name='select-planet' onChange={(event) => setActivePlanet(event.target.value)} value={activePlanet}>
							{planetList?.map((planet) => (
								<option>{planet.title}</option>
							))}
						</select>
						<label htmlFor='select-action'>Change Action</label>
						{actions.map((action) => (
							<label key={action} htmlFor={action}>
								<input
									type='radio'
									name='select-action'
									id={action}
									checked={action === editAction}
									onChange={(event) => setEditAction(event.target.value)}
								/>
								{action}
							</label>
						))}
					</form>
				</div>
			</EditContainer>
		</main>
	);
}

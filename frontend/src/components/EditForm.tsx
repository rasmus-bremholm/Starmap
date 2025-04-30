import styled from "styled-components";
import { useState, useEffect } from "react";
import type { PlanetData } from "../utils/types";

interface EditActionProps {
	action: string | undefined;
}

const EditContainer = styled.div`
	height: 100%;

	form {
		display: grid;
		grid-template-columns: auto;
		gap: 0.5rem;

		#select-planet-container {
			display: grid;
			align-items: center;
			padding: 0.3rem;
		}
		#select-action-container {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}
	}
`;

export default function EditForm(action: EditActionProps) {
	const [editAction, setEditAction] = useState(action.action);
	const [planetList, setPlanetList] = useState<PlanetData[]>();
	const [activePlanet, setActivePlanet] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);

	// Form Variables
	const [planetTitle, setPlanetTitle] = useState("default");
	const [planetDescription, setPlanetDescription] = useState("lorem");
	const [planetSystem, setPlanetSystem] = useState(1);
	const [planetPopulation, setPlanetPopulation] = useState<number>(1000);
	const [planetDiameter, setPlanetDiameter] = useState(1000);
	const [planetMass, setPlanetMass] = useState(1000);
	const [planetTemperature, setPlanetTemperature] = useState(20);
	const [planetImage, setPlanetImage] = useState("./default.png");

	const actions = ["edit", "add", "delete"];
	const handleSubmit = async () => {
		switch (editAction) {
			case "edit":
				break;
			case "add":
				{
					fetch(`http://localhost:1337/planet/${planetList?.filter((planet) => planet.title === activePlanet)}`, {
						method: "POST",
						body: JSON.stringify({
							title: planetTitle,
							desc: planetDescription,
							population: planetPopulation,
							system: planetSystem,
							image: planetImage,
							diameter: planetDiameter,
							mass: planetMass,
							temperature: planetTemperature,
						}),
					})
						.then((response) => response.json())
						.then((result) => {
							console.log(result);
						});
				}

				break;
			case "delete":
				break;
		}
	};

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
					<form onSubmit={handleSubmit}>
						<div id='select-planet-container'>
							<label htmlFor='select-planet'>Choose Planet:</label>
							<select name='select-planet' onChange={(event) => setActivePlanet(event.target.value)} value={activePlanet}>
								{planetList?.map((planet) => (
									<option key={planet.id}>{planet.title}</option>
								))}
							</select>
						</div>
						<div id='select-action-container'>
							<label htmlFor='select-action'>Change Action</label>
							{actions.map((action) => (
								<label key={action} htmlFor={action}>
									<input
										type='radio'
										name='select-action'
										id={action}
										checked={action === editAction}
										value={action}
										onChange={(event) => setEditAction(event.target.value)}
									/>
									{action}
								</label>
							))}
						</div>

						{editAction === "delete" ? (
							<div>
								<p>Are you sure?</p>
							</div>
						) : (
							<div>
								<div className='title-container'>
									<label htmlFor='title'>Title:</label>
									<input name='title' type='text' />
								</div>
								<div className='desc-container'>
									<label htmlFor='description'>Description:</label>
									<textarea name='description'></textarea>
								</div>
								<div className='population-container'>
									<label htmlFor='population'>Population:</label>
									<input name='population' type='number' />
								</div>
								<div className='diameter-container'>
									<label htmlFor='diameter'>Diameter:</label>
									<input name='diameter' type='number' />
								</div>
								<div className='mass-container'>
									<label htmlFor='mass'>Mass:</label>
									<input name='mass' type='number' />
								</div>
								<div className='temperature-container'>
									<label htmlFor='temperature'>Temperature:</label>
									<input name='temperature' type='number' />
								</div>
								<div className='image-container'>
									<label htmlFor='image'>Image:</label>
									<input name='image' type='text' disabled={true} />
								</div>
							</div>
						)}
						<input type='submit' value='Commit' disabled={isDisabled} />
					</form>
				</div>
			</EditContainer>
		</main>
	);
}

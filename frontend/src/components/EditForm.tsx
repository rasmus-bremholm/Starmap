import styled from "styled-components";
import { useState, useEffect } from "react";
import type { PlanetData, PlanetFormData } from "../utils/types";
import { usePlanetContext } from "../utils/planetContext";

interface EditActionProps {
	action: string | undefined;
}

const EditContainer = styled.div`
	max-width: 600px;

	.form-container {
		padding: 1rem;
	}

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
			gap: 0.5rem;
		}
		.title-container,
		.desc-container,
		.population-container,
		.diameter-container,
		.mass-container,
		.temperature-container,
		.image-container {
			display: grid;
			grid-template-columns: 20% auto;
			justify-items: left;
			padding-bottom: 1rem;
		}
	}
`;

export default function EditForm(action: EditActionProps) {
	const [editAction, setEditAction] = useState(action.action);
	const [planetList, setPlanetList] = useState<PlanetData[]>([]);
	const [activePlanet, setActivePlanet] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);
	const [activePlanetId, setActivePlanetId] = useState<number | undefined>();
	const { setShouldRefetch } = usePlanetContext();
	const [fulRefresh, setFulRefresh] = useState<Response>();

	// Form Variables
	const [planet, setPlanet] = useState<PlanetFormData>({
		system: 1,
		title: "default",
		desc: "lorem",
		population: 1000,
		diameter: 1000,
		mass: 1000,
		temperature: 20,
		image: "./default.png",
		image_alt: "./default.png",
		texture: "./texture.png",
	});

	const refetch = (val: boolean) => {
		// Eftersom jag repeterar mig mycket annars skrev jag en lite funktion för att göra min context refresh.
		setShouldRefetch(val);
		// Sätter en timeout så att shouldRefetch sätts till false, ifall ja gör andra ändringar.
		setTimeout(() => setShouldRefetch(false), 100);
	};

	const actions = ["edit", "add", "delete"];
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		switch (editAction) {
			case "edit":
				{
					try {
						const response = await fetch(`http://localhost:1337/planet/${activePlanetId}`, {
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(planet),
						});
						setFulRefresh(response);
						refetch(true);
						if (!response.ok) {
							throw new Error(`Server error: ${response.status}`);
						}
					} catch (error) {
						console.error("Failed to edit planet", error);
					}
				}
				break;
			case "add":
				{
					try {
						const response = await fetch(`http://localhost:1337/planet/`, {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(planet),
						});
						refetch(true);
						setShouldRefetch(true);

						if (!response.ok) {
							throw new Error(`Server error: ${response.status}`);
						}
					} catch (error) {
						console.error("Failed to create planet", error);
					}
				}
				break;
			case "delete":
				{
					try {
						const response = await fetch(`http://localhost:1337/planet/${activePlanetId}`, {
							method: "DELETE",
							headers: { "Content-Type": "application/json" },
						});

						setFulRefresh(response);
						refetch(true);
						if (!response.ok) {
							throw new Error(`Server error: ${response.status}`);
						}
					} catch (error) {
						console.error("Failed to delete planet", error);
					}
				}
				break;
		}
	};

	useEffect(() => {
		// Denna failar när vi tar bort en planet, förståligt, men vet inte hur ja ska fixa det.
		// can't access property "id", getActivePlanetId[0] is undefined
		if (activePlanet) {
			const getActivePlanetId = planetList?.filter((planet) => planet.title === activePlanet);
			// Men vad händer i fallen som getActivePlanet är null? Som att vi typ deletar.
			// Vi behöver kolla en ifsats här och typ
			if (getActivePlanetId && getActivePlanetId.length > 0) {
				setActivePlanetId(getActivePlanetId[0].id);
				console.log(getActivePlanetId![0].id);
			} else {
				// Denna triggas alltid på delete.
				// Men jag får i alla fall inte några errors och planeten deletas som den ska.
				// Jag skulle behöva sätta om activeplanet tror jag till något som finns. Så kanske en ny filer minus den planeten vi tog bort.
				setActivePlanet(activePlanet);
				// Fick uppdatera texten så att updates också stämmer.
				console.log("Planeten Ändrades");
			}
		}
	}, [activePlanet, planetList]);

	useEffect(() => {
		fetch("http://localhost:1337/planets-list")
			.then((response) => response.json())
			.then((result) => {
				setPlanetList(result);
			});
	}, [fulRefresh]);

	// istället för ful refresh. byt namn på den.

	useEffect(() => {
		//Validate inputs
		if ((planet.title.length > 0 && planet.title !== "default") || planet.desc.length > 0 || planet.population > 0 || planet.temperature) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [planet]);

	return (
		<main className='planet-info-container'>
			<EditContainer>
				{editAction && <h1>{editAction} Planet</h1>}
				<div className='form-container'>
					<form onSubmit={handleSubmit}>
						{(editAction === "edit" || editAction === "delete") && (
							<div id='select-planet-container'>
								<label htmlFor='select-planet'>Choose Planet:</label>
								<select name='select-planet' onChange={(event) => setActivePlanet(event.target.value)} value={activePlanet}>
									{planetList?.map((planet) => (
										<option key={planet.id}>{planet.title}</option>
									))}
								</select>
							</div>
						)}

						<div id='select-action-container'>
							<label htmlFor='select-action'>Change Action</label>
							{actions.map((action) => (
								<label className='action-label' key={action} htmlFor={action}>
									<input
										type='radio'
										name='select-action'
										id={action}
										checked={action === editAction}
										value={action}
										onChange={(event) => setEditAction(event.target.value)}
									/>
									{" " + action}
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
									<input
										name='title'
										type='text'
										onChange={(event) => setPlanet({ ...planet, [event.target.name]: event.target.value })}
										value={planet.title}
									/>
								</div>
								<div className='desc-container'>
									<label htmlFor='description'>Description:</label>
									<textarea
										name='desc'
										onChange={(event) => setPlanet({ ...planet, [event.target.name]: event.target.value })}
										value={planet.desc}></textarea>
								</div>
								<div className='population-container'>
									<label htmlFor='population'>Population:</label>
									<input
										name='population'
										type='number'
										onChange={(e) => setPlanet({ ...planet, [e.target.name]: parseInt(e.target.value) })}
										value={planet.population}
									/>
								</div>
								<div className='diameter-container'>
									<label htmlFor='diameter'>Diameter:</label>
									<input
										name='diameter'
										type='number'
										onChange={(e) => setPlanet({ ...planet, [e.target.name]: parseInt(e.target.value) })}
										value={planet.diameter}
									/>
								</div>
								<div className='mass-container'>
									<label htmlFor='mass'>Mass:</label>
									<input
										name='mass'
										type='number'
										onChange={(e) => setPlanet({ ...planet, [e.target.name]: parseInt(e.target.value) })}
										value={planet.mass}
									/>
								</div>
								<div className='temperature-container'>
									<label htmlFor='temperature'>Temperature:</label>
									<input
										name='temperature'
										type='number'
										onChange={(e) => setPlanet({ ...planet, [e.target.name]: parseInt(e.target.value) })}
										value={planet.temperature}
									/>
								</div>
								<div className='image-container'>
									<label htmlFor='image'>Image:</label>
									<input name='image' type='text' disabled={true} value={planet.image} />
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

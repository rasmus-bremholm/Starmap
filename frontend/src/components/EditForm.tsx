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

	const actions = ["edit", "add", "delete"];

	useEffect(() => {
		fetch("http://localhost:1337/planets-list")
			.then((response) => response.json())
			.then((result) => {
				setPlanetList(result);
			});
	}, []);

	const actionSwitch = (action: string | undefined) => {
		switch (action) {
			case "edit":
				return (
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
					</div>
				);
			case "add":
				return <div>add</div>;
			case "delete":
				return <div>delete</div>;
			default:
				return null;
		}
	};

	return (
		<main className='planet-info-container'>
			<EditContainer>
				{editAction && <h1>{editAction} Planet</h1>}
				<div>
					<form>
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

						{actionSwitch(editAction)}
						<input type='submit' value='Commit' disabled={isDisabled} />
					</form>
				</div>
			</EditContainer>
		</main>
	);
}

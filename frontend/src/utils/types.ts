export interface PlanetData {
	id: number;
	title: string;
	system: number;
	desc: string;
	image: string;
	image_alt: string;
	texture: string;
	population: number;
	diameter: number;
	mass: number;
	temperature: number;
}

export interface PlanetsList {
	PlanetData: [];
}

export type PlanetFormData = Omit<PlanetData, "id">;

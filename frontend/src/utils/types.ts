export interface PlanetData {
	id: number;
	title: string;
	system: string;
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

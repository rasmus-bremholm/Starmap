import { createContext, useContext, useState } from "react";
// God bless youtube tutorials, hade aldrig fattat context annars.

interface PlanetContextType {
	// Jag kan inte använda _ tricket för att säga att vi inte använder "setShouldRefetch" utan att jag bryter mina types...what to do.
	shouldRefetch: boolean;
	setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function usePlanetContext() {
	const context = useContext(PlanetContext);
	if (!context) {
		throw new Error("Typescript vill att vi skyddar oss mot undefined.");
	}
	return context;
}

export function PlanetProvider({ children }: { children: React.ReactNode }) {
	const [shouldRefetch, setShouldRefetch] = useState(false);

	return <PlanetContext.Provider value={{ shouldRefetch, setShouldRefetch }}>{children}</PlanetContext.Provider>;
}

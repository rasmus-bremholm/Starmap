import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import PlanetsView from "./views/PlanetsView.tsx";
import EditView from "./views/EditView.tsx";
import { PlanetProvider } from "./utils/planetContext.tsx";

createRoot(document.getElementById("root")!).render(
	<PlanetProvider>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					<Route index element={<PlanetsView />} />
					<Route path='edit/:action' element={<EditView />} />
					<Route path=':id' element={<PlanetsView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</PlanetProvider>
);

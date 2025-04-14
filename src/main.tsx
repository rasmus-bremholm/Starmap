import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import PlanetsView from "./views/PlanetsView.tsx";
import EditView from "./views/EditView.tsx";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<PlanetsView />} />
			<Route path='/edit' element={<EditView />} />
		</Routes>
	</BrowserRouter>
);

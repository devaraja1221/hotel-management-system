import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HotelListPage from "./pages/HotelListPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<HotelListPage />}
          />

          <Route
            path="/hotel/:id"
            element={<HotelDetailsPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

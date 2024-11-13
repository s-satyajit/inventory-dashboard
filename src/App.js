import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExcelUploader from "./components/ExcelUploader";
import SummaryPage from "./pages/SummaryPage";
import InventoryAgingReport from "./pages/InventoryAgingReport";
import BackorderReport from "./pages/BackorderReport";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <header className="bg-blue-600 p-4 text-white">
          <h1 className="text-3xl font-bold mb-4">Inventory Dashboard</h1>
        </header>
        <nav className="bg-gray-800 p-4 mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:underline">
                Summary Page
              </Link>
            </li>
            <li>
              <Link to="/aging-report" className="text-white hover:underline">
                Inventory Aging Report
              </Link>
            </li>
            <li>
              <Link
                to="/backorder-report"
                className="text-white hover:underline"
              >
                Backorder Report
              </Link>
            </li>
          </ul>
        </nav>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <ExcelUploader setData={setData} />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                data.length > 0 ? (
                  <SummaryPage data={data} />
                ) : (
                  <p>No data loaded yet.</p>
                )
              }
            />
            <Route
              path="/aging-report"
              element={
                data.length > 0 ? (
                  <InventoryAgingReport data={data} />
                ) : (
                  <p>No data loaded yet.</p>
                )
              }
            />
            <Route
              path="/backorder-report"
              element={
                data.length > 0 ? (
                  <BackorderReport data={data} />
                ) : (
                  <p>No data loaded yet.</p>
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

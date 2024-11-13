import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExcelUploader from "./components/ExcelUploader";
import BackorderReport from "./pages/BackorderReport";
import InventoryAgingReport from "./pages/InventoryAgingReport";
import SummaryPage from "./pages/SummaryPage";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <Router>
      <div className="min-h-screen w-full h-screen items-center">
        <header className="w-full flex flex-col items-center justify-center text-center bg-blue-600 p-4 text-white ">
          <h1 className="text-3xl font-bold mb-4">Inventory Dashboard</h1>
        </header>
        <nav className="bg-gray-800 p-4 mb-4 justify-center flex">
          <ul className="flex space-x-4 h-full">
            <li>
              <Link 
                to="/" 
                className="text-white text-lg font-semibold px-4 py-2 rounded-md h-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
                Summary Page
              </Link>
            </li>
            <li>
              <Link 
                to="/aging-report" 
                className="text-white text-lg font-semibold px-4 py-2 rounded-md  h-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
                Inventory Aging Report
              </Link>
            </li>
            <li>
              <Link
                to="/backorder-report"
                className="text-white text-lg font-semibold px-4 py-2 rounded-md h-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
              >
                Backorder Report
              </Link>
            </li>
          </ul>
        </nav>
        <div className="grid grid-cols-1 gap-4">
          <div className="shadow-lg p-4 ">
            <ExcelUploader setData={setData} />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                data.length > 0 ? (
                  <div className="p-4">
                    <SummaryPage data={data} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-lg text-gray-500 italic">
                      No data loaded yet
                    </p>
                  </div>
                )
              }
            />
            <Route
              path="/aging-report"
              element={
                data.length > 0 ? (
                  <div className="p-4">
                    <InventoryAgingReport data={data} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-lg text-gray-500 italic">
                      No data loaded yet
                    </p>
                  </div>
                )
              }
            />
            <Route
              path="/backorder-report"
              element={
                data.length > 0 ? (
                  <div className="p-4">
                    <BackorderReport data={data} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-lg text-gray-500 italic">
                      No data loaded yet
                    </p>
                  </div>
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

import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ExcelUploader from "./components/ExcelUploader";
import SummaryPage from "./pages/SummaryPage";
import InventoryAgingReport from "./pages/InventoryAgingReport";
import BackorderReport from "./pages/BackorderReport";

const App = () => {

  const [data, setData] = useState([])

  return (
    <Router>
      <div>
      <h1>Inventory Dashboard</h1>
      <ExcelUploader setData={setData} />
      <nav>
        <ul>
          <li><Link to="/">Summary Page</Link></li>
          <li><Link to="/aging-report">Inventory Aging Report</Link></li>
          <li><Link to="/backorder-report">Backorder Report</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact>
          {data.length > 0 ?  <SummaryPage data={data} /> : <p>No data loaded yet.</p>}
        </Route>
        <Route path="/aging-report">
          {data.length > 0 ? <InventoryAgingReport data={data} /> : <p>No data loaded yet.</p>}
        </Route>
        <Route path="/backorder-report">
          {data.length > 0 ? <BackorderReport data={data} /> : <>No data loaded yet.</>}
        </Route>
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;

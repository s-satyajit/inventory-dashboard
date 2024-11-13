import React, {useState} from "react";
import ExcelUploader from "./components/ExcelUploader";
import SummaryPage from "./pages/SummaryPage";

const App = () => {

  const [data, setData] = useState([])

  return (
    <div>
      <h1>Inventory Dashboard</h1>
      <ExcelUploader setData={setData} />
      {data.length > 0 ? <SummaryPage data={data} /> : <p>No data loaded yet.</p>}
    </div>
  );
}

export default App;

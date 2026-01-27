import { BrowserRouter } from "react-router-dom";
import DashboardLayout from "./Pages/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen overflow-hidden">
        <DashboardLayout />
      </div>
    </BrowserRouter>
  );
}

export default App;

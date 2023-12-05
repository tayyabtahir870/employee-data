import "./App.css";
import EmployeeRecord from "./Components/Elements/EmployeeRecord";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Layouts/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddRecord from "./Components/Elements/AddRecord";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeRecord />}></Route>
          <Route path="/addrecord" element={<AddRecord />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

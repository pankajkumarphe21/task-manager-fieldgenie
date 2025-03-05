import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/Register";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update/:id" element={<UpdateTask />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;

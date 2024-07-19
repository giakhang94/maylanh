import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { AdminRouter } from "./Router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <AdminRouter />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

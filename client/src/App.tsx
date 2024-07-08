import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Home, Login, Order, Register, ShareLayout } from "./pages";
import ProtectedLayout from "./components/protectedLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedLayout>
              <ShareLayout />
            </ProtectedLayout>
          }
          path="/admin"
        >
          <Route element={<Dashboard />} index />
          <Route element={<Order />} path="/admin/order" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

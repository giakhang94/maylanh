import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddService,
  AllService,
  CustomerLogin,
  Dashboard,
  Home,
  Login,
  Order,
  Register,
  Services,
  ShareLayout,
} from "@/pages";
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
          <Route element={<AllService />} path="/admin/all-services" />
          <Route element={<AddService />} path="/admin/add-service" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Home />} path="/" />
        <Route element={<Services />} path="/services" />
        <Route element={<CustomerLogin />} path="/customer/login" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

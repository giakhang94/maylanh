import { ShareLayout } from "@/pages";
import { Route } from "react-router-dom";
import adminRoutes from "./Constants/adminRoutes";
import { ProtectedLayout } from "@/components";

const AdminRouter = () => {
  return (
    <Route
      element={
        <ProtectedLayout>
          <ShareLayout />
        </ProtectedLayout>
      }
      path="/admin"
    >
      {adminRoutes.map((route) => (
        <Route {...route} />
      ))}
    </Route>
  );
};

export default AdminRouter;

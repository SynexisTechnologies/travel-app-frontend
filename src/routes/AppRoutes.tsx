import { Route, Routes } from "react-router";
import { AppLayout } from "@/layouts";
import {
  ProtectedRoute,
  Login,
  Register,
  UnderDevelopment,
  NotFound,
} from "@/shared";
import { Dashboard, ManageUsers, MasterData } from "@/features";
import { ManageDestinations } from "@/features/destination";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <></>
            </AppLayout>
          </ProtectedRoute>
        }
      >
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<ManageUsers />} />
        {/* <Route path="/privileges" element={<ManageUserRolePrivileges />} /> */}
        <Route path="/master-data" element={<MasterData />} />
        <Route path="/destinations" element={<ManageDestinations />} />
        <Route path="/activities" element={<UnderDevelopment />} />
        <Route path="/accommodation" element={<UnderDevelopment />} />
        <Route path="/services" element={<UnderDevelopment />} />
        <Route path="/transport" element={<UnderDevelopment />} />
        <Route path="/guides" element={<UnderDevelopment />} />
        <Route path="/food" element={<UnderDevelopment />} />
        <Route path="/events" element={<UnderDevelopment />} />
        <Route path="/news" element={<UnderDevelopment />} />
        <Route path="/ads" element={<UnderDevelopment />} />
        <Route path="/about-srilanka" element={<UnderDevelopment />} />
        <Route path="/gallery" element={<UnderDevelopment />} />
        <Route path="/top-places" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;

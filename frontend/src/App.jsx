import { Routes, Route, Navigate } from "react-router-dom";
import SelectPlan from "./pages/SelectPlan";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RoomPlanList from "./pages/RoomPlanList";
import RoomPlanDetail from "./pages/RoomPlanDetail";
import MainLayout from "./pages/MainLayout";
import PrivateRoute from "./pages/PrivateRoute";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/signin"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/room-plans" replace />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />

          <Route
            path="/create"
            element={
              <PrivateRoute>
                <SelectPlan />
              </PrivateRoute>
            }
          />

          <Route
            path="/room-plans"
            element={
              <PrivateRoute>
                <RoomPlanList />
              </PrivateRoute>
            }
          />

          <Route
            path="/room-plan/:id"
            element={
              <PrivateRoute>
                <RoomPlanDetail />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

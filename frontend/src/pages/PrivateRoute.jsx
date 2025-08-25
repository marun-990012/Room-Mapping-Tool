import { Navigate } from "react-router-dom";

function PrivateRoute(props) {
  const token = localStorage.getItem("token");

  if (token) {
    return props.children;
  } else {
    return <Navigate to="/signin" replace />;
  }
}
export default PrivateRoute;
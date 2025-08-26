// import { Navigate } from "react-router-dom";

// function PrivateRoute(props) {
//   const token = localStorage.getItem("token");

//   if (token) {
//     return props.children;
//   } else {
//     return <Navigate to="/signin" replace />;
//   }
// }
// export default PrivateRoute;

import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token && location.pathname !== "/signin") {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default PrivateRoute;

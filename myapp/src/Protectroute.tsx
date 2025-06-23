import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./store/store";

const ProtectedRoute = ({ children }:{children:React.ReactNode}) => {
  const { username } = useAppSelector((state) => state.user);
    console.log(username);

  return username ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

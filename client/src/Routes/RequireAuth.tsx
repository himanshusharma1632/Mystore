import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/REDUX/configureStore";

export default function RequireAuth () {
// using(s)
// 1.redux
const { user } = useAppSelector( state => state.account);

// 2. react-router-dom
const location = useLocation();

if (!user) {
 return <Navigate to = {'/account/login'} state = {{ from : location }} />
}

return <Outlet />
}
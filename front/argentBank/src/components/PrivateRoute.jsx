import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

function PrivateRoute ({ children }) {
    const  { user: authUser} = useSelector(state => state.user);
    const location = useLocation();

    if (!authUser) {
        return <Navigate to="/SignIn" state={{ from: location }}/>;
}

    return children;
}

export default PrivateRoute;
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

function PrivateRoute ({ children }) {
    const  user = useSelector(state => state.user);
    const location = useLocation();

    if (!user || !user.token) {
        return <Navigate to="/SignIn" state={{ from: location }}/>;
}

    return children;
}

export default PrivateRoute;
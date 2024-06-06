import {Navigate} from "react-router-dom";
import store from "../../redux/store/configureStore.js";

function PrivateRoute({ children }) {
    const token = sessionStorage.getItem('token') || store.getState().user.token;

    return token ? children : <Navigate to="/SignIn" />;
}

export default PrivateRoute;
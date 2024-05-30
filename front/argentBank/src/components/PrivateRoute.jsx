import {Navigate} from "react-router-dom";
import store from "../../redux/store/configureStore.js";

function PrivateRoute({ children }) {
    const token = sessionStorage.getItem('token') || store.getState().user.token;

    return token ? children : <Navigate to="/SignIn" />;
    // reset state
}

export default PrivateRoute;


// || persistStore(store).getState().user.token; + state.user
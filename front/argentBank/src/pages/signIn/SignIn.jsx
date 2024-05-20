import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLogin, setUserFromToken} from "../../../redux/slice/userSlice.js";
import {useNavigate} from "react-router-dom";
import { persistor } from "../../../redux/store/configureStore.js";

const defaultUser = { loading : false , error : null };

const LoginForm = () => {

    // states
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);

    // redux state
    const { user, loading, error } = useSelector((state) => state.user || defaultUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect (() => {
        if (persistor.getState().bootstrapped) {
        dispatch(setUserFromToken());
    }
    }, [user, dispatch, navigate]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let userCredentials = {
            email, password
        }

        // Validation des champs
        if (!email || !password) {
            setEmailError ("L'email est requis");
            setPasswordError ("Le mot de passe est requis");
            return;
        }
        else {
            setEmailError("");
            setPasswordError("")
        }

        // Dispatch de l'action userLogin
        dispatch(userLogin(userCredentials))
            .then((response) => {
                if (response.payload) {
                setEmail("");
                setPassword("");
                navigate('/Profile')
            }
            else if (response.error) {
                setPasswordError(response.error.message);
            }
        })
        .catch ((error) => {
            console.log("error", error);
        });
    }

    return (
    <main className="main bg-dark">
        <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(evt)=>setEmail(evt.target.value)}
                        />
                            {emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type={showPassword ? "text" : "password"}
                               id="password"
                               value={password}
                               onChange={(evt)=>setPassword(evt.target.value)}
                        />
                                {passwordError && <p className="error-message">{passwordError}</p>}
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            <i className="fa fa-eye"></i>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me"/>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        {loading?"Loading...":"Sign In"}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
        </section>
    </main>
    )
}
export default LoginForm;
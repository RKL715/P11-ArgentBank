import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLogin, setUserFromToken} from "../../../redux/slice/userSlice.js";
import {useNavigate} from "react-router-dom";
import { persistor } from "../../../redux/store/configureStore.js";

// Import des composants du SignIn
import  InputField  from "../../components/signIn/InputField.jsx";
import  RememberMe  from "../../components/signIn/RememberMe.jsx";
import  SubmitButton from "../../components/signIn/SubmitButton.jsx";

const defaultUser = { loading : false , error : null };

const LoginForm = () => {

    // states
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);
    const [ rememberMe, setRememberMe ] = useState(false);

    // redux state
    const { user, loading, error } = useSelector((state) => state.user || defaultUser);

    // redux dispatch
    const dispatch = useDispatch();
    // react-router navigate
    const navigate = useNavigate();

    useEffect (() => {
        if (persistor.getState().bootstrapped) {
        dispatch(setUserFromToken());
    }
    }, [user, dispatch, navigate]);

    useEffect (() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        const savedRememberMe = localStorage.getItem('rememberMe');

        if (savedEmail && savedPassword && savedRememberMe) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(savedRememberMe);
        }
    } , []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let userCredentials = {
            email, password
        }

        // Sauvegarde des données dans le localStorage
        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('rememberMe', rememberMe);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
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
                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(evt)=>setEmail(evt.target.value)}
                        error={emailError}
                    />
                    <InputField
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(evt)=>setPassword(evt.target.value)}
                        error={passwordError}
                    />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            <i className="fa fa-eye"></i>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    <RememberMe
                        checked={rememberMe}
                        onChange={(evt)=>setRememberMe(evt.target.checked)}
                    />
                    <SubmitButton loading={loading} />
                    {error && <p className="error-message">{error}</p>}
                </form>
        </section>
    </main>
    )
}
export default LoginForm;
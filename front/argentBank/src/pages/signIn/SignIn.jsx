import { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLogin, selectUser} from "../../../redux/slice/userSlice.js";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage.js";
// Import des composants du SignIn
import  InputField  from "../../components/signIn/InputField.jsx";
import  RememberMe  from "../../components/signIn/RememberMe.jsx";
import  SubmitButton from "../../components/signIn/SubmitButton.jsx";

const LoginForm = () => {
    // states
    const [ email, setEmail ] = useLocalStorage("email", '');
    const [ password, setPassword ] = useState("");
    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);
    const [ rememberMe, setRememberMe ] = useLocalStorage("rememberMe", false);
    // redux state
    const { user, loading, error } = useSelector(selectUser);
    // redux dispatch
    const dispatch = useDispatch();
    // react-router navigate
    const navigate = useNavigate();

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
                        showPassword={showPassword}
                        toggleShowPassword={()=>setShowPassword(!showPassword)}
                    />
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
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../../redux/slice/userSlice.js";
import {useNavigate} from "react-router-dom";


const LoginForm = () => {

    // states
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // redux state
    const { loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (evt) => {
        evt.preventDefault();
        let userCredentials = {
            email, password
        }
        dispatch(userLogin(userCredentials)).then((response) => {
            if (response.payload) {
                setEmail("");
                setPassword("");
                navigate('/Profile');
            }
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
                        <input type="text" id="email" value={email}
                        onChange={(evt)=>setEmail(evt.target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password}
                        onChange={(evt)=>setPassword(evt.target.value)}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me"/>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        {loading?"Loading...":"Sign In"}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                    {/*<a href="./User" className="sign-in-button">Sign In</a>*/}
                </form>
        </section>
    </main>
    );
}

export default LoginForm;
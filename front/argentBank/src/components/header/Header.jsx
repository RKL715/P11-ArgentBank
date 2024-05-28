import {userLogout} from '../../../redux/slice/userSlice';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate,} from "react-router-dom";


function Header () {

    const user = useSelector((state) => state.user) || {};
    const navigate = useNavigate();
        const dispatch = useDispatch();
        const handleLogout = () => {
            event.preventDefault()
            dispatch(userLogout());
            navigate ('/');
        }

    return (
        <header>
            <nav className="main-nav">
                <a className="main-nav-logo" href="/">
                    <img
                        className="main-nav-logo-image"
                        src={"/img/argentBankLogo.webp"}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>

                {user.token ? (
                <div className="main-nav-connected" id="user-sign-out">
                    <a className="main-nav-item" href="/profile">
                        <i className="fa fa-user-circle"></i>
                        {user.userName}
                    </a>
                    <a className="main-nav-item" href="/" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </a>
                </div>
                ) : (
                    <div className="main-nav-default">
                        <a className="main-nav-item" href="/SignIn">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </a>
                    </div>
                )}
            </nav>
        </header>
    )
}


export default Header;

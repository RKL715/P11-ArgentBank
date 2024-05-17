function Header () {

    return (
        <header>
            <nav className="main-nav">
                <a className="main-nav-logo" href="/">
                    <img
                        className="main-nav-logo-image"
                        src={"../public/img/argentBankLogo.webp"}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div className="main-nav-connected">
                    <a className="main-nav-item" href="/profile">
                        <i className="fa fa-user-circle"></i>
                        Tony
                    </a>
                    <a className="main-nav-item" href="/">
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </a>
                </div>
                <div className="main-nav-default">
                    <a className="main-nav-item" href="/SignIn">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header;

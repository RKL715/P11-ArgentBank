import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Home from "./pages/home/Home.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import User from "./pages/user/User.jsx";
import Error from "./pages/error/Error.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import {useEffect} from "react";

function App() {

    history.navigate = useNavigate();
    history.location = useLocation();

    // Fonction qui permet de changer le titre de la page en fonction du pathname
    useEffect (() => {
    const pathname = window.location.pathname; // Récupère le pathname de l'url
    let title = "Argent Bank - Home Page" // Titre par défaut
    if (pathname === "/SignIn") {
        title = "Argent Bank - Connexion" // Si le pathname est /SignIn, on change le titre
    } else if (pathname === "/Profile") {
        title = "Argent Bank - Profil"
    } else if (pathname === "/Error") {
        title = "Argent Bank - Error"
    }
    document.title = title;
    }, []); // [] permet de ne pas relancer la fonction à chaque render

  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Profile" element={<PrivateRoute><User /></PrivateRoute>} /> {/* On utilise le composant PrivateRoute pour protéger la route */}
            <Route path="/Error" element={<Error />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App

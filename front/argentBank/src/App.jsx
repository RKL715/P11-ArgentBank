import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home/Home.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import User from "./pages/user/User.jsx";
import Error from "./pages/error/Error.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";


function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/User" element={<User />} />
            <Route path="/Error" element={<Error />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App

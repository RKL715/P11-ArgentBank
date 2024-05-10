import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home/Home.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import User from "./pages/user/User.jsx";
import Error from "./pages/error/Error.jsx";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/User" element={<User />} />
            <Route path="/Error" element={<Error />} />
        </Routes>
    </div>
  )
}

export default App

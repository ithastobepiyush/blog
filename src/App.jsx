import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";

const App = () => {
    return (
        // Nexted routes after home{"/"} ALSO nested Routes couldn't render by react by default 
        // to do so, it is mandatory to use outlet in the parent Route 
        <Routes>
            <Route path="/" element={<Navbar />} >
                <Route path="signin" element={<UserAuthForm type="sign-in" />} />
                <Route path="signup" element={<UserAuthForm type="sign-up" />} />
            </Route>
        </Routes>
    )
}

export default App;
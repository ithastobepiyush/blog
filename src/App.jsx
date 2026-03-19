import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";


export const UserContext = createContext({})

const App = () => {

    const [userAuth, setUserAuth] = useState({})

    useEffect(() => {

        let userInSession = lookInSession("user")
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ accessToken: null})

    }, [])

    return (
        // Nexted routes after home{"/"} ALSO nested Routes couldn't render by react by default 
        // to do so, it is mandatory to use outlet in the parent Route 
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            <Routes>
                <Route path="/" element={<Navbar />} >
                    <Route path="signin" element={<UserAuthForm type="sign-in" />} />
                    <Route path="signup" element={<UserAuthForm type="sign-up" />} />
                </Route>
            </Routes>
        </UserContext.Provider>
    )
}

export default App;
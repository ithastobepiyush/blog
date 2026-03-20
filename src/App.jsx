/**
 * @file App.jsx
 * @description Root component that handles routing and global user authentication state.
 * 
 * Architecture & Data Flow:
 * - Initializes a React Context (`UserContext`) to share user authentication state across the app.
 * - On initial load, checks session storage for an existing user session to persist login.
 * - Uses React Router to map URLs to specific page components.
 */
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";

/**
 * Global User Context
 * Provides `userAuth` (current user state) and `setUserAuth` (function to update state) to all nested components.
 */
export const UserContext = createContext({})

const App = () => {
    // State to hold user authentication data (e.g., access token, user info)
    const [userAuth, setUserAuth] = useState({})

    /**
     * useEffect Hook
     * Side Effect: Reads from browser's sessionStorage on component mount.
     * Purpose: Persists user session across page reloads. If a "user" key is found, 
     * it updates the local state; otherwise, sets accessToken to null.
     */
    useEffect(() => {
        let userInSession = lookInSession("user")
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ accessToken: null})
    }, [])

    return (
        // Wraps the application routing with UserContext to make auth state globally accessible
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            <Routes>
                {/* 
                  Navbar UI is rendered on every path under "/".
                  Nested child routes render inside the <Outlet /> of Navbar component. 
                */}
                <Route path="/" element={<Navbar />} >
                    <Route path="signin" element={<UserAuthForm type="sign-in" />} />
                    <Route path="signup" element={<UserAuthForm type="sign-up" />} />
                </Route>
            </Routes>
        </UserContext.Provider>
    )
}

export default App;
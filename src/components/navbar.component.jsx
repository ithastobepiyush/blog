/**
 * @file navbar.component.jsx
 * @description Top navigation bar component for the application.
 * 
 * Architecture & Data Flow:
 * - Reads `userAuth` state from the global `UserContext`.
 * - If `accessToken` exists, the user is authenticated, and profile options (like Notifications and Profile Menu) are shown.
 * - Otherwise, "Sign In" and "Sign Up" buttons are displayed.
 * - Manages local UI state for the mobile search box visibility and the user dropdown navigation panel.
 */
import { useContext, useState } from "react"
import logo from "../imgs/logo.png"
import { Link, Outlet } from "react-router-dom"
import { UserContext } from "../App"
import UserNavigationPanel from "./user-navigation.component"

const Navbar = () => {

    /** 
     * Local State: Controls visibility of the search bar on mobile screens. 
     */
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false)

    /** 
     * Local State: Controls visibility of the user dropdown menu (UserNavigationPanel). 
     */
    const [userNavPanel, setUserNavPanel] = useState(false)

    // Global State: Extract userAuth data (accessToken and profile image) to conditionally render UI
    const { userAuth, userAuth: { accessToken, profile_img } } = useContext(UserContext)

    /**
     * @function handleUserNavPanel
     * @description Toggles the user profile dropdown menu open/closed.
     */
    const handleUserNavPanel = () => {
        setUserNavPanel(currentVal => !currentVal)
    }

    /**
     * @function handbleBlur
     * @description Closes the user profile dropdown when it loses focus (e.g., clicking outside).
     * Uses a setTimeout to allow click events inside the dropdown to fire before closing it.
     */
    const handbleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false)
        }, 200)
    }

    return (

        <>
            <nav className="navbar">
                <Link to="/" className="flex-none w-10">
                    <img src={logo} className="w-full" alt="logo" />
                </Link>

                {/* Search Bar division [input + icon] */}
                <div className={"mt-0.5 border-b border-grey absolute bg-white w-full left-0 top-full py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " + (searchBoxVisibility ? "show" : "hide")}>

                    {/* Search bar input with Icon */}
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                    />
                    <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
                </div>

                <div className="flex items-center gap-3 md:gap-6 ml-auto">

                    {/* Search Icon to toggle search bar (Mobile only) */}
                    <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
                        onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
                    >
                        <i className="fi fi-rr-search text-xl"></i>
                    </button>

                    {/* Write button to create a blog post */}
                    <Link to="/editor" className="hidden md:flex gap-2 link">
                        <i className="fi fi-rr-file-edit"></i>
                        <p>Write</p>
                    </Link>

                    {/* Conditional Rendering: User Profile Section OR Auth Buttons */}
                    {
                        accessToken ?
                            // Logged In UI: Show Notification bell and Profile image
                            <>
                                <Link to="/dashboard/notification">
                                    <button className="w-12 h-12 rounded-full relative bg-grey hover:bg-black/10">
                                        <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                                    </button>
                                </Link>

                                {/* User profile wrapped in a container that listens to blur events */}
                                <div
                                    className="relative"
                                    onClick={handleUserNavPanel}
                                    onBlur={handbleBlur}
                                >

                                    <button className="w-12 h-12 mt-1">
                                        <img
                                            className="w-full h-full object-cover rounded-full"
                                            src={profile_img}
                                            alt="Profile"
                                        />
                                    </button>
                                    
                                    {/* Render the dropdown menu if userNavPanel state is true */}
                                    {
                                        userNavPanel ?
                                            <UserNavigationPanel />
                                            : ""
                                    }
                                </div>
                            </>
                            :
                            // Logged Out UI: Show Sign In & Sign Up buttons
                            <>
                                <Link className="btn-dark py-2" to="/signin">
                                    Sign In
                                </Link>
                                <Link to="/signup" className="btn-light py-2 hidden md:block" >
                                    Sign Up
                                </Link>
                            </>
                    }

                </div>
            </nav>

            {/* React Router Outlet: Renders the nested routes defined in App.jsx */}
            <Outlet />
        </>
    )
}

export default Navbar
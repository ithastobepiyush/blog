/**
 * @file user-navigation.component.jsx
 * @description Renders a dropdown menu for logged-in users, accessible via their profile icon in the Navbar.
 * 
 * Architecture & Data Flow:
 * - Attaches to the UI below the Navbar's profile icon.
 * - Extracts `username` and `setUserAuth` from global `UserContext`.
 * - Provides links to Write, Profile, Dashboard, and Settings pages.
 * - Handles the 'Sign Out' action which clears session and global state.
 */
import { Link } from "react-router-dom"
import AnimationWrapper from "../common/page-animation"
import { useContext } from "react"
import { UserContext } from "../App"
import { removeFromSession } from "../common/session"

const UserNavigationPanel = () => {

    // Access the global UserContext to read the username and use the state-setter for logout
    const {userAuth:{username}, setUserAuth} = useContext(UserContext)

    /**
     * @function signOutUser
     * @description Logs the user out of the application.
     * 
     * Side Effects:
     * - Removes the "user" object from browser sessionStorage.
     * - Resets the global `userAuth` state context (setting accessToken to null).
     * - This state change propagates up to `<App />` and `<Navbar />`, causing a re-render 
     *   that shows the logged-out UI and redirects protected routes.
     */
    const signOutUser = () => {
        removeFromSession("user")
        setUserAuth({accessToken: null})
    }

    return(
        // Wraps the menu in an animation component for smooth mounting/dismounting
        <AnimationWrapper 
            className="absolute right-0 z-50"
            transition={{duration: 0.2}}
        >

            <div className="bg-grey absolute right-0 border border-grey w-60 duration-200 rounded-lg">

                {/* Mobile-only "Write" button since it is hidden in the Navbar on small screens */}
                <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </Link>

                {/* User specific profile link using their username */}
                <Link to={`/user/${username}`} className="link pl-8 py-4">
                    Profile
                </Link>
                
                <Link to="/dashboard/blogs" className="link pl-8 py-4">
                    Dashboard
                </Link>
                
                <Link to="/settings/edit-profile" className="link pl-8 py-4">
                    Settings
                </Link>

                <span className="absolute border-t border-grey w-[100%]"></span>

                {/* Sign Out Button triggers the cleanup of session and context */}
                <button 
                    className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
                    onClick={signOutUser}
                >
                        <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                        <p className="text-dark-grey">@{username}</p>
                </button>
            </div>
        </AnimationWrapper>
    )
}

export default UserNavigationPanel
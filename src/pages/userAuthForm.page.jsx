/**
 * @file userAuthForm.page.jsx
 * @description Renders the User Authentication Form for both Sign-In and Sign-Up.
 * 
 * Architecture & Data Flow:
 * - Reads `userAuth` global state from `UserContext`.
 * - On form submit, it validates inputs (Regex for email and password).
 * - Calls the backend API (via Axios) for login/registration.
 * - On success, updates `sessionStorage` and `UserContext` with the received access token and user info.
 * - If user is already authenticated (accessToken exists), automatically redirects to the Home page ("/").
 * - Also supports Google OAuth via Firebase `authWithGoogle` helper.
 */
import { Link, Navigate } from "react-router-dom"
import InputBox from "../components/input.component"
import googleIcon from "../imgs/google.png"
import AnimationWrapper from "../common/page-animation"
import { useContext } from "react"
// for notification
import { Toaster, toast } from "react-hot-toast"
import axios from "axios"
import { storeInSession } from "../common/session"
import { UserContext } from "../App"
import { authWithGoogle } from "../common/firebase"

/**
 * @function UserAuthForm
 * @param {Object} props
 * @param {string} props.type - Determines the form mode: "sign-in" or "sign-up".
 */
const UserAuthForm = ({ type }) => {

    // Access global user authentication state and its setter
    let {userAuth: {accessToken}, setUserAuth } = useContext(UserContext)

    /**
     * @function userAuthThroughServer
     * @description Sends authentication data to the backend API.
     * @param {string} serverRoute - API endpoint ("/signin", "/signup", or "/google-auth").
     * @param {Object} formData - Validated user credentials.
     * 
     * Side Effects:
     * - Makes an Axios POST request.
     * - Stores user data in sessionStorage on success.
     * - Updates global Context (`UserContext`).
     * - Shows toast notifications (success/error).
     */
    const userAuthThroughServer = async (serverRoute, formData) => {
        try {
            const { data } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData);
            
            // Save token and user details to browser session for persistence
            storeInSession("user", JSON.stringify(data))
            // Update global auth state to trigger UI changes (e.g., redirect to Home)
            setUserAuth(data)
            toast.success("user logged in")

        } catch (err) {
            // Safely handling Axios errors 
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err.message || "Network error. Please try again.");
            }
        }
    }

    /**
     * @function handleSubmit
     * @description Handles the manual email/password form submission.
     * @param {Event} e - Form submission event.
     * 
     * Side Effects: Prevent default form submission HTTP request, extracts form data, validates, and triggers API call.
     */
    const handleSubmit = (e) => {
        // Prevent default page reload on submit
        e.preventDefault();

        let serverRoute = type == "sign-in" ? "/signin" : "/signup";

        // Validation Utility regex for email & password
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/;

        // formData Retrieval safely using the event target (the form itself)
        let form = new FormData(e.target);

        // Convert FormData to plain JS object
        let formData = Object.fromEntries(form.entries());
        let { fullname, email, password } = formData;

        // Custom error handler for frontend
        const sendError = (msg) => toast.error(msg);

        // Validating the data from frontend before hitting the API
        if (type !== "sign-in" && (!fullname || fullname.trim().length < 3)) {
            return sendError("Fullname must be at least 3 letters long!");
        }

        if (!email) {
            return sendError("Email is required!");
        } else if (!emailRegex.test(email)) {
            return sendError("Please enter a valid email address (e.g., name@example.com).");
        }
        
        if (!password) {
            return sendError("Password is required!");
        } else if (!passwordRegex.test(password)) {
            return sendError("Password must be 8 to 20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (like !@#$%^&*).");
        }

        // If validation passes, call API
        userAuthThroughServer(serverRoute, formData);
    }


    /**
     * @function handleGoogleAuth
     * @description Handles authentication via Google OAuth.
     * @param {Event} e - Button click event.
     * 
     * Side Effects: Triggers Firebase pop-up, retrieves user's Google info, obtains Firebase ID token, and sends to backend API.
     */
    const handleGoogleAuth = async (e) =>{
        e.preventDefault()
        try{
            // Open Firebase Google Auth popup
            const user = await authWithGoogle()
            if(!user){
                return toast.error("Google login was cancelled or failed");
            }
            let serverRoute = "/google-auth"
            
            // Format data payload for backend to verify Firebase token
            let formData = {
                accessToken: await user.getIdToken()
            }
            userAuthThroughServer(serverRoute, formData)
        } catch(err){
            toast.error('Trouble logging in with Google')
            console.error(err);
        }
    }

    return (
        // Data Flow Logic: If access token exists, it means the user is logged in. 
        // We automatically redirect them to the home page to prevent accessing the auth form.
        accessToken ? 
        <Navigate to="/"/>
        :
        // to make the animation consistent throught the pages
        <AnimationWrapper keyValue={type}>

            {/* Section of Form for user authentication [signin/signup] */}
            <section className="h-cover flex items-center justify-center">

                {/* Notification pop from react-hot-toast */}
                <Toaster />
                {/* HTML FORM for USER AUTHENTICATION */}
                <form
                    id="formElement"
                    className="w-[80%] max-w-[400px]"
                    onSubmit={handleSubmit}
                >

                    <h1 className="text-4xl font-gelasio text-center mb-24">
                        {type == "sign-in" ? "We’ve been waiting for you" : "Become part of the community"}
                    </h1>

                    {/* Conditional rendering: Only show 'Full Name' input during sign-up */}
                    {
                        type != "sign-in" ?
                            <InputBox
                                name="fullname"
                                type="text"
                                placeholder="Full Name"
                                icon="fi fi-rr-user"
                            />
                            : ""
                    }

                    <InputBox
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        icon="fi fi-rr-envelope"
                    />

                    <InputBox
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon="fi fi-rr-key"
                    />

                    <button
                        className="btn-dark center mt-14"
                        type="submit"
                    >
                        {/* Dynamic button text ("sign in" or "sign up") */}
                        {type.replace("-", " ")}
                    </button>

                    {/* OR seperator between the signin and signup */}
                    <div className="relative flex gap-2 my-10 w-full items-center opacity-10 uppercase text-black font-bold ">
                        <hr className="w-1/2 border-black" />
                        <p>or</p>
                        <hr className="w-1/2 border-black" />
                    </div>

                    <button 
                        className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
                        onClick={handleGoogleAuth}
                    >
                        <img src={googleIcon} className="w-5" />
                        continue with google
                    </button>

                    {/* Toggle links to switch between sign-in and sign-up modes */}
                    {
                        type === "sign-in" ?
                            <p className="mt-6 text-dark-grey text-xl text-center">
                                Don't have an account?
                                <Link to="/signup" className="underline texxt-black text-xl ml-1">
                                    Join us today
                                </Link>
                            </p>
                            :
                            <p className="mt-6 text-dark-grey text-xl text-center">
                                Already a member
                                <Link to="/signin" className="underline texxt-black text-xl ml-1">
                                    Sign in here
                                </Link>
                            </p>
                    }

                </form>

            </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm
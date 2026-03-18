/* 
 * 1. COMPONENT OVERVIEW
 * UserAuthForm handles both user Sign-In and Sign-Up flows.
 * The `type` prop determines which mode the form is in ("sign-in" or "sign-up").
 * The UI dynamically adapts based on this `type` to show/hide specific fields
 * (like the Full Name field) and change texts/links accordingly.
 */
import { Link } from "react-router-dom"
import InputBox from "../components/input.component"
import googleIcon from "../imgs/google.png"
import AnimationWrapper from "../common/page-animation"
import { useRef } from "react"
// for notification
import { Toaster, toast } from "react-hot-toast"
import axios from "axios"

const UserAuthForm = ({ type }) => {

    /*
     * 2. STATE & UI CONTROL
     * Note: This component does NOT use React state (`useState`) or controlled inputs.
     * Instead, it uses purely uncontrolled inputs handled via the DOM's `FormData` API 
     * on form submission. This approach prevents unnecessary re-renders on every keystroke.
     */

    // const authForm = useRef()

    /*
     * 7. API CALL (FRONTEND PERSPECTIVE)
     * This function sends the user's data to the backend.
     * - `serverRoute` determines the endpoint (/signin or /signup)
     * - `formData` contains the extracted input values (email, password, etc.)
     * - The UI is updated via `toast` notifications based on the response or error.
     */
    const userAuthThroughServer = async (serverRoute, formData) => {
        try {
            const { data } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData);
            console.log(data);
        } catch (err) {
            /* 
             * 8. UX/UI LOGIC - User Feedback
             * Safely handling Axios errors and providing error feedback to the user via toast notifications.
             */
            // Safely handling Axios errors 
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err.message || "Network error. Please try again.");
            }
        }
    }

    /*
     * 4. EVENT HANDLERS
     * `handleSubmit` is triggered when the user clicks the submit button.
     * It prevents the default page reload, validates the data, and initiates the API call.
     */
    // to access mouse and event function --> (e)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Dynamically set the API route based on the component's `type` prop
        let serverRoute = type == "sign-in" ? "/signin" : "/signup";

        // regex for email & password 
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        /*
         * 3. DATA FLOW
         * Data Flow: User types in input fields -> Form is submitted -> `FormData` 
         * extracts all values using the `name` attributes of the inputs -> Data is converted 
         * to a simple JavaScript object (`formData`) -> Validated -> Sent to API.
         */
        // formData Retrieval safely using the event target (the form itself)
        let form = new FormData(e.target);
        
        let formData = Object.fromEntries(form.entries());
        let { fullname, email, password } = formData;

        /*
         * 6. FORM BEHAVIOR - Validation
         * Validating the extracted data on the frontend to provide immediate feedback
         * before making an unnecessary API request.
         */
        // Validating the data from frontend
        if (type !== "sign-in") {
            if (!fullname || fullname.trim().length < 3) {
                return toast.error("Full Name must be at least 3 letters long");
            }
        }
        if (!email) {
            return toast.error("Enter email");
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid");
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase");
        }

        userAuthThroughServer(serverRoute, formData);
    }

    return(
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
                        
                    {/* 
                      * 5. CONDITIONAL RENDERING 
                      * Form heading changes dynamically depending on whether it's sign-in or sign-up. 
                      */}
                    <h1 className="text-4xl font-gelasio  text-center mb-24">
                        {type == "sign-in" ? "We’ve been waiting for you" : "Become part of the community"}
                    </h1>

                    {/* 
                      * 5. CONDITIONAL RENDERING
                      * The Full Name field is ONLY rendered for the "sign-up" mode.
                      * If it's "sign-in", an empty string is rendered (field is hidden).
                      */}
                    {
                        type !="sign-in" ?
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
                    
                    {/* 
                      * 9. CODE READABILITY 
                      * The `placeholder` attribute was broken into two lines originally. 
                      * It functions normally but usually should be on a single line.
                      */}
                    <InputBox 
                            name="password"
                            type="password"
                            placeholder
                            ="Password"
                            icon="fi fi-rr-key"
                        />

                    <button 
                        className="btn-dark center mt-14"
                        type="submit"
                        >
                        {/* 
                          * 8. UX/UI LOGIC
                          * Replaces the hyphen in "sign-in" or "sign-up" with a space 
                          * so the button text is cleaner (e.g., "sign in" instead of "sign-in").
                          */}
                        {type.replace("-", " ")}
                    </button>

                    {/* OR seperator between the signin and signup */}
                    <div className="relative flex gap-2 my-10 w-full items-center opacity-10 uppercase text-black font-bold ">
                        <hr className="w-1/2 border-black"/>
                        <p>or</p>
                        <hr className="w-1/2 border-black"/>
                    </div>

                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                        <img src={googleIcon} className="w-5" />
                        continue with google
                    </button>

                    {/* 
                      * 5. CONDITIONAL RENDERING
                      * Toggle link at the bottom of the form to switch between sign-in and sign-up flows.
                      */}
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
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

const UserAuthForm = ({ type }) => {

    // const authForm = useRef()
    let {userAuth: {accessToken}, setUserAuth } = useContext(UserContext)

    // console.log(accessToken);
    

    const userAuthThroughServer = async (serverRoute, formData) => {
        try {
            const { data } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData);
            // console.log(data);
            
            storeInSession("user", JSON.stringify(data))
            setUserAuth(data)
            // console.log(sessionStorage);
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

    // to access mouse and event function --> (e)
    const handleSubmit = (e) => {
        e.preventDefault();

        let serverRoute = type == "sign-in" ? "/signin" : "/signup";

        // Validation Utility regex for email &password
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/;

        // formData Retrieval safely using the event target (the form itself)
        let form = new FormData(e.target);

        let formData = Object.fromEntries(form.entries());
        let { fullname, email, password } = formData;

        // Custom error handler for frontend
        const sendError = (msg) => toast.error(msg);

        // Validating the data from frontend
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

        // console.log(formData);
        

        userAuthThroughServer(serverRoute, formData);
    }

    return (

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

                    <h1 className="text-4xl font-gelasio  text-center mb-24">
                        {type == "sign-in" ? "We’ve been waiting for you" : "Become part of the community"}
                    </h1>

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
                        placeholder
                        ="Password"
                        icon="fi fi-rr-key"
                    />

                    <button
                        className="btn-dark center mt-14"
                        type="submit"
                    >
                        {type.replace("-", " ")}
                    </button>

                    {/* OR seperator between the signin and signup */}
                    <div className="relative flex gap-2 my-10 w-full items-center opacity-10 uppercase text-black font-bold ">
                        <hr className="w-1/2 border-black" />
                        <p>or</p>
                        <hr className="w-1/2 border-black" />
                    </div>

                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                        <img src={googleIcon} className="w-5" />
                        continue with google
                    </button>

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
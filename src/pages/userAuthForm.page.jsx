import { Link } from "react-router-dom"
import InputBox from "../components/input.component"
import googleIcon from "../imgs/google.png"
import AnimationWrapper from "../common/page-animation"
import { useRef } from "react"
// for notification
import { Toaster, toast } from "react-hot-toast"
import axios from "axios"

const UserAuthForm = ({ type }) => {

    // auth form storing form via refernce(ref) in form
    const authForm = useRef()

    // Connection to server/backend through axios client
    const userAuthThroughServer = (serverRoute, formData) => {
        // since this post is a promise --> use .then()
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({data}) => {
            console.log(data);
            
        }).catch(({response}) => {
            toast.error(response.data.error)
        })
    }



    // handleing click events of submit button ----->
    const handleSubmit = (e) =>{

        e.preventDefault()

        let serverRoute = type == "sign-in" ? "/signin" : "/signup"

        // regex for email &password 
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        // retrieving data from form /linked via ref = authForm
        let form = new FormData(authForm.current)

        // formData is empty object for storing formData
        let formData = {}

        // loop for iterating through the all keys in the form input
        for(let[key, value] of form.entries()){
            // 3 times iteration and then storing in the form of key values
            formData[key] = value
        }





        // to see the form data console
        // console.log(form);
        // console.log(formData);





        // destructure data from the form data userAuthForm
        let {fullname, email, password} = formData

        // form validation in frontend
        if(fullname){
            if(fullname.length < 3){
                return toast.error( "Full name must be at least 3 letters long")
            }
        }
        if(!email){
            return toast.error( "Enter email")
        }
        if(!emailRegex.test(email)){
            return toast.error( "Email is invalid" )
        }
        if(!passwordRegex.test(password)){
            return toast.error( "Password should be 6 to 20  character long with a numeric, 1 lowercase and 1 uppercase letter")
        }



        userAuthThroughServer(serverRoute, formData)
        
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
                // ref hook for the reference in the react hook
                    ref={authForm}
                    action=""
                    className="w-[80%] max-w-[400px] "
                    >
                        
                    <h1 className="text-4xl font-gelasio  text-center mb-24">
                        {type == "sign-in" ? "We’ve been waiting for you" : "Become part of the community"}
                    </h1>

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
                        onClick={handleSubmit}
                        >
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
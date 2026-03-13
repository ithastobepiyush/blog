import { Link } from "react-router-dom"
import InputBox from "../components/input.component"
import googleIcon from "../imgs/google.png"
import AnimationWrapper from "../common/page-animation"
import { useRef } from "react"

const UserAuthForm = ({ type }) => {

    // auth form storing form via refernce(ref) in form
    const authForm = useRef()

    // handleing click events of submit button ----->
    const handleSubmit = (e) =>{

        e.preventDefault()


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
        console.log(formData);
        // console.log(form);


        // destructure data from the form data userAuthForm
        let {fullname, email, password} = formData

        // form validation in frontend
        if(fullname){
            if(fullname.length < 3){
                return console.log({ "error": "Full name must be at least 3 letters long" })
            }
        }
        if(!email){
            return console.log({ "error": "Enter email" })
        }
        if(!emailRegex.test(email)){
            return console.log({ "error": "Email is invalid "})
        }
        if(!passwordRegex.test(password)){
            return console.log({ "error": "Password should be 6 to 20  character long with a numeric, 1 lowercase and 1 uppercase letter" })
        }
        
    }

    return(
        // to make the animation consistent throught the pages
        <AnimationWrapper keyValue={type}>
            {/* Section of Form for user authentication [signin/signup] */}
            <section className="h-cover flex items-center justify-center">

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
import { Link } from "react-router-dom"
import InputBox from "../components/input.component"
import googleIcon from "../imgs/google.png"


const UserAuthForm = ({ type }) => {
    return(
        <section className="h-cover flex items-center justify-center">

            <form action="" className="w-[80%] max-w-[400px] ">
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
                        placeholder="Password"
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
    )
}

export default UserAuthForm
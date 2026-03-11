import InputBox from "../components/input.component"


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

                <div></div>
                
                
            </form>

        </section>
    )
}

export default UserAuthForm
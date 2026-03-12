import { useState } from "react"

const InputBox = ({name, type, id, value, placeholder, icon} ) => {

    const [passwordVisible, setpasswordVisible] = useState(false)

    return(
        <div className="relative w-full mb-4 ">
            <input
                name={name}
                // condition when to show password on clickevent of icon
                type={type == "password" ? passwordVisible ? "text" : "password" : type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box"
            />
            <i className={icon +" input-icon"}></i>


            {/* Condition for password field when to modify type/ when to show password or when to not */}
            {
                type == "password" ?
                <i
                    className={"fi fi-rr-eye" +(!passwordVisible ? "-crossed" : "" ) + " input-icon left-auto right-3 cursor-pointer"}
                    // click event trigger
                    onClick={() => setpasswordVisible(currentVal => !currentVal)}
                ></i>
                : ""
            }

        </div>
    )
}

export default InputBox
/**
 * @file input.component.jsx
 * @description Reusable generic input field component utilized primarily in forms (like Sign In / Sign Up).
 * 
 * Features:
 * - Supports dynamic icons.
 * - Handles visibility toggle for password fields.
 */
import { useState } from "react"

/**
 * @function InputBox
 * @param {Object} props
 * @param {string} props.name - The name attribute for the input (used for form data extraction).
 * @param {string} props.type - The input type (e.g., "text", "email", "password").
 * @param {string} props.id - Optional ID for the element.
 * @param {string} props.value - Default injected value.
 * @param {string} props.placeholder - Placeholder text inside the input.
 * @param {string} props.icon - CSS class name for the Flaticon icon.
 */
const InputBox = ({name, type, id, value, placeholder, icon} ) => {

    /**
     * Local State: Tracks whether the password text should be visible or hidden.
     * Only relevant if the initial `type` prop is "password".
     */
    const [passwordVisible, setpasswordVisible] = useState(false)

    return(
        <div className="relative w-[100%] mb-4">
            
            {/* The primary input element */}
            <input
                name={name}
                // Logic: If it's a password field, toggle between "text" and "password" based on state. 
                // Otherwise, use the original type passed via props.
                type={type == "password" ? passwordVisible ? "text" : "password" : type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box"
            />
            {/* Left-aligned Icon for the input field */}
            <i className={icon + " input-icon"}></i>

            {/* Condition: Only render the eyeball icon if this is a password field */}
            {
                type == "password" ?
                <i
                    className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-auto right-3 cursor-pointer"}
                    // Click event trigger: Toggles password visibility state
                    onClick={() => setpasswordVisible(currentVal => !currentVal)}
                ></i>
                : ""
            }

        </div>
    )
}

export default InputBox
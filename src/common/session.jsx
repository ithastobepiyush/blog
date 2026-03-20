/**
 * @file session.jsx
 * @description Utility functions for interacting with the browser's sessionStorage.
 * 
 * Purpose:
 * Abstracts the native sessionStorage API for easier and safer data storage, retrieval, and cleanup.
 */

/**
 * @function storeInSession
 * @description Stores a key-value pair in sessionStorage.
 * @param {string} key 
 * @param {string} value 
 */
const storeInSession = (key, value) => {
    return sessionStorage.setItem(key, value)
}

/**
 * @function lookInSession
 * @description Retrieves a value from sessionStorage by its key.
 * @param {string} key 
 * @returns {string|null} The stored value or null if not found.
 */
const lookInSession = (key) => {
    return sessionStorage.getItem(key)
}

/**
 * @function removeFromSession
 * @description Removes a specific item from sessionStorage.
 * @param {string} key 
 */
const removeFromSession = (key) => {
    return sessionStorage.removeItem(key)
}

/**
 * @function logOutUser
 * @description Clears all data from sessionStorage entirely.
 */
const logOutUser = () => {
    sessionStorage.clear()
}

export {storeInSession, lookInSession, removeFromSession, logOutUser}
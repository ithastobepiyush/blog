/**
 * @file page-animation.jsx
 * @description A reusable wrapper component that applies enter/exit animations to its children using Framer Motion.
 * 
 * Usage:
 * Wraps page-level components or conditional UI elements (like dropdowns) to provide smooth transitions.
 */
import {animate, AnimatePresence, motion} from "framer-motion"

/**
 * @function AnimationWrapper
 * @param {Object} props
 * @param {ReactNode} props.children - The child components to be animated.
 * @param {string} props.keyValue - Unique key to help Framer Motion track component changes.
 * @param {Object} props.initial - Starting animation state (default: opacity 0).
 * @param {Object} props.animate - Ending animation state (default: opacity 1).
 * @param {Object} props.transition - Transition config (default: 1 second duration).
 * @param {string} props.className - Additional CSS classes.
 */
const AnimationWrapper = (
    {
        children,
        keyValue,
        initial={opacity:0},
        animate={opacity:1},
        transition={duration:1},
        className
    }) => {
        return(
            // AnimatePresence allows components to animate out when they're removed from the React tree.
            <AnimatePresence>
                <motion.div
                    key={keyValue}
                    initial={initial}
                    animate={animate}
                    transition={transition}
                    className={className}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
    )
}

export default AnimationWrapper
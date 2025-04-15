/** 
 * @file 
 * @description A custom React hook that detects whether the user is on a mobile device 
 * based on the window's width, using a media query to check for screens smaller than 768px.
 */

import * as React from "react"; // Import React for using hooks

// Mobile breakpoint for screen width (in pixels)
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // State to store whether the device is mobile or not
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  // Effect hook to listen for window size changes and update the isMobile state
  React.useEffect(() => {
    // Create a media query listener to check for devices smaller than the mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Handler to update the isMobile state when the window size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); // Set isMobile based on window width
    };

    // Add the event listener for the change in media query
    mql.addEventListener("change", onChange);

    // Initial check: Set the state based on the current window width
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup function to remove the event listener when the component unmounts
    return () => mql.removeEventListener("change", onChange);
  }, []); // Empty dependency array ensures the effect only runs once on mount

  // Return the boolean value indicating if the device is mobile (converts undefined to false)
  return !!isMobile;
}

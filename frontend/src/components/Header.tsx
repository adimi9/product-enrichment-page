/** 
 * @file Header.tsx 
 * @description This component represents the header of the application. It displays the title "AI Product Hub" and conditionally renders either a "Logout" button (if the user is logged in) or a "Login" button (if the user is not logged in). It also handles user logout by clearing the tokens from localStorage and navigating to the login page.
 */

import React from 'react';
import { Button } from "@/components/ui/button";  // Importing the Button component for UI elements
import { Link, useNavigate } from 'react-router-dom';  // Importing navigation hooks for routing

const Header: React.FC = () => {
  // Using useNavigate to navigate to different routes
  const navigate = useNavigate();
  
  // Check if the user is logged in by checking for an access token in localStorage
  const isLoggedIn = !!localStorage.getItem('access_token');

  // Function to handle the logout action
  const handleLogout = () => {
    // Remove the access and refresh tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Navigate to the login page after logout
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      {/* Header title */}
      <h1 className="text-2xl font-semibold text-gray-800">AI Product Hub</h1>
      
      {/* Conditionally render either the Logout button or the Login button */}
      {isLoggedIn ? (
        // If logged in, show the Logout button
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
          Logout
        </Button>
      ) : (
        // If not logged in, show a link to the login page
        <Link to="/login">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Login
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;

/** 
 * @file App.tsx 
 * @description This is the main entry point for the application. It sets up the global context, routes, and UI providers such as toast notifications and tooltips. The app uses React Router for navigation and React Query for data fetching and caching.
 */

import { Toaster } from "@/components/ui/toaster";  // Import Toaster component for global notifications
import { Toaster as Sonner } from "@/components/ui/sonner";  // Import Sonner toast (for another type of toast) with an alias
import { TooltipProvider } from "@/components/ui/tooltip";  // Import TooltipProvider for tooltips
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";  // Import React Query client for global state management and caching

import { BrowserRouter, Routes, Route } from "react-router-dom";  // Import BrowserRouter for routing, and Routes/Route for defining routes
import Index from "./pages/Index";  // Main landing page component
import Register from "./pages/Register";  // Register page component
import Login from "./pages/Login";  // Login page component
import NotFound from "./pages/NotFound";  // NotFound page component for unknown routes

// Create a new QueryClient instance for React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>  {/* Provides the QueryClient context to the app */}
    <TooltipProvider>  {/* Provides the Tooltip context to the app */}
      <Toaster />  {/* Renders the main toast notifications */}
      <Sonner position="top-center" />  {/* Renders Sonner toast notifications at the top-center */}
      
      <BrowserRouter>  {/* Wraps the app in the router for navigation */}
        <Routes>
          {/* Define application routes */}
          <Route path="/" element={<Index />} />  {/* Home page */}
          <Route path="/login" element={<Login />} />  {/* Login page */}
          <Route path="/register" element={<Register />} />  {/* Register page */}
          <Route path="*" element={<NotFound />} />  {/* Catch-all route for unknown paths (404 page) */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

/** 
 * @file Login.tsx
 * @description Login screen for authenticating users and storing access tokens.
 */

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const apiUrl = import.meta.env.VITE_API_URL;

const Login: React.FC = () => {
  // Local state for user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state while login request is processing

    try {
      // Send login credentials to backend API
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      });

      // Store access token in local storage
      localStorage.setItem('access_token', response.data.access);
      toast.success('Login successful!');
      
      // Navigate to main page after successful login
      navigate('/main'); 
    } catch (error: any) {
      // Display error message if login fails
      const errMsg =
        error.response?.data?.detail || 'Invalid credentials. Please try again.';
      toast.error(errMsg);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white w-full" 
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register Here
          </Link>

          <p className="mt-3 text-xs text-gray-500">
            For demo access, use <span className="font-medium">user@example.com</span> / <span className="font-medium">password</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

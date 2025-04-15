import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import Header from '@/components/Header';

const apiUrl = import.meta.env.VITE_API_URL;

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/register`, {
        email,
        password
      });

      toast.success('Registration successful! Please log in.');
      navigate('/login'); // Redirect to login page
    } catch (error: any) {
      const errMsg =
        error.response?.data?.detail || 'Registration failed. Please try again.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register</h2>
      <form onSubmit={handleRegister}>
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
        <div className="mb-4">
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <div className="mt-6 text-center text-sm text-gray-600">
        <span>Already have an account? </span>
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Login Here
        </Link>
      </div>
      </form>
    </div>
    </>
  );
};

export default Register;

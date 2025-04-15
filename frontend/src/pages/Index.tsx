
import React from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;

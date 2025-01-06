import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { AuthForm } from './components/auth/AuthForm';
import { Watermark } from './components/ui/Watermark';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/login" element={<AuthForm type="login" />} />
            <Route path="/register" element={<AuthForm type="register" />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Watermark />
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin/login')}
      className="fixed top-4 left-4 p-3 rounded-full bg-black/30 hover:bg-black/40 transition-colors duration-300 backdrop-blur-sm z-50 shadow-lg"
      aria-label="Admin Login"
    >
      <Settings className="w-6 h-6 text-white" />
    </button>
  );
}
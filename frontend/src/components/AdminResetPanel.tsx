'use client';

import { useState } from 'react';
import { Trash2, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';

interface ResetPanelProps {
  onDataChange?: () => void;
}

export default function AdminResetPanel({ onDataChange }: ResetPanelProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleReset = async (type: string, endpoint: string) => {
    setIsLoading(type);
    setMessage(null);

    try {
      const response = await fetch(`https://web-xplc.onrender.com/api/reset${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        showMessage('success', data.message);
        if (onDataChange) onDataChange();
      } else {
        showMessage('error', data.error || 'Failed to reset data');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleSeed = async () => {
    setIsLoading('seed');
    setMessage(null);

    try {
      const response = await fetch('https://web-xplc.onrender.com/api/reset/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        showMessage('success', data.message);
        if (onDataChange) onDataChange();
      } else {
        showMessage('error', data.error || 'Failed to seed data');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const resetButtons = [
    { type: 'students', endpoint: '/students', label: 'Reset Students', icon: '👨‍🎓' },
    { type: 'teachers', endpoint: '/teachers', label: 'Reset Teachers', icon: '👩‍🏫' },
    { type: 'articles', endpoint: '/articles', label: 'Reset Articles', icon: '📝' },
    { type: 'gallery', endpoint: '/gallery', label: 'Reset Gallery', icon: '🖼️' },
    { type: 'leadership', endpoint: '/leadership', label: 'Reset Leadership', icon: '👑' },
    { type: 'settings', endpoint: '/settings', label: 'Reset Settings', icon: '⚙️' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <RotateCcw className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold text-gray-900">Database Reset Panel</h2>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resetButtons.map((button) => (
            <button
              key={button.type}
              onClick={() => handleReset(button.type, button.endpoint)}
              disabled={isLoading === button.type}
              className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 ${
                isLoading === button.type
                  ? 'border-yellow-300 bg-yellow-50 text-yellow-700'
                  : 'border-red-200 hover:border-red-300 hover:bg-red-50 text-red-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{button.icon}</span>
                <div className="text-left">
                  <div className="font-medium">{button.label}</div>
                  <div className="text-sm opacity-75">
                    {isLoading === button.type ? 'Resetting...' : 'Click to reset'}
                  </div>
                </div>
                {isLoading === button.type ? (
                  <div className="ml-auto">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
                  </div>
                ) : (
                  <Trash2 className="w-5 h-5 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Reset Everything</h3>
              <p className="text-sm text-gray-600">This will delete ALL data from the database</p>
            </div>
            <button
              onClick={() => handleReset('all', '/all')}
              disabled={isLoading === 'all'}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isLoading === 'all'
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  : 'bg-red-600 text-white hover:bg-red-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading === 'all' ? 'Resetting...' : 'Reset All Data'}
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Seed Sample Data</h3>
              <p className="text-sm text-gray-600">Add 5 students, 2 teachers, and sample content</p>
            </div>
            <button
              onClick={handleSeed}
              disabled={isLoading === 'seed'}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isLoading === 'seed'
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  : 'bg-green-600 text-white hover:bg-green-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading === 'seed' ? 'Seeding...' : 'Seed Data'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <strong>Warning:</strong> These actions cannot be undone. Make sure you have backed up any important data before proceeding.
          </div>
        </div>
      </div>
    </div>
  );
}
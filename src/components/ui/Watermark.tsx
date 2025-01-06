import React from 'react';

export function Watermark() {
  return (
    <div className="fixed bottom-4 right-4 text-sm text-gray-500 opacity-75">
      <a 
        href="https://github.com/Taki-Monroe" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-indigo-600 transition-colors"
      >
        Created by Taki Monroe
      </a>
    </div>
  );
}
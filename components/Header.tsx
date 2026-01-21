
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          TOEFL ITP Learning Hub
        </h1>
        <p className="mt-1 text-slate-600">
          Your AI-powered guide to mastering the TOEFL ITP test.
        </p>
      </div>
    </header>
  );
};

export default Header;

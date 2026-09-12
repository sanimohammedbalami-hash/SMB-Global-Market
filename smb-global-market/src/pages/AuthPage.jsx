import React from 'react';

function AuthPage({ onLogin, lang, setLang }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-6 max-w-md mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="text-center">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-2">
            🛍️
          </div>
          <h2 className="text-lg font-black text-gray-800">
            {lang === 'ha' ? 'Shiga SMB Global Market' : 'Sign in to SMB Global Market'}
          </h2>
        </div>

        <div className="space-y-3">
          <input type="text" placeholder="Phone / Email" className="w-full border rounded-xl p-2.5 text-xs" />
          <input type="password" placeholder="Password" className="w-full border rounded-xl p-2.5 text-xs" />
        </div>

        <button onClick={onLogin} className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md">
          {lang === 'ha' ? 'Shiga (Login)' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;

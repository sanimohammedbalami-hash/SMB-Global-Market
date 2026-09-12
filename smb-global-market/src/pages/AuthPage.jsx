import React from 'react';

function AuthPage({ onLogin, lang, setLang }) {
  return (
    <div className="p-6 flex flex-col justify-center min-h-screen bg-emerald-900 text-white text-center">
      <h1 className="text-2xl font-bold mb-2">SMB Global Market</h1>
      <p className="text-xs text-emerald-200 mb-6">{lang === 'ha' ? 'Barka da zuwa! Da fatan za ka shiga asusunka.' : 'Welcome! Please sign in.'}</p>
      <button
        onClick={onLogin}
        className="bg-white text-emerald-900 font-bold py-3 px-6 rounded-xl shadow-lg text-sm mb-4"
      >
        {lang === 'ha' ? 'Shiga (Login)' : 'Login'}
      </button>
      <button
        onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
        className="text-xs text-emerald-200 underline"
      >
        {lang === 'en' ? 'Sauya Harshe zuwa Hausa' : 'Switch to English'}
      </button>
    </div>
  );
}

export default AuthPage;

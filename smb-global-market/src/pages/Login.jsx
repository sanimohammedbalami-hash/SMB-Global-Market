import React, { useState } from 'react';

function Login({ onNavigate, lang, setLang }) {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your SMB Global Market account',
      identifierLabel: 'Email or Phone Number',
      password: 'Password',
      button: 'Sign In',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up'
    },
    ha: {
      title: 'Barka da Sake Dawowa',
      subtitle: 'Shiga asusunka na SMB Global Market',
      identifierLabel: 'Email ko Lambar Waya',
      password: 'Kalmar Sirri (Password)',
      button: 'Shiga',
      noAccount: 'Baka da asusu?',
      signUp: 'Yi Rijista'
    }
  };

  const t = content[lang] || content.en;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let extractedName = formData.identifier.split('@')[0];
    extractedName = extractedName ? extractedName.charAt(0).toUpperCase() + extractedName.slice(1) : 'Customer';
    
    if (onNavigate) {
      onNavigate('home', { name: extractedName });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
        >
          {lang === 'en' ? '🇳🇬 Hausa' : '🇬🇧 English'}
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {t.title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t.subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.identifierLabel}</label>
              <input
                type="text"
                name="identifier"
                required
                value={formData.identifier}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
                placeholder="Ali, Adamu, ko example@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">{t.password}</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-md shadow transition duration-200"
            >
              {t.button}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t.noAccount}{' '}
              <button
                onClick={() => onNavigate && onNavigate('register')}
                className="font-medium text-emerald-700 hover:underline"
              >
                {t.signUp}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

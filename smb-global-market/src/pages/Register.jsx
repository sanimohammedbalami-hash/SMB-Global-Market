import React, { useState } from 'react';

function Register({ onNavigate, lang, setLang }) {
  const [usePhone, setUsePhone] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    password: ''
  });

  const content = {
    en: {
      title: 'Create Account',
      subtitle: 'Join SMB Global Market today',
      fullName: 'Full Name',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone Number',
      switchPhone: 'Use Phone Number instead',
      switchEmail: 'Use Email Address instead',
      password: 'Password',
      button: 'Sign Up',
      alreadyAccount: 'Already have an account?',
      signIn: 'Sign In'
    },
    ha: {
      title: 'Ƙirƙiri Asusu',
      subtitle: 'Shiga SMB Global Market a yau',
      fullName: 'Cikakken Suna',
      emailLabel: 'Adireshin Email',
      phoneLabel: 'Lambar Waya',
      switchPhone: 'Yi amfani da Lambar Waya',
      switchEmail: 'Yi amfani da Email Address',
      password: 'Kalmar Sirri (Password)',
      button: 'Rijista',
      alreadyAccount: 'Tuni kana da asusu?',
      signIn: 'Shiga'
    }
  };

  const t = content[lang] || content.en;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerName = formData.fullName.trim() || 'Customer';
    if (onNavigate) {
      onNavigate('home', { name: customerName });
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
              <label className="block text-sm font-medium text-gray-700">{t.fullName}</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
                placeholder="e.g. Ali, Adamu, Aisha"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  {usePhone ? t.phoneLabel : t.emailLabel}
                </label>
                <button
                  type="button"
                  onClick={() => setUsePhone(!usePhone)}
                  className="text-xs text-emerald-700 font-medium hover:underline"
                >
                  {usePhone ? t.switchEmail : t.switchPhone}
                </button>
              </div>
              <input
                type={usePhone ? 'tel' : 'email'}
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
                placeholder={usePhone ? '08012345678' : 'example@gmail.com'}
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
              {t.alreadyAccount}{' '}
              <button
                onClick={() => onNavigate && onNavigate('login')}
                className="font-medium text-emerald-700 hover:underline"
              >
                {t.signIn}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

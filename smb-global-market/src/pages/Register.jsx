import React, { useState } from 'react';

function Register({ onNavigate, lang, setLang }) {
  const [regType, setRegType] = useState('phone'); // 'phone' or 'email'
  const [formData, setFormData] = useState({
    fullName: '',
    contactInput: '',
    password: ''
  });

  const content = {
    en: {
      title: 'Create your account',
      subtitle: 'Join SMB Global Market today',
      fullName: 'Full Name',
      usePhone: 'Use Phone Number',
      useEmail: 'Use Email Address',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email Address',
      password: 'Password',
      button: 'Sign Up',
      hasAccount: 'Already have an account?',
      login: 'Log In',
      alertMsg: 'Registration successful!'
    },
    ha: {
      title: 'Ƙirƙiri asusunka',
      subtitle: 'Kasance tare da SMB Global Market a yau',
      fullName: 'Cikakken Suna',
      usePhone: 'Yi amfani da Lambar Waya',
      useEmail: 'Yi amfani da Email',
      phoneLabel: 'Lambar Waya',
      emailLabel: 'Adireshin Email',
      password: 'Kalmar Sirri (Password)',
      button: 'Yi Rijista',
      hasAccount: 'Kana da asusu a baya?',
      login: 'Shiga',
      alertMsg: 'Rijista ta yi nasara!'
    }
  };

  const t = content[lang] || content.en;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t.alertMsg);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-10 px-6 relative">
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

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <div className="flex justify-center mb-6 border-b pb-3 space-x-4">
            <button
              type="button"
              onClick={() => { setRegType('phone'); setFormData({ ...formData, contactInput: '' }); }}
              className={`pb-1 text-sm font-semibold ${regType === 'phone' ? 'border-b-2 border-emerald-700 text-emerald-700' : 'text-gray-500'}`}
            >
              {t.usePhone}
            </button>
            <button
              type="button"
              onClick={() => { setRegType('email'); setFormData({ ...formData, contactInput: '' }); }}
              className={`pb-1 text-sm font-semibold ${regType === 'email' ? 'border-b-2 border-emerald-700 text-emerald-700' : 'text-gray-500'}`}
            >
              {t.useEmail}
            </button>
          </div>

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
                placeholder="Sani Mohammed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {regType === 'phone' ? t.phoneLabel : t.emailLabel}
              </label>
              <input
                type={regType === 'phone' ? 'tel' : 'email'}
                name="contactInput"
                required
                value={formData.contactInput}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
                placeholder={regType === 'phone' ? '+234...' : 'example@gmail.com'}
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
              {t.hasAccount}{' '}
              <button
                onClick={() => onNavigate && onNavigate('login')}
                className="font-medium text-emerald-700 hover:underline"
              >
                {t.login}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

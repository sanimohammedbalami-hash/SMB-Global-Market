import React, { useState } from 'react';

function RegisterPage({ onRegister, onGoToLogin, lang }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName && phone && password) {
      onRegister(phone);
    } else {
      alert(lang === 'ha' ? 'Tabbatar ka cika dukkan bayanan' : 'Please complete all required fields');
    }
  };

  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col justify-center p-6 max-w-md mx-auto text-white">
      <div className="bg-white text-gray-800 p-6 rounded-3xl shadow-2xl space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-black text-gray-800">
            {lang === 'ha' ? 'Yi Sabuwar Rijista' : 'Create an Account'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">SMB Global Market</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-gray-600 block mb-1">
              {lang === 'ha' ? 'Cikakken Suna' : 'Full Name'}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Sani Achibu"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-800 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-600 block mb-1">
              {lang === 'ha' ? 'Lambar Waya' : 'Phone Number'}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09025777951"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-800 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-600 block mb-1">
              {lang === 'ha' ? 'Email (Na zaɓi)' : 'Email (Optional)'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sani@example.com"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-800 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-600 block mb-1">
              {lang === 'ha' ? 'Mabuɗi (Password)' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-800 bg-gray-50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-lg hover:bg-emerald-900 transition mt-2"
          >
            {lang === 'ha' ? 'Kammala Rijista' : 'Register Account'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {lang === 'ha' ? 'Rai da asusu?' : 'Already have an account?'}{' '}
            <button onClick={onGoToLogin} className="text-emerald-800 font-bold hover:underline">
              {lang === 'ha' ? 'Shiga (Login)' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

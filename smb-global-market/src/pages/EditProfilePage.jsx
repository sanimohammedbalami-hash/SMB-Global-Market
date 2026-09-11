import React, { useState } from 'react';

function EditProfilePage({ onNavigate, lang, setLang, user }) {
  const [name, setName] = useState(user && user.name ? user.name : 'Sani Achibu');
  const [email, setEmail] = useState('saniachibu@gmail.com');
  const [phone, setPhone] = useState('+234 801 234 5678');
  const [address, setAddress] = useState('Kano, Nigeria');

  const content = {
    en: {
      title: 'Edit Profile',
      fullName: 'Full Name',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone Number',
      addressLabel: 'Delivery Address',
      saveBtn: 'Save Changes',
      successMsg: 'Profile updated successfully!'
    },
    ha: {
      title: 'Sauya Bayanan Kanka',
      fullName: 'Cikakken Suna',
      emailLabel: 'Adireshin Email',
      phoneLabel: 'Lambar Waya',
      addressLabel: 'Adireshin Isar da Saƙo',
      saveBtn: 'Ajiye Sauye-sauye',
      successMsg: 'An sabunta bayanan kanka cikin nasara!'
    }
  };

  const t = content[lang] || content.en;

  const handleSave = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('account', { name, email, phone, address });
    }
    alert(t.successMsg);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Header */}
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <button
          onClick={() => onNavigate && onNavigate('account')}
          className="text-sm font-bold bg-emerald-800 px-3 py-1 rounded-lg"
        >
          ‹ {lang === 'ha' ? 'Koma' : 'Back'}
        </button>
        <h1 className="text-sm font-bold">{t.title}</h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
        >
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      <div className="p-4">
        <form onSubmit={handleSave} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t.fullName}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t.emailLabel}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t.phoneLabel}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t.addressLabel}</label>
            <textarea
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-900 transition mt-2"
          >
            {t.saveBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;

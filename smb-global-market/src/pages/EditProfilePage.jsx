import React from 'react';

function EditProfilePage({ onNavigate, lang }) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button onClick={() => onNavigate('account')} className="text-emerald-800 text-xs font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma Asusu' : 'Back to Account'}
      </button>
      <h1 className="text-base font-extrabold text-gray-800 mb-4">{lang === 'ha' ? 'Gyara Bayanai' : 'Edit Profile'}</h1>

      <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
        <div>
          <label className="text-[10px] font-bold text-gray-600 block mb-1">Sunan Cikakken</label>
          <input type="text" defaultValue="Sani Mohammed" className="w-full border rounded-lg p-2 text-xs" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-600 block mb-1">Lambar Waya</label>
          <input type="text" defaultValue="08012345678" className="w-full border rounded-lg p-2 text-xs" />
        </div>
        <button onClick={() => onNavigate('account')} className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs">
          {lang === 'ha' ? 'Ajiye Gyara' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

export default EditProfilePage;

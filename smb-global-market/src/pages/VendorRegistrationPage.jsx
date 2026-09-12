import React, { useState } from 'react';

function VendorRegistrationPage({ onNavigate, lang }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onNavigate('vendor-dashboard');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen max-w-md mx-auto p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('vendor-login')} className="text-gray-700 text-lg font-bold">
            ←
          </button>
          <h2 className="text-sm font-bold text-gray-800">
            {lang === 'ha' ? 'Rajistar Mai Siyarwa' : 'Vendor Registration'}
          </h2>
        </div>

        <form onSubmit={handleNext} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'ha' ? 'Sunan Kasuwanci / Shago *' : 'Business Name *'}
                </label>
                <input
                  type="text"
                  name="businessName"
                  required
                  placeholder="e.g. Ahmed Fashion Store"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'ha' ? 'Rukunin Kasuwanci *' : 'Business Type *'}
                </label>
                <select
                  name="businessType"
                  required
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:outline-none"
                >
                  <option value="">{lang === 'ha' ? 'Zaɓi rukunin kasuwanci' : 'Select business type'}</option>
                  <option value="fashion">Fashion & Clothing</option>
                  <option value="electronics">Electronics</option>
                  <option value="beauty">Beauty & Cosmetics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'ha' ? 'Imeel *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'ha' ? 'Lambar Waya *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+234 801 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:outline-none"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-3 py-4 text-center text-xs text-gray-600">
              <p className="font-bold text-emerald-800">{lang === 'ha' ? 'Bayanin Adireshin Shago' : 'Store Address Details'}</p>
              <input
                type="text"
                placeholder={lang === 'ha' ? 'Adireshin Shago (kamar Kano, Nigeria)' : 'Store Address'}
                className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 py-4 text-center text-xs text-gray-600">
              <p className="font-bold text-emerald-800">{lang === 'ha' ? 'Sanya Takardar Shaidar Kasuwanci' : 'Upload Verification Documents'}</p>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-white">
                <span>📄 {lang === 'ha' ? 'Latsa nan domin sanya takarda' : 'Click to upload document'}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-800 text-white font-bold py-3 rounded-lg text-xs hover:bg-emerald-700 shadow-sm transition mt-4"
          >
            {step === 3 
              ? (lang === 'ha' ? 'Tura Rajista' : 'Submit Application') 
              : (lang === 'ha' ? 'Gaba (Next)' : 'Next')}
          </button>
        </form>
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-gray-600">
          {lang === 'ha' ? 'Kuna da asusu a raye?' : 'Already have an account?'}{' '}
          <button
            onClick={() => onNavigate('vendor-login')}
            className="text-emerald-800 font-bold hover:underline"
          >
            {lang === 'ha' ? 'Shiga (Login)' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default VendorRegistrationPage;

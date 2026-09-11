import React from 'react';

function OnboardingScreen({ onNavigate, lang, setLang }) {
  const content = {
    en: {
      title: 'Welcome to SMB Global Market',
      subtitle: 'Discover quality products from trusted vendors around the world.',
      getStarted: 'Get Started',
      alreadyAccount: 'I Already Have An Account'
    },
    ha: {
      title: 'Barka da zuwa SMB Global Market',
      subtitle: 'Nemi samfurai masu inganci daga yan kasuwa abin amincewa a fadin duniya.',
      getStarted: 'Fara Amfani',
      alreadyAccount: 'Ina da Asusu A Baya'
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
        >
          {lang === 'en' ? '🇳🇬 Hausa' : '🇬🇧 English'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center mt-12">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-emerald-800 font-bold text-2xl">SMB</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {t.title}
        </h1>
        <p className="text-gray-500 text-sm max-w-xs">
          {t.subtitle}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <button
          onClick={() => onNavigate && onNavigate('register')}
          className="w-full py-3.5 bg-emerald-800 text-white font-medium rounded-xl hover:bg-emerald-900 transition"
        >
          {t.getStarted}
        </button>
        <button
          onClick={() => onNavigate && onNavigate('login')}
          className="w-full py-3.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
        >
          {t.alreadyAccount}
        </button>
      </div>
    </div>
  );
}

export default OnboardingScreen;

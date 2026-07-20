import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import FarmerPortal from './components/FarmerPortal';
import RegistrationForm from './components/RegistrationForm';
import Marketplace from './components/Marketplace';
import Footer from './components/Footer';
import { Farmer } from './types';
import { User, LogIn, CreditCard } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    const path = window.location.pathname;
    if (path === '/gallery') return 'gallery';
    if (path === '/services') return 'services';
    if (path === '/contact') return 'contact';
    if (path === '/portal') return 'portal';
    if (path === '/shop') return 'shop';
    return 'home';
  });
  const [loggedInFarmer, setLoggedInFarmer] = useState<Farmer | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  useEffect(() => {
    const path = activeTab === 'home' ? '/' : `/${activeTab}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  }, [activeTab]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/gallery') setActiveTab('gallery');
      else if (path === '/services') setActiveTab('services');
      else if (path === '/contact') setActiveTab('contact');
      else if (path === '/portal') setActiveTab('portal');
      else if (path === '/shop') setActiveTab('shop');
      else setActiveTab('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = (farmer: Farmer | null) => {
    setLoggedInFarmer(farmer);
    if (farmer) {
      setActiveTab('portal');
      setShowRegisterForm(false);
    }
  };

  const handleRegisterSuccess = (farmer: Farmer) => {
    setLoggedInFarmer(farmer);
    setActiveTab('portal');
    setShowRegisterForm(false);
  };

  const handleOpenRegister = () => {
    setShowRegisterForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelRegister = () => {
    setShowRegisterForm(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Primary Header Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setShowRegisterForm(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        loggedInFarmer={loggedInFarmer}
        onLogin={handleLogin}
        onOpenRegister={handleOpenRegister}
      />

      {/* Main App Body Router */}
      <main className="flex-grow">
        {showRegisterForm ? (
          <RegistrationForm
            onRegisterSuccess={handleRegisterSuccess}
            onCancel={handleCancelRegister}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <Hero
                onJoinClick={handleOpenRegister}
                onPortalClick={() => {
                  if (loggedInFarmer) {
                    setActiveTab('portal');
                  } else {
                    // Triggers the Header login modal via portal navigation prompting
                    setActiveTab('portal');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreServices={() => {
                  setActiveTab('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onContactClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'services' && <Services />}

            {activeTab === 'portal' && (
              <>
                {loggedInFarmer ? (
                  <FarmerPortal farmer={loggedInFarmer} />
                ) : (
                  /* Login prompting screen when not logged in and visiting the portal */
                  <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
                    <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                      <User className="h-10 w-10 text-emerald-700" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-extrabold text-stone-900 font-sans tracking-tight">Farmer Member Portal</h2>
                      <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                        Verify your Membership ID to track raw milk delivery registers, bulk grain storage receipts, active fertilizer advances, or request veterinaries.
                      </p>
                    </div>

                    <div className="flex flex-col space-y-3 pt-4">
                      {/* Note: This button triggers the Header login modal */}
                      <button
                        onClick={() => {
                          const loginBtn = document.querySelector('[title="Member Dashboard"]') as HTMLButtonElement || 
                                           Array.from(document.querySelectorAll('button')).find(el => el.textContent?.includes('Farmer Portal Login'));
                          if (loginBtn) {
                            loginBtn.click();
                          }
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow transition-all flex items-center justify-center space-x-2"
                      >
                        <LogIn className="h-4.5 w-4.5" />
                        <span>Sign In with Member ID</span>
                      </button>

                      <button
                        onClick={handleOpenRegister}
                        className="border border-stone-200 hover:bg-stone-50 text-stone-600 font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center space-x-2"
                      >
                        <CreditCard className="h-4.5 w-4.5" />
                        <span>Apply for Membership Card</span>
                      </button>
                    </div>

                    <div className="text-4xs text-stone-400 pt-2 font-mono">
                      Demo IDs for evaluation: <strong className="text-emerald-700">KF-2041</strong>, <strong className="text-emerald-700">KF-3011</strong>, or <strong className="text-emerald-700">KF-1052</strong>.
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'shop' && <Marketplace />}
            {activeTab === 'gallery' && <Gallery />}
            {activeTab === 'contact' && <Contact />}
          </>
        )}
      </main>

      {/* Primary Footer */}
      <Footer setActiveTab={(tab) => {
        setActiveTab(tab);
        setShowRegisterForm(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}

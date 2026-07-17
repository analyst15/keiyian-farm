import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogIn, ChevronDown, LogOut, Info, ShieldAlert, Mail, MapPin, Facebook, Twitter, Instagram, Search, ShoppingBag, Phone } from 'lucide-react';
import { Farmer } from '../types';
import { getFarmers } from '../data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loggedInFarmer: Farmer | null;
  onLogin: (farmer: Farmer | null) => void;
  onOpenRegister: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  loggedInFarmer,
  onLogin,
  onOpenRegister
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedFarmerId, setSelectedFarmerId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [farmersList, setFarmersList] = useState<Farmer[]>([]);

  useEffect(() => {
    setFarmersList(getFarmers());
  }, [showLoginModal]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarmerId) {
      setErrorMsg('Please select or enter your Member ID');
      return;
    }

    const currentFarmers = getFarmers();
    const found = currentFarmers.find(
      (f) => f.id.toLowerCase() === selectedFarmerId.trim().toLowerCase()
    );

    if (found) {
      onLogin(found);
      setShowLoginModal(false);
      setSelectedFarmerId('');
      setErrorMsg('');
      setActiveTab('portal'); // auto route to portal
    } else {
      setErrorMsg('Member ID not found. Try KF-2041, KF-3011, or register as a new member.');
    }
  };

  const handleQuickLogin = (id: string) => {
    const currentFarmers = getFarmers();
    const found = currentFarmers.find((f) => f.id === id);
    if (found) {
      onLogin(found);
      setShowLoginModal(false);
      setErrorMsg('');
      setActiveTab('portal');
    }
  };

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSupport, setShowSupport] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', type: 'tab', value: 'home' },
    { id: 'about-us', label: 'About Us', type: 'scroll', targetId: 'about-section' },
    { id: 'why-choose-us', label: 'Why Choose Us', type: 'scroll', targetId: 'why-choose-section' },
    { id: 'our-services', label: 'Our Services', type: 'tab', value: 'services' },
    { id: 'contact-us', label: 'Contact Us', type: 'tab', value: 'contact' },
  ];

  const handleNavItemClick = (item: typeof navItems[0]) => {
    if (item.type === 'tab' && item.value) {
      setActiveTab(item.value);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.type === 'scroll' && item.targetId) {
      setActiveTab('home');
      setTimeout(() => {
        const element = document.getElementById(item.targetId!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-stone-100 font-sans">
      
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          
          {/* 1. Brand Logo (Far Left) */}
          <div 
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Logo.png?alt=media&token=f1b428a9-5c7c-4e0f-b0fd-40d3206ba325"
              alt="Keiyian Farmers Logo"
              className="h-20 w-20 sm:h-26 sm:w-26 object-contain transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* 2. Middle Block (Top Bar Pill + Nav Links) */}
          <div className="hidden md:flex flex-col flex-grow px-6 space-y-3">
            
            {/* Top Bar Pill (styled like the black/dark-green pill in inspo) */}
            <div className="bg-[#0A2218] text-white rounded-full px-6 py-2.5 grid grid-cols-3 items-center text-xs font-sans tracking-wide shadow-inner">
              
              {/* Left Column: Email with increased font and icon sizes */}
              <div className="flex items-center justify-start">
                <a 
                  href="mailto:info@keiyianfarm.co.ke" 
                  className="flex items-center space-x-2 text-stone-300 hover:text-emerald-400 transition-colors animate-fade-in"
                >
                  <Mail className="h-4.5 w-4.5 text-emerald-400 flex-shrink-0" />
                  <span className="font-normal text-[13px] tracking-wide">info@keiyianfarm.co.ke</span>
                </a>
              </div>

              {/* Middle Column: Location perfectly centered, increased font and icon sizes */}
              <div className="flex items-center justify-center space-x-2 text-stone-300">
                <MapPin className="h-4.5 w-4.5 text-emerald-400 flex-shrink-0 animate-pulse" />
                <span className="font-normal text-[13px] tracking-wide">Transmara, Narok, Kenya.</span>
              </div>

              {/* Right Column: Social Media Links */}
              <div className="flex items-center justify-end">
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors">
                    <Facebook className="h-4 w-4" />
                  </a>
                  {/* Modern X (Formerly Twitter) Custom SVG */}
                  <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors" title="X (Twitter)">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors">
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Row 2: Main Navigation Menu (Centered layout, Search/Cart removed) */}
            <div className="flex items-center justify-center">
              <nav className="flex items-center space-x-1.5">
                {navItems.map((item) => {
                  const isActive = item.type === 'tab' ? activeTab === item.value : false;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavItemClick(item)}
                      className={`relative px-4 py-2 text-stone-600 hover:text-emerald-850 font-sans text-sm font-extrabold tracking-wider uppercase transition-colors flex items-center ${
                        isActive ? 'text-emerald-800' : ''
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

          </div>

          {/* 3. Far Right Concentric Call Button & Portal Control (as in inspo) */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            
            {/* Logged in indicator */}
            {loggedInFarmer && (
              <div 
                onClick={() => setActiveTab('portal')}
                className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-full px-3 py-1.5 flex items-center space-x-1.5 transition-colors"
                title="Go to Member Portal"
              >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase">
                  ID: {loggedInFarmer.id}
                </span>
              </div>
            )}
            
            {/* Concentric Call Rings Container */}
            <div className="relative">
              <button
                onClick={() => setShowSupport(!showSupport)}
                className="group relative flex items-center justify-center p-2 focus:outline-none"
                title="Support Hotlines & Member Access"
              >
                {/* Concentric rings styled precisely as shown in the picture */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-stone-200 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-200">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-stone-300 flex items-center justify-center transition-all duration-300 group-hover:border-emerald-300">
                    <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow transition-colors">
                      <Phone className="h-4 w-4 animate-bounce" />
                    </div>
                  </div>
                </div>
              </button>

              {/* Support & Login Dropdown */}
              {showSupport && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl border border-stone-200 shadow-xl py-4 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-4 pb-2.5 border-b border-stone-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider font-sans">
                      Co-operative Hotline
                    </span>
                    <button 
                      onClick={() => setShowSupport(false)}
                      className="text-stone-400 hover:text-stone-600 text-sm font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-3.5 space-y-3">
                    <div className="bg-stone-50 p-2 rounded-xl border border-stone-100 text-xs">
                      <span className="text-[10px] text-stone-400 font-bold block uppercase font-mono">Central Support Office</span>
                      <a href="tel:+254721346564" className="font-extrabold text-stone-850 hover:text-emerald-700 transition-colors block mt-0.5 font-mono">
                        📞 +254 721 346564
                      </a>
                    </div>

                    <div className="bg-stone-50 p-2 rounded-xl border border-stone-100 text-xs">
                      <span className="text-[10px] text-stone-400 font-bold block uppercase font-mono">Veterinary Helpline (24/7)</span>
                      <a href="tel:+254799111222" className="font-extrabold text-stone-850 hover:text-emerald-700 transition-colors block mt-0.5 font-mono">
                        📞 +254 799 111 222
                      </a>
                    </div>

                    {/* Member Quick-Access Button inside Dropdown */}
                    <div className="pt-2">
                      {loggedInFarmer ? (
                        <div className="space-y-2">
                          <div className="text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-100 font-medium">
                            🧑‍🌾 Signed in as <strong className="font-bold">{loggedInFarmer.name}</strong>
                          </div>
                          <button
                            onClick={() => {
                              onLogin(null);
                              setShowSupport(false);
                              setActiveTab('home');
                            }}
                            className="w-full bg-stone-900 hover:bg-stone-950 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
                          >
                            <LogOut className="h-3.5 w-3.5" />
                            <span>Log Out of System</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <button
                            onClick={() => {
                              setShowSupport(false);
                              setErrorMsg('');
                              setShowLoginModal(true);
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-lg shadow-sm transition-all flex items-center justify-center space-x-1"
                          >
                            <LogIn className="h-3.5 w-3.5" />
                            <span>Sign In to Member Portal</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowSupport(false);
                              onOpenRegister();
                            }}
                            className="w-full border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-bold py-2.5 rounded-lg transition-all"
                          >
                            Apply for Co-op Card
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger menu */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-stone-500 hover:text-stone-800 focus:outline-none p-2 rounded-full hover:bg-stone-100 border border-stone-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Search Overlay Bar (Delightful & Fully Functional) */}
      {showSearch && (
        <div className="bg-emerald-950 text-white py-3 px-4 border-t border-emerald-800/60 animate-slide-in">
          <div className="max-w-4xl mx-auto flex items-center space-x-3">
            <Search className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, milk payout prices, member registers, or warehouse silo logs..."
              className="w-full bg-transparent border-none text-white placeholder-emerald-300 focus:outline-none focus:ring-0 text-sm font-medium"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="text-xs bg-emerald-800 hover:bg-emerald-750 px-2 py-0.5 rounded text-emerald-200 font-mono"
              >
                Clear
              </button>
            )}
            <button 
              onClick={() => {
                setShowSearch(false);
                setSearchQuery('');
              }} 
              className="text-emerald-400 hover:text-white font-bold text-sm px-2"
            >
              Close
            </button>
          </div>

          {/* Quick results placeholder link */}
          {searchQuery && (
            <div className="max-w-4xl mx-auto mt-2 pt-2 border-t border-emerald-900/60 text-xs text-emerald-300 flex items-center justify-between">
              <span>Matching search context for "<strong>{searchQuery}</strong>":</span>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                  setActiveTab('services');
                }}
                className="underline hover:text-white font-bold"
              >
                Go to Co-op Calculators &amp; Bulletins
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 py-3 px-4 space-y-4 shadow-lg animate-in slide-in-from-top-5">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.type === 'tab' ? activeTab === item.value : false;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavItemClick(item);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-extrabold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-stone-100 pt-3 flex flex-col space-y-3">
            {loggedInFarmer ? (
              <div className="space-y-2">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center space-x-3">
                  <div className="bg-emerald-100 text-emerald-800 p-2 rounded-full">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-stone-900">{loggedInFarmer.name}</div>
                    <div className="text-xs text-stone-500 font-mono">Member ID: {loggedInFarmer.id}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('portal');
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="block w-full text-center bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-4 py-3 rounded-xl text-sm font-bold"
                >
                  Enter Portal Dashboard
                </button>
                <button
                  onClick={() => {
                    onLogin(null);
                    setIsOpen(false);
                    setActiveTab('home');
                  }}
                  className="block w-full text-center border border-stone-200 hover:bg-stone-50 text-stone-600 px-4 py-3 rounded-xl text-sm font-bold"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 px-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenRegister();
                  }}
                  className="block w-full text-center border border-emerald-600 hover:bg-emerald-50 text-emerald-700 py-3 rounded-xl text-sm font-bold"
                >
                  Apply for Co-op Membership
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setErrorMsg('');
                    setShowLoginModal(true);
                  }}
                  className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-sm font-bold shadow-sm"
                >
                  Sign In to Member Portal
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl overflow-hidden border border-stone-100">
            {/* Header */}
            <div className="bg-emerald-800 px-6 py-4 flex justify-between items-center text-white">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <h3 className="text-lg font-bold font-sans">Farmer Member Access</h3>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-emerald-100 hover:text-white transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-stone-600 mb-4">
                Access your personalized milk bulking registers, grain deposits ledger, credit union statements, and book local cooperative extension workers.
              </p>

              {/* Quick Login Section */}
              <div className="mb-6">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  DEMO MEMBERS (Click to log in instantly)
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {farmersList.slice(0, 3).map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleQuickLogin(f.id)}
                      className="flex justify-between items-center text-left p-3 rounded-lg border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all text-sm group"
                    >
                      <div>
                        <span className="font-semibold text-stone-800">{f.name}</span>
                        <div className="text-xs text-stone-500 font-mono">{f.region}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-100 px-2.5 py-1 rounded">
                        {f.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-stone-200"></div>
                <span className="flex-shrink mx-4 text-stone-400 text-xs font-semibold uppercase tracking-wider font-mono">Or Enter ID Manually</span>
                <div className="flex-grow border-t border-stone-200"></div>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="memberId" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Membership ID
                  </label>
                  <input
                    type="text"
                    id="memberId"
                    value={selectedFarmerId}
                    onChange={(e) => setSelectedFarmerId(e.target.value)}
                    placeholder="e.g. KF-2041"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-start space-x-2 text-xs text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100">
                    <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg text-sm shadow transition-all flex items-center justify-center space-x-1.5"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Verify and Login</span>
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="bg-stone-50 px-6 py-4 flex justify-between items-center border-t border-stone-100 text-xs text-stone-500">
              <span className="flex items-center space-x-1">
                <Info className="h-3.5 w-3.5 text-stone-400" />
                <span>Need a member card?</span>
              </span>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  onOpenRegister();
                }}
                className="text-emerald-700 font-bold hover:underline"
              >
                Register Online Now →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

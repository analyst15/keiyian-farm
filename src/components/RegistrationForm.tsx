import React, { useState } from 'react';
import { UserPlus, Sparkles, CheckCircle2, ChevronRight, Phone, MapPin, Snowflake, Sprout, CreditCard, Download, ShieldAlert } from 'lucide-react';
import { Farmer } from '../types';
import { registerFarmer } from '../data';

interface RegistrationFormProps {
  onRegisterSuccess: (farmer: Farmer) => void;
  onCancel: () => void;
}

export default function RegistrationForm({ onRegisterSuccess, onCancel }: RegistrationFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('Keiyian Center');
  const [cattle, setCattle] = useState('2');
  const [acreage, setAcreage] = useState('2');

  const [registeredCard, setRegisteredCard] = useState<Farmer | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your telephone number.');
      return;
    }

    const numericCattle = parseInt(cattle);
    const numericAcreage = parseFloat(acreage);

    if (isNaN(numericCattle) || numericCattle < 0) {
      setErrorMsg('Invalid cattle count.');
      return;
    }
    if (isNaN(numericAcreage) || numericAcreage < 0) {
      setErrorMsg('Invalid farming acreage.');
      return;
    }

    // Generate a beautiful new Member ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `KF-${randomNum}`;

    const newFarmer: Farmer = {
      id: newId,
      name: name.trim(),
      phone: phone.trim(),
      region: region,
      dairyCattleCount: numericCattle,
      maizeAcreage: numericAcreage,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    // Save to database
    registerFarmer(newFarmer);
    setRegisteredCard(newFarmer);
    setErrorMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {!registeredCard ? (
        /* The Registration Form */
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden md:grid md:grid-cols-12">
          
          {/* Left Column: Form Info */}
          <div className="p-8 md:p-12 md:col-span-5 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest bg-emerald-950/80 px-2.5 py-1 rounded">
                Join our Society
              </span>
              <h2 className="text-3xl font-extrabold font-sans leading-tight">Become a Keiyian Farmer</h2>
              <p className="text-sm text-emerald-200 leading-relaxed">
                Unlock immediate benefits including daily chilled-dairy collection, pest-free grain silo storage, zero-interest seed/fertilizer credit, and dedicated expert veterinary outreach.
              </p>
            </div>

            <div className="mt-8 border-t border-emerald-800 pt-6 space-y-4 text-xs text-emerald-300">
              <div className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold select-none mt-0.5">✓</span>
                <p><strong>Over 3,000 active members</strong> sharing machinery, transport, and cooperative gains in Narok.</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold select-none mt-0.5">✓</span>
                <p><strong>No membership fees.</strong> Backed &amp; supported by Nuru Kenya to foster community growth.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form Inputs */}
          <form onSubmit={handleRegisterSubmit} className="p-8 md:p-12 md:col-span-7 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-stone-900 text-xl font-sans tracking-tight">Register Online</h3>
              <button
                type="button"
                onClick={onCancel}
                className="text-xs text-stone-400 hover:text-stone-700 font-semibold"
              >
                Go Back
              </button>
            </div>

            {errorMsg && (
              <div className="flex items-start space-x-2 text-xs text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100">
                <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Benson Ole Tunai"
                  required
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Mobile Telephone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +254 712 345678"
                      required
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800 font-mono font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Sub-Location / Region</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800 font-bold"
                    >
                      <option value="Keiyian Center">Keiyian Center</option>
                      <option value="Enoosaen">Enoosaen</option>
                      <option value="Kilgoris West">Kilgoris West</option>
                      <option value="Lolgorian">Lolgorian</option>
                      <option value="Angata Barrikoi">Angata Barrikoi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1 flex justify-between">
                    <span>Dairy Cattle Count</span>
                    <span className="text-emerald-700 font-mono">{cattle} head</span>
                  </label>
                  <div className="relative flex items-center">
                    <Snowflake className="absolute left-3 h-4 w-4 text-sky-500" />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={cattle}
                      onChange={(e) => setCattle(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800 font-mono font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1 flex justify-between">
                    <span>Maize Acreage Owned</span>
                    <span className="text-emerald-700 font-mono">{acreage} acres</span>
                  </label>
                  <div className="relative flex items-center">
                    <Sprout className="absolute left-3 h-4 w-4 text-amber-500" />
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={acreage}
                      onChange={(e) => setAcreage(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800 font-mono font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <UserPlus className="h-5 w-5" />
              <span>Submit Cooperative Registration</span>
            </button>
          </form>

        </div>
      ) : (
        /* Digital Member Card Showcase on Success */
        <div className="space-y-8 max-w-xl mx-auto text-center">
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            <h3 className="text-xl font-bold font-sans text-emerald-950 mt-3">Welcome to Keiyian Farmers Co-op!</h3>
            <p className="text-xs text-emerald-800 mt-1">Your registration has been successfully approved. Below is your official digital member card.</p>
          </div>

          {/* Member Card Component */}
          <div className="relative bg-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-emerald-500 overflow-hidden text-left max-w-md mx-auto">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full filter blur-3xl opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-800 rounded-full filter blur-2xl opacity-20"></div>

            <div className="flex justify-between items-start border-b border-emerald-800 pb-4 mb-5">
              <div className="flex items-center space-x-3">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Logo.png?alt=media&token=f1b428a9-5c7c-4e0f-b0fd-40d3206ba325"
                  alt="Co-op Logo"
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-xs font-black font-sans tracking-tight leading-none text-white">KEIYIAN FARMERS</span>
                  <span className="text-4xs font-bold text-emerald-400 tracking-widest uppercase font-mono">Co-operative Society</span>
                </div>
              </div>
              <span className="text-3xs font-bold font-mono text-emerald-200 bg-emerald-900 border border-emerald-700/50 px-2 py-0.5 rounded uppercase">
                MEMBER
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-4xs uppercase tracking-widest font-mono text-emerald-400 font-bold block">Member Name</span>
                <span className="text-lg font-extrabold font-sans text-white block">{registeredCard.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-4xs uppercase tracking-widest font-mono text-emerald-400 font-bold block">Membership ID</span>
                  <span className="text-base font-bold font-mono text-emerald-300 block">{registeredCard.id}</span>
                </div>
                <div>
                  <span className="text-4xs uppercase tracking-widest font-mono text-emerald-400 font-bold block">Sub-Location</span>
                  <span className="text-xs font-bold text-white block">{registeredCard.region}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-emerald-900 pt-3">
                <div className="flex items-center space-x-2">
                  <Snowflake className="h-4 w-4 text-sky-400" />
                  <div>
                    <span className="text-5xs uppercase font-mono text-emerald-400">Cows</span>
                    <span className="text-xs font-extrabold block">{registeredCard.dairyCattleCount} Registered</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Sprout className="h-4 w-4 text-amber-400" />
                  <div>
                    <span className="text-5xs uppercase font-mono text-emerald-400">Crops</span>
                    <span className="text-xs font-extrabold block">{registeredCard.maizeAcreage} Acres</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated barcode and stamp */}
            <div className="flex justify-between items-end border-t border-emerald-900 pt-4 mt-5">
              <div className="space-y-1">
                <div className="h-6 w-36 bg-white/10 flex items-center justify-around px-1 py-0.5 rounded">
                  <span className="inline-block w-0.5 h-full bg-white/70"></span>
                  <span className="inline-block w-1 h-full bg-white/60"></span>
                  <span className="inline-block w-0.5 h-full bg-white/70"></span>
                  <span className="inline-block w-1.5 h-full bg-white/60"></span>
                  <span className="inline-block w-0.5 h-full bg-white/70"></span>
                  <span className="inline-block w-0.5 h-full bg-white/70"></span>
                  <span className="inline-block w-1.5 h-full bg-white/60"></span>
                  <span className="inline-block w-0.5 h-full bg-white/70"></span>
                </div>
                <span className="text-5xs font-mono tracking-widest text-emerald-400 block text-center">KFCS-{registeredCard.id}</span>
              </div>
              
              <div className="text-right flex flex-col items-end">
                <div className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-5xs uppercase font-bold tracking-widest px-1.5 py-0.5 rounded font-mono mb-1">
                  OFFICIAL STAMP
                </div>
                <span className="text-5xs font-mono text-emerald-400">Date Issued: {registeredCard.joinedDate}</span>
              </div>
            </div>

          </div>

          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={() => onRegisterSuccess(registeredCard)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all flex items-center space-x-1.5"
            >
              <CreditCard className="h-4 w-4" />
              <span>Enter Portal with this ID</span>
            </button>
            <button
              onClick={onCancel}
              className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold py-2.5 px-5 rounded-xl text-xs transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

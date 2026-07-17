import React, { useState, useEffect } from 'react';
import {
  User, ClipboardList, ShoppingBag, ShieldAlert,
  Plus, Calendar, CheckCircle2, AlertCircle, FileText, Landmark, Clock, ArrowRight, Activity
} from 'lucide-react';
import { Farmer, MilkDelivery, GrainDeposit, InputLoan, ExtensionBooking } from '../types';
import {
  getMilkDeliveries, addMilkDelivery,
  getGrainDeposits, addGrainDeposit,
  getInputLoans, addInputLoan,
  getExtensions, addExtensionBooking,
  MILK_PRICE_PER_LITER, MAIZE_PRICE_PER_BAG
} from '../data';

interface FarmerPortalProps {
  farmer: Farmer;
}

export default function FarmerPortal({ farmer }: FarmerPortalProps) {
  const [subTab, setSubTab] = useState<'overview' | 'milk_grain' | 'loans' | 'extensions'>('overview');

  // Transaction States
  const [deliveries, setDeliveries] = useState<MilkDelivery[]>([]);
  const [grainDeposits, setGrainDeposits] = useState<GrainDeposit[]>([]);
  const [loans, setLoans] = useState<InputLoan[]>([]);
  const [extensions, setExtensions] = useState<ExtensionBooking[]>([]);

  // Form Inputs
  const [milkQuantity, setMilkQuantity] = useState('');
  const [milkSession, setMilkSession] = useState<'Morning' | 'Evening'>('Morning');
  const [milkGrade, setMilkGrade] = useState<'A' | 'B' | 'C'>('A');

  const [grainType, setGrainType] = useState<'Maize' | 'Sorghum' | 'Beans'>('Maize');
  const [grainBags, setGrainBags] = useState('');
  const [grainMoisture, setGrainMoisture] = useState('12.5');

  const [loanInputType, setLoanInputType] = useState('DAP Fertilizer (50kg)');
  const [loanQuantity, setLoanQuantity] = useState('1');

  const [extType, setExtType] = useState<'Veterinary Support' | 'Soil Testing' | 'Agronomy Training' | 'Dairy Breeding'>('Veterinary Support');
  const [extNotes, setExtNotes] = useState('');

  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Fetch farmer data on mount and updates
  const loadFarmerData = () => {
    const allDeliveries = getMilkDeliveries().filter(d => d.farmerId === farmer.id);
    const allGrain = getGrainDeposits().filter(g => g.farmerId === farmer.id);
    const allLoans = getInputLoans().filter(l => l.farmerId === farmer.id);
    const allExtensions = getExtensions().filter(e => e.farmerId === farmer.id);

    setDeliveries(allDeliveries);
    setGrainDeposits(allGrain);
    setLoans(allLoans);
    setExtensions(allExtensions);
  };

  useEffect(() => {
    loadFarmerData();
  }, [farmer]);

  const clearFormNotification = () => {
    setTimeout(() => {
      setFormSuccess('');
      setFormError('');
    }, 4000);
  };

  // Submit Milk Delivery
  const handleMilkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(milkQuantity);
    if (isNaN(qty) || qty <= 0) {
      setFormError('Please enter a valid milk quantity in liters.');
      return;
    }

    const newDelivery: MilkDelivery = {
      id: `MD-${Date.now().toString().slice(-4)}`,
      farmerId: farmer.id,
      date: new Date().toISOString().split('T')[0],
      session: milkSession,
      quantityLiters: qty,
      qualityGrade: milkGrade,
      status: 'Approved',
      payoutAmount: qty * MILK_PRICE_PER_LITER
    };

    addMilkDelivery(newDelivery);
    setMilkQuantity('');
    setFormSuccess('Milk delivery logged and approved successfully!');
    loadFarmerData();
    clearFormNotification();
  };

  // Submit Grain Deposit
  const handleGrainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bags = parseInt(grainBags);
    const moisture = parseFloat(grainMoisture);

    if (isNaN(bags) || bags <= 0) {
      setFormError('Please enter a valid number of grain bags.');
      return;
    }
    if (isNaN(moisture) || moisture <= 0 || moisture > 25) {
      setFormError('Please enter a valid moisture content percentage.');
      return;
    }

    const newDeposit: GrainDeposit = {
      id: `GD-${Date.now().toString().slice(-4)}`,
      farmerId: farmer.id,
      date: new Date().toISOString().split('T')[0],
      grainType: grainType,
      bags: bags,
      weightKg: bags * 90, // Standard 90kg bag
      moistureContent: moisture,
      status: moisture <= 13.5 ? 'Stored' : 'Pending' // high moisture stays pending drying
    };

    addGrainDeposit(newDeposit);
    setGrainBags('');
    if (moisture > 13.5) {
      setFormSuccess('Grain deposited, but held as "Pending" for warehouse drying due to high moisture (>13.5%).');
    } else {
      setFormSuccess('Grain deposited, tested, and stored in central warehouse!');
    }
    loadFarmerData();
    clearFormNotification();
  };

  // Request Input Loan
  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(loanQuantity);
    if (isNaN(qty) || qty <= 0) {
      setFormError('Please enter a valid input quantity.');
      return;
    }

    // Input prices configuration
    let unitCost = 3500; // default for DAP
    let unit = 'Bags';
    if (loanInputType.includes('CAN')) {
      unitCost = 3000;
    } else if (loanInputType.includes('Maize Seed')) {
      unitCost = 2800;
      unit = 'Packs';
    } else if (loanInputType.includes('Dairy Cow Feed')) {
      unitCost = 2500;
    } else if (loanInputType.includes('Vaccine')) {
      unitCost = 800;
      unit = 'Doses';
    }

    const newLoan: InputLoan = {
      id: `IL-${Date.now().toString().slice(-4)}`,
      farmerId: farmer.id,
      date: new Date().toISOString().split('T')[0],
      inputName: loanInputType,
      quantity: qty,
      unit: unit,
      totalCost: qty * unitCost,
      repaymentStatus: 'Active'
    };

    addInputLoan(newLoan);
    setLoanQuantity('1');
    setFormSuccess(`Input credit for ${loanInputType} issued successfully! Balance will be deducted from your next payout.`);
    loadFarmerData();
    clearFormNotification();
  };

  // Request Extension Visit
  const handleExtensionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!extNotes.trim()) {
      setFormError('Please describe the request so our officers can prepare.');
      return;
    }

    const newBooking: ExtensionBooking = {
      id: `EB-${Date.now().toString().slice(-4)}`,
      farmerId: farmer.id,
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days in future
      serviceType: extType,
      notes: extNotes,
      status: 'Pending'
    };

    addExtensionBooking(newBooking);
    setExtNotes('');
    setFormSuccess('Your service appointment has been booked. A cooperative extension officer will contact you within 24 hours!');
    loadFarmerData();
    clearFormNotification();
  };

  // Calculations for dashboard indicators
  const totalMilkLitersThisPeriod = deliveries.reduce((acc, curr) => acc + curr.quantityLiters, 0);
  const totalMilkEarnings = deliveries.reduce((acc, curr) => acc + curr.payoutAmount, 0);
  const totalGrainBagsStored = grainDeposits.filter(g => g.status === 'Stored' || g.status === 'Processed').reduce((acc, curr) => acc + curr.bags, 0);
  const outstandingLoansValue = loans.filter(l => l.repaymentStatus !== 'Paid').reduce((acc, curr) => acc + curr.totalCost, 0);
  const totalDeductedLoansValue = loans.filter(l => l.repaymentStatus === 'Deducted from Payout').reduce((acc, curr) => acc + curr.totalCost, 0);

  const pendingCoopPayout = Math.max(0, totalMilkEarnings - totalDeductedLoansValue);

  // SVG Chart data preparation (Milk deliveries over the last 7 logs)
  const chartDeliveries = [...deliveries].reverse().slice(-7);
  const maxDeliveryQty = Math.max(...chartDeliveries.map(d => d.quantityLiters), 25);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Farmers Header Profile Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-800 flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="bg-emerald-800 p-4 rounded-2xl border border-emerald-700 shadow-inner">
            <User className="h-10 w-10 text-emerald-300" />
          </div>
          <div>
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest bg-emerald-950/80 px-2.5 py-1 rounded">
              COOPERATIVE MEMBER: {farmer.id}
            </span>
            <h2 className="text-2xl md:text-3xl font-black font-sans text-white tracking-tight mt-1">{farmer.name}</h2>
            <p className="text-xs text-emerald-200 mt-1">
              📍 Region: <strong className="text-white">{farmer.region}</strong> • Active since: <strong className="text-white">{farmer.joinedDate}</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-emerald-800/80 pt-4 md:pt-0 md:border-0 md:flex md:space-x-8 text-right">
          <div>
            <span className="block text-2xs uppercase font-mono text-emerald-300">Registered Cows</span>
            <span className="text-2xl font-extrabold font-sans text-emerald-400">{farmer.dairyCattleCount} Cattle</span>
          </div>
          <div>
            <span className="block text-2xs uppercase font-mono text-emerald-300">Crops Acreage</span>
            <span className="text-2xl font-extrabold font-sans text-emerald-400">{farmer.maizeAcreage} Acres</span>
          </div>
        </div>
      </div>

      {/* Local Notification Center */}
      {formSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center space-x-3 text-sm shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{formSuccess}</span>
        </div>
      )}
      {formError && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl flex items-center space-x-3 text-sm shadow-sm">
          <ShieldAlert className="h-5 w-5 text-rose-600 flex-shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Main Grid: Navigation Sidebar & Tabs Container */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        
        {/* Portal subtabs navigation */}
        <div className="lg:col-span-3 mb-8 lg:mb-0 space-y-2">
          <button
            onClick={() => setSubTab('overview')}
            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all border ${
              subTab === 'overview'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10'
                : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-50 border-stone-200/80'
            }`}
          >
            <Activity className="h-4.5 w-4.5" />
            <span>My Portal Dashboard</span>
          </button>
          <button
            onClick={() => setSubTab('milk_grain')}
            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all border ${
              subTab === 'milk_grain'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10'
                : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-50 border-stone-200/80'
            }`}
          >
            <ClipboardList className="h-4.5 w-4.5" />
            <span>Deliver Milk &amp; Grains</span>
          </button>
          <button
            onClick={() => setSubTab('loans')}
            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all border ${
              subTab === 'loans'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10'
                : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-50 border-stone-200/80'
            }`}
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            <span>Inputs Advances Credit</span>
          </button>
          <button
            onClick={() => setSubTab('extensions')}
            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all border ${
              subTab === 'extensions'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10'
                : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-50 border-stone-200/80'
            }`}
          >
            <Calendar className="h-4.5 w-4.5" />
            <span>Book Veterinary &amp; Extension</span>
          </button>
        </div>

        {/* Dynamic Panel Content */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* 1. OVERVIEW DASHBOARD */}
          {subTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Core Ledger Totals Card Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <span className="text-3xs uppercase tracking-widest font-mono text-stone-400 font-bold block">Accrued Milk Income</span>
                  <div className="text-xl font-bold font-sans text-stone-900 mt-1">
                    KSh {totalMilkEarnings.toLocaleString()}
                  </div>
                  <span className="text-3xs text-emerald-600 font-medium block mt-1">
                    🥛 {totalMilkLitersThisPeriod} L bulked this period
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <span className="text-3xs uppercase tracking-widest font-mono text-stone-400 font-bold block">Input Advances Loan</span>
                  <div className="text-xl font-bold font-sans text-stone-900 mt-1 text-rose-700">
                    - KSh {outstandingLoansValue.toLocaleString()}
                  </div>
                  <span className="text-3xs text-rose-500 font-medium block mt-1">
                    🌱 Will deduct from next milk payout
                  </span>
                </div>

                <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5 shadow-sm">
                  <span className="text-3xs uppercase tracking-widest font-mono text-emerald-800 font-bold block">Net Expected Payout</span>
                  <div className="text-xl font-extrabold font-sans text-emerald-900 mt-1">
                    KSh {pendingCoopPayout.toLocaleString()}
                  </div>
                  <span className="text-3xs text-emerald-700 font-medium block mt-1">
                    💰 Standard cycle: 30th of the month
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <span className="text-3xs uppercase tracking-widest font-mono text-stone-400 font-bold block">Grain bulking status</span>
                  <div className="text-xl font-bold font-sans text-stone-900 mt-1 text-amber-700">
                    {totalGrainBagsStored} Bags
                  </div>
                  <span className="text-3xs text-stone-500 font-medium block mt-1">
                    🌽 Stored safely in central warehouse
                  </span>
                </div>

              </div>

              {/* Dynamic SVG Weekly Milk Volumes Chart */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
                <div className="flex justify-between items-baseline mb-6">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 font-sans tracking-tight">Recent Daily Deliveries Volume</h3>
                    <p className="text-3xs text-stone-400 mt-0.5">Tracking your last 7 milk deliveries (in Liters)</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                    Coop Rate: KSh {MILK_PRICE_PER_LITER}/L
                  </span>
                </div>

                {chartDeliveries.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-stone-200 rounded-2xl text-stone-400 text-xs">
                    No milk delivery logs found. Use the &quot;Deliver Milk &amp; Grains&quot; tab to record your first delivery!
                  </div>
                ) : (
                  <div>
                    {/* SVG Viewport */}
                    <svg viewBox="0 0 600 220" className="w-full h-auto text-stone-600 font-sans select-none">
                      {/* Grid Lines */}
                      <line x1="50" y1="30" x2="560" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="50" y1="80" x2="560" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="50" y1="130" x2="560" y2="130" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="50" y1="180" x2="560" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />

                      {/* Left Y Axis Labels */}
                      <text x="35" y="34" className="text-3xs text-stone-400 text-right" textAnchor="end">
                        {Math.round(maxDeliveryQty)}L
                      </text>
                      <text x="35" y="109" className="text-3xs text-stone-400 text-right" textAnchor="end">
                        {Math.round(maxDeliveryQty / 2)}L
                      </text>
                      <text x="35" y="184" className="text-3xs text-stone-400 text-right" textAnchor="end">
                        0L
                      </text>

                      {/* Map Bars */}
                      {chartDeliveries.map((del, index) => {
                        const barWidth = 40;
                        const spacing = (500 / chartDeliveries.length);
                        const x = 50 + index * spacing + (spacing - barWidth) / 2;
                        const height = (del.quantityLiters / maxDeliveryQty) * 150;
                        const y = 180 - height;

                        return (
                          <g key={del.id} className="group">
                            {/* Bar Rectangle */}
                            <rect
                              x={x}
                              y={y}
                              width={barWidth}
                              height={height}
                              rx="6"
                              className="fill-emerald-600 hover:fill-emerald-500 transition-all cursor-pointer"
                            />
                            {/* Tooltip Label on top */}
                            <text
                              x={x + barWidth / 2}
                              y={y - 8}
                              textAnchor="middle"
                              className="text-3xs font-bold font-mono text-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity bg-white"
                            >
                              {del.quantityLiters}L
                            </text>
                            {/* Date Label on Bottom X Axis */}
                            <text
                              x={x + barWidth / 2}
                              y="198"
                              textAnchor="middle"
                              className="text-4xs font-semibold text-stone-500 uppercase font-mono"
                            >
                              {del.date.slice(-5)}
                            </text>
                            {/* Session Subtitle on bottom */}
                            <text
                              x={x + barWidth / 2}
                              y="210"
                              textAnchor="middle"
                              className={`text-5xs font-bold uppercase font-mono ${del.session === 'Morning' ? 'text-sky-500' : 'text-amber-500'}`}
                            >
                              {del.session[0]}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                    <div className="flex justify-center space-x-6 text-4xs font-bold font-mono uppercase tracking-wider text-stone-500 border-t border-stone-100 pt-4 mt-1">
                      <span className="flex items-center"><span className="inline-block w-2 h-2 bg-emerald-600 rounded mr-1"></span> Milk Delivered</span>
                      <span className="flex items-center"><span className="inline-block w-2.5 h-1.5 border border-sky-400 bg-sky-50 rounded mr-1"></span> (M) Morning Session</span>
                      <span className="flex items-center"><span className="inline-block w-2.5 h-1.5 border border-amber-400 bg-amber-50 rounded mr-1"></span> (E) Evening Session</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Recent activity listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Active Extension Services Appointments */}
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                    <h4 className="font-bold font-sans text-stone-800 text-sm">Extension &amp; Vet Appointments</h4>
                    <span className="text-3xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {extensions.length} booked
                    </span>
                  </div>

                  {extensions.length === 0 ? (
                    <p className="text-xs text-stone-400 py-4 text-center">No extension services requested yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {extensions.slice(0, 3).map((ext) => (
                        <div key={ext.id} className="flex justify-between items-center text-xs p-3 rounded-xl border border-stone-100 hover:bg-stone-50 transition-colors">
                          <div className="space-y-0.5">
                            <span className="font-bold text-stone-800">{ext.serviceType}</span>
                            <div className="text-3xs text-stone-500 font-mono flex items-center">
                              <Calendar className="h-3 w-3 mr-1" /> Visit date: {ext.date}
                            </div>
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-3xs font-mono uppercase tracking-wider ${
                              ext.status === 'Confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : ext.status === 'Completed'
                                ? 'bg-stone-100 text-stone-600 border border-stone-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}
                          >
                            {ext.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subsidized Inputs Credits */}
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                    <h4 className="font-bold font-sans text-stone-800 text-sm">Active Subsidized Seed/Fertilizer Loans</h4>
                    <span className="text-3xs font-bold font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                      KSh {outstandingLoansValue.toLocaleString()} outstanding
                    </span>
                  </div>

                  {loans.length === 0 ? (
                    <p className="text-xs text-stone-400 py-4 text-center">No active inputs loans on your account.</p>
                  ) : (
                    <div className="space-y-3">
                      {loans.slice(0, 3).map((loan) => (
                        <div key={loan.id} className="flex justify-between items-center text-xs p-3 rounded-xl border border-stone-100 hover:bg-stone-50 transition-colors">
                          <div>
                            <span className="font-bold text-stone-800">{loan.inputName}</span>
                            <div className="text-3xs text-stone-500 font-mono mt-0.5">
                              Qty: {loan.quantity} {loan.unit} • Cost: KSh {loan.totalCost.toLocaleString()}
                            </div>
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-3xs font-mono uppercase tracking-wider ${
                              loan.repaymentStatus === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700'
                                : loan.repaymentStatus === 'Deducted from Payout'
                                ? 'bg-emerald-100 text-emerald-800 font-extrabold'
                                : 'bg-rose-50 text-rose-700 border border-rose-100'
                            }`}
                          >
                            {loan.repaymentStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* 2. DELIVER MILK AND GRAINS TAB */}
          {subTab === 'milk_grain' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Side Forms */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Deliver Milk Form */}
                <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
                  <div className="flex items-center space-x-2.5 mb-4 border-b border-stone-100 pb-3">
                    <ClipboardList className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-bold text-stone-900 text-base font-sans">Log Milk Delivery</h3>
                  </div>

                  <form onSubmit={handleMilkSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Session</label>
                        <select
                          value={milkSession}
                          onChange={(e) => setMilkSession(e.target.value as any)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Morning">Morning Session</option>
                          <option value="Evening">Evening Session</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Quality Grade</label>
                        <select
                          value={milkGrade}
                          onChange={(e) => setMilkGrade(e.target.value as any)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 font-bold"
                        >
                          <option value="A">Grade A (High Fat)</option>
                          <option value="B">Grade B (Standard)</option>
                          <option value="C">Grade C (Industrial)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Quantity in Liters</label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          value={milkQuantity}
                          onChange={(e) => setMilkQuantity(e.target.value)}
                          placeholder="e.g. 15.5"
                          required
                          className="w-full pl-3 pr-12 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 font-mono"
                        />
                        <span className="absolute right-3 top-2.5 text-stone-400 text-3xs font-bold font-mono">LITERS</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Log Milk Delivery</span>
                    </button>
                  </form>
                </div>

                {/* Bulk Maize / Grain Deposit Form */}
                <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
                  <div className="flex items-center space-x-2.5 mb-4 border-b border-stone-100 pb-3">
                    <Landmark className="h-5 w-5 text-amber-600" />
                    <h3 className="font-bold text-stone-900 text-base font-sans">Deposit Grain in Warehouse</h3>
                  </div>

                  <form onSubmit={handleGrainSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Grain Type</label>
                        <select
                          value={grainType}
                          onChange={(e) => setGrainType(e.target.value as any)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 font-bold"
                        >
                          <option value="Maize">White Maize</option>
                          <option value="Sorghum">Red Sorghum</option>
                          <option value="Beans">Rosecoco Beans</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Moisture Level</label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={grainMoisture}
                            onChange={(e) => setGrainMoisture(e.target.value)}
                            placeholder="12.5"
                            required
                            className="w-full pl-3 pr-8 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 font-mono"
                          />
                          <span className="absolute right-3 top-2.5 text-stone-400 text-3xs font-bold font-mono">%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Number of Bags (90kg each)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={grainBags}
                          onChange={(e) => setGrainBags(e.target.value)}
                          placeholder="e.g. 20"
                          required
                          className="w-full pl-3 pr-12 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 font-mono"
                        />
                        <span className="absolute right-3 top-2.5 text-stone-400 text-3xs font-bold font-mono">BAGS</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Deposit Grain Bags</span>
                    </button>
                  </form>
                </div>

              </div>

              {/* Right Side Ledgers */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Historical Milk Deliveries Ledger */}
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-stone-800 border-b border-stone-100 pb-2 flex justify-between items-center">
                    <span>Recent Milk Delivery Ledger</span>
                    <span className="text-3xs font-semibold text-stone-400">Showing last 6 logs</span>
                  </h4>

                  {deliveries.length === 0 ? (
                    <p className="text-xs text-stone-400 py-6 text-center">No milk deliveries recorded yet.</p>
                  ) : (
                    <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                      {deliveries.slice(0, 6).map((del) => (
                        <div key={del.id} className="py-2.5 flex justify-between items-center text-xs">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-stone-800">{del.quantityLiters} Liters</span>
                              <span className={`text-4xs font-bold font-mono px-1.5 py-0.2 rounded ${del.session === 'Morning' ? 'bg-sky-50 text-sky-700' : 'bg-amber-50 text-amber-700'}`}>
                                {del.session}
                              </span>
                            </div>
                            <div className="text-3xs text-stone-500 font-mono flex items-center space-x-2">
                              <span>📅 {del.date}</span>
                              <span>•</span>
                              <span>Grade {del.qualityGrade}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-emerald-800 font-mono">KSh {del.payoutAmount.toLocaleString()}</span>
                            <span className="block text-4xs text-emerald-600 font-semibold uppercase font-mono">Approved</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Historical Grain Deposits Ledger */}
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-stone-800 border-b border-stone-100 pb-2">
                    Recent Warehouse Grain Deposits
                  </h4>

                  {grainDeposits.length === 0 ? (
                    <p className="text-xs text-stone-400 py-6 text-center">No grain deposits recorded yet.</p>
                  ) : (
                    <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                      {grainDeposits.slice(0, 6).map((grain) => (
                        <div key={grain.id} className="py-2.5 flex justify-between items-center text-xs">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-stone-800">{grain.bags} Bags ({grain.grainType})</span>
                              <span className="text-4xs font-mono font-bold text-stone-500 bg-stone-100 px-1 rounded">
                                {grain.moistureContent}% H₂O
                              </span>
                            </div>
                            <div className="text-3xs text-stone-500 font-mono mt-0.5">
                              📅 Deposited: {grain.date} • Est. Weight: {grain.weightKg} kg
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-3xs font-mono uppercase tracking-wider ${
                              grain.status === 'Stored'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : grain.status === 'Processed'
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}
                          >
                            {grain.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* 3. INPUT ADVANCES LOANS TAB */}
          {subTab === 'loans' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Request advance loan form */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2.5 mb-2 border-b border-stone-100 pb-3">
                    <ShoppingBag className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-bold text-stone-900 text-base font-sans">Request Seeds &amp; Fertilizer Loan</h3>
                  </div>

                  <p className="text-xs text-stone-600 leading-normal">
                    Get high-yield fertilizers and certified seeds on credit. No interest charged. The total value is automatically deducted from your upcoming milk bulking or seasonal maize aggregation checks.
                  </p>

                  <form onSubmit={handleLoanSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Select Farm Input</label>
                      <select
                        value={loanInputType}
                        onChange={(e) => setLoanInputType(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 font-bold text-stone-800"
                      >
                        <option value="DAP Fertilizer (50kg)">DAP Planting Fertilizer — KSh 3,500 / bag</option>
                        <option value="CAN Fertilizer (50kg)">CAN Topdressing Fertilizer — KSh 3,000 / bag</option>
                        <option value="Pannar Hybrid Maize Seed (10kg)">Pannar Hybrid Maize Seed — KSh 2,800 / pack</option>
                        <option value="Super-Dairy High Yield Cow Feed">Super-Dairy Cow Feed — KSh 2,500 / bag</option>
                        <option value="Subsidized Foot &amp; Mouth Vaccine">Foot &amp; Mouth Disease Vaccine — KSh 800 / dose</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Quantity (Bags/Packs/Doses)</label>
                      <select
                        value={loanQuantity}
                        onChange={(e) => setLoanQuantity(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                      >
                        {[1, 2, 3, 4, 5, 10, 15, 20].map((num) => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Approve Advance Input Loan</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Loans statements list */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-stone-800 border-b border-stone-100 pb-2 flex justify-between items-center">
                    <span>Active Input Loan Statements</span>
                    <span className="text-3xs text-stone-400 font-mono font-bold">Total: KSh {outstandingLoansValue.toLocaleString()}</span>
                  </h4>

                  {loans.length === 0 ? (
                    <p className="text-xs text-stone-400 py-6 text-center">You currently have no active input credit balances.</p>
                  ) : (
                    <div className="divide-y divide-stone-100">
                      {loans.map((loan) => (
                        <div key={loan.id} className="py-3 flex justify-between items-center text-xs">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-extrabold text-stone-800">{loan.inputName}</span>
                              <span className="text-4xs text-stone-400 font-mono">#{loan.id}</span>
                            </div>
                            <div className="text-3xs text-stone-500 font-mono flex items-center space-x-2 mt-0.5">
                              <span>📅 Date: {loan.date}</span>
                              <span>•</span>
                              <span>Qty: {loan.quantity} {loan.unit}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-rose-700 font-mono">KSh {loan.totalCost.toLocaleString()}</span>
                            <span
                              className={`block text-4xs font-bold uppercase font-mono mt-0.5 ${
                                loan.repaymentStatus === 'Paid'
                                  ? 'text-emerald-600'
                                  : loan.repaymentStatus === 'Deducted from Payout'
                                  ? 'text-emerald-700 font-extrabold'
                                  : 'text-amber-600'
                              }`}
                            >
                              {loan.repaymentStatus}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* 4. EXTENSION SERVICES TAB */}
          {subTab === 'extensions' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form to book service */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2.5 mb-2 border-b border-stone-100 pb-3">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-bold text-stone-900 text-base font-sans">Book Extension Worker</h3>
                  </div>

                  <p className="text-xs text-stone-600 leading-normal">
                    Schedule a visit from our certified agricultural agronomists and livestock veterinarians. Select the service category, write a brief description of your needs, and we will dispatch an officer to your farm.
                  </p>

                  <form onSubmit={handleExtensionSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Select Service Type</label>
                      <select
                        value={extType}
                        onChange={(e) => setExtType(e.target.value as any)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 font-bold text-stone-800"
                      >
                        <option value="Veterinary Support">Veterinary Support / Sick Animal Check</option>
                        <option value="Soil Testing">Soil Health Testing &amp; Chem-Mapping</option>
                        <option value="Agronomy Training">Agronomy Training / Maize Crop Support</option>
                        <option value="Dairy Breeding">Artificial Insemination (AI) / Heifer Breeding</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Describe Farm Issues / Notes</label>
                      <textarea
                        value={extNotes}
                        onChange={(e) => setExtNotes(e.target.value)}
                        placeholder="e.g. My Ayrshire dairy cow has lost appetite and has ticks. Need vaccine or injection. My farm is near Keiyian Primary School."
                        rows={4}
                        required
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800 leading-normal"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Request Farm Visit Appointment</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Booked Services Status */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-stone-800 border-b border-stone-100 pb-2">
                    Your Booked Services Appointments
                  </h4>

                  {extensions.length === 0 ? (
                    <p className="text-xs text-stone-400 py-6 text-center">You have no booked appointments.</p>
                  ) : (
                    <div className="divide-y divide-stone-100">
                      {extensions.map((ext) => (
                        <div key={ext.id} className="py-3.5 space-y-2 text-xs">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-extrabold text-stone-800 text-sm block">{ext.serviceType}</span>
                              <span className="text-4xs font-mono text-stone-400 block mt-0.5">Booking ID: #{ext.id}</span>
                            </div>
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-bold text-3xs font-mono uppercase tracking-wider ${
                                ext.status === 'Confirmed'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : ext.status === 'Completed'
                                  ? 'bg-stone-100 text-stone-600 border border-stone-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse'
                              }`}
                            >
                              {ext.status}
                            </span>
                          </div>
                          
                          <p className="text-stone-600 text-3xs leading-normal bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                            <strong>My Request Note:</strong> &quot;{ext.notes}&quot;
                          </p>
                          
                          <div className="text-3xs text-stone-500 font-mono flex items-center space-x-2">
                            <span>📅 Scheduled visit date: <strong className="text-stone-800">{ext.date}</strong></span>
                            <span>•</span>
                            <span>Extension Worker: Dispatching</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

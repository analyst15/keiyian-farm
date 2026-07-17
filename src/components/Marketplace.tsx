import React, { useState } from 'react';
import { ShoppingBag, Landmark, ArrowRight, FileText, CheckCircle2, Building2, HelpCircle, Snowflake, Sprout, ShieldCheck } from 'lucide-react';

export default function Marketplace() {
  const [product, setProduct] = useState('raw_milk');
  const [quantity, setQuantity] = useState('5000');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');

  const [inquiryQuote, setInquiryQuote] = useState<any | null>(null);

  const wholesaleProducts = [
    {
      id: 'raw_milk',
      name: 'Bulk Grade-A Chilled Milk',
      category: 'Dairy',
      unit: 'Litres',
      basePrice: 58, // KSh per Litre commercial contract
      minOrder: '1,000 L',
      specs: 'Butterfat: min 4.2% • Density: 1.028 g/ml • Chilled to 4°C within 2 hours of milking • Antibiotic-free guaranteed.',
      icon: <Snowflake className="h-6 w-6 text-sky-600" />
    },
    {
      id: 'white_maize',
      name: 'Premium Grade-1 White Maize',
      category: 'Grains',
      unit: '90kg Bags',
      basePrice: 4200, // KSh per bag wholesale
      minOrder: '50 Bags',
      specs: 'Moisture: max 13.0% • Aflatoxin levels: <10 ppb • Broken grains: <2% • Fully cleaned and graded at central silo.',
      icon: <Sprout className="h-6 w-6 text-amber-600" />
    },
    {
      id: 'red_sorghum',
      name: 'High-Yield Red Sorghum',
      category: 'Grains',
      unit: '90kg Bags',
      basePrice: 3800,
      minOrder: '50 Bags',
      specs: 'Aggregated red sorghum, optimized for industrial brewery or feed manufacturing contracts • Hand-sorted moisture <13.2%.',
      icon: <Sprout className="h-6 w-6 text-emerald-600" />
    },
    {
      id: 'rosecoco_beans',
      name: 'Sorted Rosecoco Beans',
      category: 'Legumes',
      unit: '90kg Bags',
      basePrice: 8500,
      minOrder: '10 Bags',
      specs: 'Double-polished, size-graded local rosecoco beans. Highly nutritious, moisture checked at 12.8% • Bags are labeled and verified.',
      icon: <ShieldCheck className="h-6 w-6 text-rose-600" />
    }
  ];

  const activeProductData = wholesaleProducts.find(p => p.id === product) || wholesaleProducts[0];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || !contactPerson.trim() || !email.trim()) {
      alert('Please fill out all contact information fields.');
      return;
    }

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      alert('Please enter a valid target quantity.');
      return;
    }

    const subtotal = qty * activeProductData.basePrice;
    const processingFee = Math.round(subtotal * 0.015); // 1.5% cooperative administration packing fee
    const grandTotal = subtotal + processingFee;

    const randomRef = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;

    setInquiryQuote({
      ref: randomRef,
      company: companyName.trim(),
      person: contactPerson.trim(),
      email: email.trim(),
      product: activeProductData.name,
      unit: activeProductData.unit,
      qty: qty,
      pricePerUnit: activeProductData.basePrice,
      subtotal: subtotal,
      fee: processingFee,
      total: grandTotal,
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="bg-stone-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-mono bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
            Commercial Supply Contracts
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-sans tracking-tight mt-3">
            Wholesale B2B Produce Marketplace
          </h2>
          <p className="text-stone-600 mt-4 leading-relaxed">
            Keiyian Farmers Co-operative connects commercial milling houses, dairy processing plants, and food distributors directly to large-scale aggregated smallholder harvests. Secure reliable quality under professional supply contracts.
          </p>
        </div>

        {/* Product Catalog Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {wholesaleProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="bg-stone-50 border border-stone-100 p-3 rounded-xl flex-shrink-0">
                      {p.icon}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-stone-900 text-lg font-sans">{p.name}</h3>
                      <span className="text-4xs font-mono font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block font-mono">Wholesale Base</span>
                    <span className="text-lg font-bold text-emerald-800 font-mono">KSh {p.basePrice.toLocaleString()}</span>
                    <span className="text-3xs text-stone-500 block">per {p.unit.slice(0, -1)}</span>
                  </div>
                </div>

                <div className="bg-stone-50/60 p-4 rounded-xl border border-stone-100 space-y-2">
                  <span className="text-4xs font-bold text-stone-400 uppercase tracking-widest block font-mono">Quality Specifications:</span>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {p.specs}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center text-xs">
                <div>
                  <span className="text-stone-400 block font-mono">Minimum Order:</span>
                  <span className="font-bold text-stone-800">{p.minOrder}</span>
                </div>
                <button
                  onClick={() => {
                    setProduct(p.id);
                    if (p.id === 'raw_milk') setQuantity('5000');
                    else setQuantity('100');
                    window.scrollTo({ top: document.getElementById('b2b-contract-form')?.offsetTop || 1000, behavior: 'smooth' });
                  }}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <span>Select product</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* B2B Contract Quotation Calculator */}
        <div id="b2b-contract-form" className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden lg:grid lg:grid-cols-12 max-w-5xl mx-auto">
          
          {/* Left Column: Form Inquiry Inputs */}
          <div className="p-8 sm:p-10 lg:col-span-6">
            <div className="flex items-center space-x-2.5 mb-6">
              <Building2 className="h-5.5 w-5.5 text-emerald-700" />
              <h3 className="text-lg font-bold text-stone-900 font-sans tracking-tight">Cooperative B2B Purchase Order Quote</h3>
            </div>

            <p className="text-xs text-stone-600 leading-normal mb-6">
              Establish a wholesale purchase quote. Once submitted, our cooperative marketing directors will draft a formal supply agreement including transport logistics.
            </p>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Shalem Grain Millers Ltd"
                  required
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Martha Mwangi"
                    required
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Contact Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@millers.co.ke"
                    required
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1">Selected Product</label>
                  <select
                    value={product}
                    onChange={(e) => {
                      setProduct(e.target.value);
                      if (e.target.value === 'raw_milk') setQuantity('5000');
                      else setQuantity('100');
                    }}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 font-bold text-stone-800"
                  >
                    {wholesaleProducts.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-3xs font-bold text-stone-500 uppercase tracking-wider mb-1 flex justify-between">
                    <span>Target Quantity</span>
                    <span className="text-emerald-700 font-mono font-bold">min: {activeProductData.minOrder}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 1000"
                      required
                      className="w-full pl-3 pr-20 py-2 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 text-stone-800 font-mono font-bold"
                    />
                    <span className="absolute right-3 top-2 text-stone-400 text-3xs font-extrabold font-mono uppercase tracking-wide">
                      {activeProductData.unit}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs shadow transition-all flex items-center justify-center space-x-1.5"
              >
                <FileText className="h-4.5 w-4.5" />
                <span>Calculate &amp; Request Purchase Contract</span>
              </button>
            </form>
          </div>

          {/* Right Column: Calculations Outputs & Pro-Forma Invoice */}
          <div className="p-8 sm:p-10 lg:col-span-6 bg-stone-900 text-white flex flex-col justify-between border-l border-stone-800 relative">
            
            {!inquiryQuote ? (
              /* State: Awaiting Submission */
              <div className="my-auto text-center py-12 space-y-4">
                <HelpCircle className="h-12 w-12 text-stone-600 mx-auto" />
                <h4 className="font-bold text-base text-stone-400 font-sans">Pro-Forma Quotation Ledger</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-normal">
                  Fill out the buyer information sheet and click generate to instantly structure cooperative wholesale bulk pricing schedules.
                </p>
              </div>
            ) : (
              /* State: Quotation Display */
              <div className="space-y-5">
                <div className="flex justify-between items-start border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-emerald-400 text-3xs font-mono font-bold uppercase tracking-widest block">
                      PRO-FORMA INQUIRY
                    </span>
                    <h4 className="text-base font-bold text-white font-sans">{inquiryQuote.product}</h4>
                    <span className="text-4xs text-stone-400 font-mono mt-0.5 block">Ref No: {inquiryQuote.ref}</span>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                </div>

                <div className="text-3xs text-stone-400 space-y-1 bg-stone-950/50 p-3 rounded-xl border border-stone-800/80">
                  <div>🏢 Company: <strong className="text-stone-200">{inquiryQuote.company}</strong></div>
                  <div>👤 Representative: <strong className="text-stone-200">{inquiryQuote.person}</strong></div>
                  <div>📧 Contact Email: <strong className="text-stone-200">{inquiryQuote.email}</strong></div>
                  <div>📅 Date Generated: <strong className="text-emerald-400">{inquiryQuote.date}</strong></div>
                </div>

                <div className="border-t border-stone-800 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Order Quantity:</span>
                    <span className="font-mono font-bold">{inquiryQuote.qty.toLocaleString()} {inquiryQuote.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Base Wholesale Rate:</span>
                    <span className="font-mono font-bold">KSh {inquiryQuote.pricePerUnit.toLocaleString()} / unit</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-800/40 pt-1">
                    <span className="text-stone-400">Aggregation Subtotal:</span>
                    <span className="font-mono font-bold">KSh {inquiryQuote.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Cooperative Admin &amp; Packing Fee (1.5%):</span>
                    <span className="font-mono font-bold">KSh {inquiryQuote.fee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-emerald-950/60 rounded-xl p-4 border border-emerald-900/60 mt-3">
                  <span className="text-4xs uppercase tracking-widest text-emerald-400 font-mono font-bold">Est. Total FOB Contract Price</span>
                  <div className="text-2xl font-black font-sans text-emerald-400 mt-0.5">
                    KSh {inquiryQuote.total.toLocaleString()}
                  </div>
                  <span className="text-5xs text-emerald-300 block leading-normal mt-0.5">
                    *Excludes freight shipping from Keiyian Warehouses, Narok County. Price is guaranteed for 14 days.
                  </span>
                </div>

                <div className="bg-stone-950/30 text-5xs text-stone-400 leading-normal rounded p-2.5 border border-stone-800">
                  <strong>Notice:</strong> Your purchase proposal has been stored on our cooperative server queue. Our marketing managers will call or email you within 1 business day to coordinate quality certifications, loading times, and transport options.
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-stone-800 flex justify-between items-center text-4xs font-bold uppercase tracking-wider text-stone-500 font-mono">
              <span>Keiyian Cooperatives Ltd</span>
              <span>B2B Contract Division</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, Sprout, Play } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
  onPortalClick: () => void;
  onExploreServices: () => void;
  onContactClick: () => void;
}

export default function Hero({ onJoinClick, onPortalClick, onExploreServices, onContactClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      subtitle: "We are Producing Natural Products",
      title: "Agriculture.",
      buttonText: "About Us",
      bg: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=2000",
      description: "Keiyian Farmers Co-operative connects local smallholders in Trans Mara to premium markets, securing clean cold-chain bulking for milk and central moisture-controlled silos for maize.",
      onClick: () => {
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      subtitle: "State-of-the-art Cold Chain Bulking",
      title: "Dairy Co-op.",
      buttonText: "Our Services",
      bg: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=2000",
      description: "Delivering over 14,000 Litres of Grade-A chilled milk daily. Our state-of-the-art bulking coolers preserve high butterfat quality for major milk processing companies.",
      onClick: onExploreServices,
    },
    {
      subtitle: "Direct High-Yield Aggregated Grains",
      title: "Bulk Grain.",
      buttonText: "Contact Us",
      bg: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=2000",
      description: "Aggregating clean, low-moisture white maize and high-yield red sorghum directly from small-scale farms to meet major industrial procurement specifications.",
      onClick: onContactClick,
    }
  ];

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-stone-50 pb-20 font-sans">
      
      {/* 1. Full-Screen Agricultural Hero with Looping Video Background */}
      <div className="relative text-white overflow-hidden h-[480px] md:h-[620px] flex items-center">
        
        {/* Immersive background looping video with premium color overlays */}
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/hero-video.mp4?alt=media&token=e42b3a7f-7ff7-48c8-a3f6-492fe50457a7"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Real nature gradients (forest-green/earth-black to give ultimate legibility and organic vibe) */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-emerald-950/65 to-stone-900/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
        </div>

        {/* Abstract organic background visual grids (consistent overlay) */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] z-10" />

        {/* 2. Left Side Navigation Controls (Arrows from Insp) */}
        <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col space-y-4">
          <button
            onClick={handlePrevSlide}
            className="w-12 h-12 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            title="Previous Slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNextSlide}
            className="w-12 h-12 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            title="Next Slide"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* 3. Right Side Slide Indicator Dots (Vertically stacked dots from Insp) */}
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col space-y-3.5 items-center">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx 
                  ? 'bg-emerald-400 scale-125 ring-4 ring-emerald-400/30' 
                  : 'bg-white/35 hover:bg-white/60'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* 4. Active Slide Content Block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div 
            key={currentSlide} 
            className="max-w-3xl space-y-6 md:space-y-8 text-center md:text-left md:pl-16 animate-fade-in-up"
          >
            
            {/* Curvy double stroke handwriting effect subtitle container */}
            <div className="relative inline-block">
              <span className="text-emerald-300 font-extrabold tracking-widest text-xs uppercase bg-emerald-950/55 border border-emerald-900 px-3.5 py-1.5 rounded-full font-mono">
                {slides[currentSlide].subtitle}
              </span>
              <svg className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-44 h-2 text-[#EBB914]" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q30,9 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M5,8 Q35,11 55,7 T95,8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Massive Display Title (e.g. Agriculture.) */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white font-sans leading-none">
              {slides[currentSlide].title}
            </h1>

            {/* Slide description body */}
            <p className="text-sm sm:text-base text-stone-200 max-w-xl leading-relaxed font-medium">
              {slides[currentSlide].description}
            </p>

            {/* Premium Button Action (from Insp design: green rounded with golden arrow badge) */}
            <div className="pt-2 flex justify-center md:justify-start">
              <button
                onClick={slides[currentSlide].onClick}
                className="bg-[#246A1A] hover:bg-[#1E5615] text-white font-sans font-black uppercase text-xs tracking-widest px-8 py-3.5 rounded-full flex items-center space-x-4 transition-all duration-300 shadow-lg hover:shadow-emerald-950/40 group cursor-pointer"
              >
                <span>{slides[currentSlide].buttonText}</span>
                <span className="bg-[#EBB914] text-stone-900 h-7.5 w-7.5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5 shadow-sm">
                  <ArrowRight className="h-4.5 w-4.5" />
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* 5. Inspo-Inspired "About Us" Section */}
      <section id="about-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Narrative, Bullet points, Sign-off */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase block font-mono">
                Get to Know Keiyian Farmers
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight uppercase font-sans">
                Building Strong Farmers,<br />Strong Communities
              </h2>
              {/* Yellow flourish line or triple leaf icon under title */}
              <div className="flex items-center space-x-1 text-[#EBB914] pt-1">
                <Sprout className="h-5 w-5" />
                <span className="h-[2px] w-12 bg-[#EBB914]" />
                <span className="h-[2px] w-3 bg-[#EBB914]" />
              </div>
            </div>

            <p className="text-base font-extrabold text-emerald-900 leading-relaxed max-w-2xl">
              Keiyian Farmers Cooperative Society Ltd is a registered farmers' cooperative dedicated to supporting agricultural and livestock farmers through collective action.
            </p>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              <p>
                Our cooperative provides farmers with access to quality farming services, milk collection, agricultural training, livestock improvement programs, affordable farm inputs, financial opportunities, and better market access.
              </p>
              <p>
                By working together, we help farmers increase productivity, improve incomes, and create sustainable livelihoods for future generations.
              </p>
            </div>

            {/* List with checkmarks */}
            <ul className="space-y-3 pt-2">
              <li className="flex items-center space-x-3 text-stone-800 font-bold text-sm sm:text-base">
                <span className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
                <span>Transforming agriculture through modern dairy & crop technologies</span>
              </li>
              <li className="flex items-center space-x-3 text-stone-800 font-bold text-sm sm:text-base">
                <span className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
                <span>Empowering over 3,000 local smallholders with direct market access</span>
              </li>
            </ul>

          </div>

          {/* Right Block: Overlapping images with golden accent blocks and animated play circle */}
          <div className="lg:col-span-5 relative pt-10 sm:pt-16 pb-12">
            
            {/* Background solid gold accent block */}
            <div className="absolute top-16 right-0 w-[85%] h-[82%] bg-[#EBB914] rounded-2xl -z-10 shadow-lg transform translate-x-2 translate-y-2 opacity-95" />

            {/* Main large image (Tea Harvesting Demonstration) */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] w-[88%] mr-auto">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F482205686_959817576299768_6625594529938376275_n.jpg?alt=media&token=579e099a-08c6-44f0-8280-15ce64ba47e9"
                alt="Keiyian Farmers Tea Harvesting Demonstration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Smaller secondary overlapping image (Sahiwal Breeding Cattle) */}
            <div className="absolute bottom-0 right-0 w-[55%] aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10 hidden sm:block">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484011154_959145109700348_6229700170874551040_n.jpg?alt=media&token=87b2eb4b-bbc9-4a2d-a403-8403dfea184a"
                alt="Sahiwal Breeding Cattle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Play Button Container with elegant concentric rings overlay */}
            <div className="absolute top-[35%] left-[5%] z-20 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-white/25 animate-ping" />
                <div className="absolute -inset-2 rounded-full bg-white/40 animate-pulse" />
                <button
                  onClick={onExploreServices}
                  className="h-16 w-16 rounded-full bg-[#EBB914] hover:bg-[#d6a50f] text-stone-900 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                  title="Watch Cooperative Milestones Video"
                >
                  <Play className="h-6 w-6 text-stone-950 fill-current translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Vision & Mission Cards Row */}
      <section className="bg-stone-100/50 border-y border-stone-200/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Vision Card */}
            <div className="bg-white rounded-2xl shadow-md border border-stone-200/60 p-8 md:p-10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-stone-900 tracking-tight uppercase font-sans">
                  Vision
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-medium">
                  To be the leading farmers' cooperative transforming agriculture through innovation, sustainability, and community empowerment.
                </p>
              </div>
              <div className="pt-6">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#246A1A] font-mono">
                  Sustainable Transformation
                </span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl shadow-md border border-stone-200/60 p-8 md:p-10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-stone-900 tracking-tight uppercase font-sans">
                  Mission
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-medium">
                  To empower our members by providing quality agricultural services, promoting modern farming practices, improving market access, and creating economic opportunities that improve the quality of life within our community.
                </p>
              </div>
              <div className="pt-6">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-mono">
                  Community Empowerment
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Core Values Grid */}
      <section id="core-values-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase block font-mono">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight uppercase font-sans">
            Our Core Values
          </h2>
          <p className="text-sm text-stone-500 max-w-lg mx-auto">
            These foundational pillars guide our decisions, support our community, and drive sustainable growth for all Keiyian farmers.
          </p>
          <div className="flex justify-center pt-2">
            <span className="h-1 w-16 bg-[#EBB914] rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Integrity */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-4">
            <h4 className="text-xl sm:text-2xl font-black text-stone-900 font-sans tracking-tight uppercase">
              Integrity
            </h4>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
              We operate with honesty, transparency, and accountability.
            </p>
          </div>

          {/* Unity */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-4">
            <h4 className="text-xl sm:text-2xl font-black text-stone-900 font-sans tracking-tight uppercase">
              Unity
            </h4>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
              Together we achieve more than we can individually.
            </p>
          </div>

          {/* Excellence */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-4">
            <h4 className="text-xl sm:text-2xl font-black text-stone-900 font-sans tracking-tight uppercase">
              Excellence
            </h4>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
              We strive to provide quality services and continuous improvement.
            </p>
          </div>

          {/* Innovation */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-4">
            <h4 className="text-xl sm:text-2xl font-black text-stone-900 font-sans tracking-tight uppercase">
              Innovation
            </h4>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
              We embrace modern farming technologies and sustainable agricultural practices.
            </p>
          </div>

          {/* Sustainability */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-4">
            <h4 className="text-xl sm:text-2xl font-black text-stone-900 font-sans tracking-tight uppercase">
              Sustainability
            </h4>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
              We protect our environment while improving agricultural productivity.
            </p>
          </div>

          {/* Community */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-4">
            <h4 className="text-xl sm:text-2xl font-black text-stone-900 font-sans tracking-tight uppercase">
              Community
            </h4>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
              Our success contributes to the wellbeing of every farmer and the entire community.
            </p>
          </div>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-section" className="scroll-mt-24 bg-white border-t border-stone-200/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Headings */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase block font-mono">
                Why Choose Us?
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight uppercase font-sans animate-fade-in">
                Your Trusted<br />Agricultural Partner
              </h2>
              <div className="flex items-center space-x-1 text-[#EBB914] pt-1">
                <span className="h-[2px] w-12 bg-[#EBB914]" />
                <span className="h-[2px] w-3 bg-[#EBB914]" />
              </div>
              <p className="text-sm sm:text-base text-stone-500 max-w-md leading-relaxed font-medium">
                At Keiyian Farmers, we are committed to providing the best tools, services, and opportunities for smallholder farmers to thrive in today's competitive agricultural environment.
              </p>
            </div>
            
            {/* Right Col: Bullet Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Farmer-owned and managed",
                "Fair and transparent pricing",
                "Reliable milk collection services",
                "Professional agricultural support",
                "Quality farm inputs",
                "Training and capacity building",
                "Sustainable farming initiatives",
                "Community-focused development"
              ].map((item, idx) => (
                <div key={idx} className="bg-stone-50 rounded-2xl p-6 border border-stone-100 flex items-start space-x-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <span className="h-6 w-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xs flex-shrink-0">
                    ✔
                  </span>
                  <span className="text-sm sm:text-base text-stone-800 font-bold leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership & Support Section */}
      <section className="bg-stone-100/50 border-t border-stone-200/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase block font-mono">
              Partner with Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight uppercase font-sans">
              Partner with Keiyian Farmers Cooperative Society Ltd
            </h2>
            <p className="text-sm sm:text-base text-stone-500 max-w-xl mx-auto leading-relaxed">
              Become part of a growing community dedicated to improving agriculture and creating lasting prosperity.
            </p>
            <div className="flex justify-center pt-2">
              <span className="h-1 w-16 bg-[#EBB914] rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Cooperative Benefits Card */}
            <div className="lg:col-span-6 bg-white rounded-2xl shadow-md border border-stone-200/60 p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight uppercase font-sans border-b border-stone-100 pb-3">
                  Cooperative Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Better market opportunities",
                    "Access to affordable farm inputs",
                    "Agricultural training",
                    "Veterinary support",
                    "Financial empowerment",
                    "Cooperative growth",
                    "Networking with fellow farmers",
                    "Increased productivity"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-stone-700 font-semibold text-sm sm:text-base">
                      <span className="h-2 w-2 rounded-full bg-emerald-600 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Who Can Partner? Card */}
            <div className="lg:col-span-6 bg-white rounded-2xl shadow-md border border-stone-200/60 p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight uppercase font-sans border-b border-stone-100 pb-3">
                  Who Can Partner?
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm font-extrabold tracking-wide uppercase">
                  Cooperative support is open to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Dairy farmers",
                    "Livestock farmers",
                    "Crop farmers",
                    "Youth in agriculture",
                    "Women farmers",
                    "Agribusiness entrepreneurs"
                  ].map((type, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-stone-700 font-semibold text-sm sm:text-base">
                      <span className="h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Call to Action Container */}
          <div className="mt-16 bg-[#0A2218] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%)]" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight uppercase font-sans">
                Contact Keiyian Farmers Today
              </h3>
              <p className="text-sm sm:text-base text-stone-300 max-w-md mx-auto leading-relaxed">
                Take the first step to securing premium pricing, sustainable support, and cooperative growth.
              </p>
              <div className="pt-4 flex justify-center">
                <button
                  onClick={onContactClick}
                  className="bg-[#EBB914] hover:bg-[#d6a50f] text-stone-950 font-sans font-black uppercase text-xs tracking-widest px-10 py-4.5 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg cursor-pointer transform hover:scale-105"
                >
                  <span>Contact Us Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

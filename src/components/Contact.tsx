import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Globe, Sprout, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate real form submission
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: 'Membership Inquiry', message: '' });
  };

  return (
    <div className="bg-stone-50 py-20 font-sans relative overflow-hidden">
      
      {/* Decorative Top Background Flourish */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(circle_at_top,rgba(36,106,26,0.04),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block Inspired by Inspo Layout */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-extrabold tracking-widest text-xs sm:text-sm uppercase block font-mono">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight uppercase font-sans">
            We'd Love to Hear From You
          </h2>
          
          {/* Inspo Flourish Yellow Triple Leaves */}
          <div className="flex items-center justify-center space-x-1 text-[#EBB914] pt-2">
            <Sprout className="h-5 w-5" />
            <span className="h-[2px] w-12 bg-[#EBB914]" />
            <span className="h-[2px] w-3 bg-[#EBB914]" />
          </div>

          <p className="text-sm sm:text-base text-stone-500 max-w-xl mx-auto leading-relaxed">
            Whether you're interested in becoming a member, partnering with us, or learning more about our services, our team is ready to assist.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
          
          {/* Left Block: Contact coordinates */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/60 shadow-md flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <div>
                <span className="text-[#EBB914] font-mono text-xs font-black tracking-widest uppercase block mb-1">
                  Cooperative Details
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight uppercase font-sans">
                  Keiyian Farmers Cooperative Society Ltd
                </h3>
                <p className="text-xs text-emerald-800 font-extrabold uppercase tracking-widest mt-1 font-mono">
                  Nuru ya Jamii
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Phone Number</span>
                    <a href="tel:+254721346564" className="text-stone-700 font-normal hover:text-[#246A1A] transition-colors text-sm sm:text-base">
                      +254 721 346564
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Email Address</span>
                    <a href="mailto:info@keiyianfarm.co.ke" className="text-stone-700 font-normal hover:text-[#246A1A] transition-colors text-sm sm:text-base">
                      info@keiyianfarm.co.ke
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Official Website</span>
                    <a href="https://www.keiyianfarm.co.ke" target="_blank" rel="noopener noreferrer" className="text-stone-700 font-normal hover:text-[#246A1A] transition-colors text-sm sm:text-base">
                      www.keiyianfarm.co.ke
                    </a>
                  </div>
                </div>

                {/* Central Depot Location */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Headquarters</span>
                    <span className="text-stone-700 font-normal text-sm sm:text-base leading-snug">
                      Trans Mara West, Narok County, Kenya
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours block */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 space-y-3">
              <div className="flex items-center space-x-2 text-stone-800 font-extrabold">
                <Clock className="h-5 w-5 text-emerald-700" />
                <span className="text-sm uppercase tracking-wide font-sans">Office Hours</span>
              </div>
              <div className="space-y-1.5 text-xs text-stone-600 font-medium">
                <div className="flex justify-between">
                  <span>Monday – Friday:</span>
                  <span className="font-bold text-stone-900">8:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between border-t border-stone-200/50 pt-1.5">
                  <span>Weekends &amp; Holidays:</span>
                  <span className="font-bold text-rose-600">Closed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Block: Message / Feedback Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/60 shadow-md">
            
            {isSubmitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12">
                <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xl font-black text-stone-900 uppercase tracking-tight">Message Sent Successfully!</h4>
                  <p className="text-sm text-stone-500 max-w-sm leading-relaxed">
                    Thank you for contacting Keiyian Farmers. A member of our cooperative support team will get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs font-extrabold uppercase tracking-widest text-[#246A1A] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight uppercase font-sans">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Fill out the form below and our coordinators will reach out.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-stone-600 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Kenei"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-[#246A1A] focus:ring-1 focus:ring-[#246A1A]/30 rounded-xl px-4 py-3 text-sm font-semibold text-stone-800 placeholder-stone-400 outline-none transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-stone-600 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-[#246A1A] focus:ring-1 focus:ring-[#246A1A]/30 rounded-xl px-4 py-3 text-sm font-semibold text-stone-800 placeholder-stone-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-stone-600 uppercase tracking-wide">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +254 712 345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-[#246A1A] focus:ring-1 focus:ring-[#246A1A]/30 rounded-xl px-4 py-3 text-sm font-semibold text-stone-800 placeholder-stone-400 outline-none transition-all"
                    />
                  </div>

                  {/* Subject Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-stone-600 uppercase tracking-wide">Inquiry Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-[#246A1A] focus:ring-1 focus:ring-[#246A1A]/30 rounded-xl px-4 py-3.5 text-sm font-bold text-stone-800 outline-none transition-all"
                    >
                      <option value="Membership Inquiry">Apply for Cooperative Membership</option>
                      <option value="Milk Bulking Station">Milk Bulking &amp; Cooler Services</option>
                      <option value="Farm Inputs Advanced">Farm Inputs &amp; Advanced Fertilizer</option>
                      <option value="Partner Opportunities">NGO / Partnership Opportunities</option>
                      <option value="General Feedback">General Feedback &amp; Suggestions</option>
                    </select>
                  </div>
                </div>

                {/* Message Text area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-stone-600 uppercase tracking-wide">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write details about your membership interest or specific agricultural support needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-[#246A1A] focus:ring-1 focus:ring-[#246A1A]/30 rounded-xl px-4 py-3 text-sm font-semibold text-stone-800 placeholder-stone-400 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#246A1A] hover:bg-[#1E5615] text-white font-sans font-black uppercase text-xs tracking-widest py-4.5 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span>Send Message Now</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

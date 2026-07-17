import { Milk, HeartPulse, Sprout, GraduationCap, TrendingUp, Coins, Check } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 'srv-1',
      title: 'Dairy Collection & Marketing',
      description: 'We collect, process, and market quality milk while ensuring farmers receive fair and competitive prices.',
      icon: <Milk className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1527156279145-8860c5727563?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'srv-2',
      title: 'Livestock Development',
      description: 'Our cooperative supports members through:',
      list: [
        'Artificial insemination services',
        'Veterinary support',
        'Animal health programs',
        'Breed improvement',
        'Livestock management training'
      ],
      icon: <HeartPulse className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'srv-3',
      title: 'Farm Inputs Supply',
      description: 'Members enjoy access to:',
      list: [
        'Animal feeds',
        'Fertilizers',
        'Seeds',
        'Farm equipment',
        'Veterinary products'
      ],
      footer: 'at affordable cooperative prices.',
      icon: <Sprout className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'srv-4',
      title: 'Farmer Training',
      description: 'We regularly organize training on:',
      list: [
        'Modern dairy farming',
        'Climate-smart agriculture',
        'Crop production',
        'Livestock management',
        'Financial literacy',
        'Agribusiness development'
      ],
      icon: <GraduationCap className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'srv-5',
      title: 'Market Access',
      description: 'We connect farmers with reliable buyers to ensure fair pricing and consistent markets for agricultural products.',
      icon: <TrendingUp className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'srv-6',
      title: 'Savings & Financial Support',
      description: 'Through cooperative initiatives, members gain opportunities to:',
      list: [
        'Save regularly',
        'Access affordable loans',
        'Invest in farm expansion',
        'Improve household income'
      ],
      icon: <Coins className="h-6 w-6" />,
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="bg-stone-50/60 py-20 font-sans relative overflow-hidden">
      
      {/* Decorative Top Background Flourish */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(circle_at_top,rgba(36,106,26,0.04),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block Inspired by Inspo Layout */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-emerald-700 font-extrabold tracking-widest text-xs sm:text-sm uppercase block font-mono">
            What We’re Doing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight uppercase font-sans">
            Services We’re Offering
          </h2>
          
          {/* Inspo Flourish Yellow Triple Leaves */}
          <div className="flex items-center justify-center space-x-1 text-[#EBB914] pt-2">
            <Sprout className="h-5 w-5" />
            <span className="h-[2px] w-12 bg-[#EBB914]" />
            <span className="h-[2px] w-3 bg-[#EBB914]" />
          </div>
        </div>

        {/* Services Inspo-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {services.map((srv) => (
            <div 
              key={srv.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-200/60 p-8 flex flex-col justify-between group"
            >
              <div>
                
                {/* Circular image and badge container */}
                <div className="relative w-44 h-44 mx-auto mb-8">
                  {/* Outer circle layout */}
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-stone-100 shadow-inner">
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  {/* Overlapping forest-green circle badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#246A1A] text-white p-3.5 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {srv.icon}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg sm:text-xl font-black text-stone-900 text-center tracking-tight uppercase mb-4 mt-2 font-sans">
                  {srv.title}
                </h3>

                {/* Description & List Block */}
                <div className="space-y-3">
                  <p className="text-sm text-stone-600 font-medium leading-relaxed text-center">
                    {srv.description}
                  </p>

                  {/* Bullet Points */}
                  {srv.list && (
                    <ul className="space-y-2.5 pt-2 max-w-xs mx-auto">
                      {srv.list.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2.5 text-stone-700 font-bold text-xs sm:text-sm">
                          <span className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </span>
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Footer message if any */}
                  {srv.footer && (
                    <p className="text-xs sm:text-sm text-emerald-800 font-extrabold text-center mt-3 pt-1 border-t border-stone-100">
                      {srv.footer}
                    </p>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

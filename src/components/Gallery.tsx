import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Maximize2, X, Filter, MapPin, Calendar, Tag, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'dairy' | 'tea' | 'crops' | 'facilities' | 'community';
  image: string;
  location: string;
  date: string;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return galleryItems.length;
    return galleryItems.filter(item => item.category === catId).length;
  };

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'dairy', label: 'Dairy & Livestock' },
    { id: 'tea', label: 'Tea Cultivation' },
    { id: 'crops', label: 'Crops & Fodder' },
    { id: 'facilities', label: 'Facilities & Assets' },
    { id: 'community', label: 'Co-op Community' },
  ];

  const galleryItems: GalleryItem[] = [
  {
    "id": "gal-1",
    "title": "Tea Harvesting Demonstration",
    "description": "Cooperative extension officers showing members the standard two-leaves-and-a-bud pluck method for premium tea yield.",
    "category": "tea",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F482205686_959817576299768_6625594529938376275_n.jpg?alt=media&token=579e099a-08c6-44f0-8280-15ce64ba47e9",
    "location": "Keiyian Tea Fields",
    "date": "June 2026"
  },
  {
    "id": "gal-2",
    "title": "Tea Harvesting",
    "description": "Members carefully hand-picking tea leaves in our high-altitude, nutrient-rich volcanic soil fields.",
    "category": "tea",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F482216285_961450759469783_7552501359579966155_n.jpg?alt=media&token=bead2132-cdf3-4e99-bc5d-ad3f71273864",
    "location": "Trans Mara Outgrower Area",
    "date": "May 2026"
  },
  {
    "id": "gal-3",
    "title": "Milk Collection Vehicles",
    "description": "Reliable, temperature-controlled transit trucks loading and transporting high-quality raw milk to regional bulking plants.",
    "category": "facilities",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F482220069_961457539469105_1658413992618836108_n.jpg?alt=media&token=12f0efda-a347-4588-a968-8716b957c7bc",
    "location": "Central Cooling Depot",
    "date": "July 2026"
  },
  {
    "id": "gal-4",
    "title": "Dairy Cattle Herd",
    "description": "Thriving pedigreed dairy cows at our demonstration pasture, exemplifying robust animal husbandry.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F482228794_961450842803108_9101987890404403591_n.jpg?alt=media&token=ab763431-5c6a-488d-9cd1-931df404402b",
    "location": "Keiyian Demo Farm",
    "date": "March 2026"
  },
  {
    "id": "gal-5",
    "title": "Grazing Dairy Cows",
    "description": "A healthy herd grazing on premium high-protein rye and Boma Rhodes grass mixes.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F482229755_961442542803938_3371974470025134199_n.jpg?alt=media&token=aef123d8-0053-4d91-9260-7e663cb00f8a",
    "location": "Trans Mara Highlands",
    "date": "April 2026"
  },
  {
    "id": "gal-6",
    "title": "Red Boran Cattle",
    "description": "Resilient and highly-adapted Red Boran breeding cattle showcased for livestock genetics diversification.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F482245040_961440262804166_5400390536673134717_n.jpg?alt=media&token=6b3e4440-ea8c-4d64-8ca8-2a09863445e9",
    "location": "Enoosaen Livestock Section",
    "date": "February 2026"
  },
  {
    "id": "gal-7",
    "title": "Sunflower Field",
    "description": "Vibrant sunflower crops cultivated as high-yield premium feed supplements and local cooking oil pressing seeds.",
    "category": "crops",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F482245951_961455499469309_8648657785892888391_n.jpg?alt=media&token=0786edd3-73e5-45a7-a7e7-5e6cab636d7a",
    "location": "Main Crop Farm",
    "date": "January 2026"
  },
  {
    "id": "gal-8",
    "title": "Cooperative Dairy Cattle",
    "description": "Superior genetic crossbred dairy heifers designed for maximum local milk production.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F483505178_962855739329285_1209431195278673266_n.jpg?alt=media&token=88383244-ca80-43b2-838b-0433e2450dac",
    "location": "Extension Clinic",
    "date": "May 2026"
  },
  {
    "id": "gal-9",
    "title": "Member Training Session",
    "description": "Cooperative agronomists training local farmers on efficient, sustainable land management practices.",
    "category": "community",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F483522601_962887189326140_9109718782298177099_n.jpg?alt=media&token=f19ebeb6-7146-48a2-a9cd-c9f403e1db05",
    "location": "Agronomy Depot Hall",
    "date": "June 2026"
  },
  {
    "id": "gal-10",
    "title": "Maize Silage Chopping",
    "description": "Mechanized silage chopping to preserve high-energy feed during dry seasons.",
    "category": "crops",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F483527816_961306669484192_2429474310908462662_n.jpg?alt=media&token=129c83f3-73bc-4cc5-8d12-8bcf13ee12fe",
    "location": "Keiyian Silage Center",
    "date": "June 2026"
  },
  {
    "id": "gal-11",
    "title": "Dairy Cow",
    "description": "Champion high-yield Holstein Friesian dairy cow at our elite breeding center.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F483791799_959557906325735_3520009920484972601_n.jpg?alt=media&token=18ba5f38-04bf-4852-9bba-a7acc3245827",
    "location": "Elite Breed Unit",
    "date": "May 2026"
  },
  {
    "id": "gal-12",
    "title": "Dairy Cows",
    "description": "Meticulously selected high-yielding cows in the co-op demonstration barns.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F483964941_959561022992090_6141417698572474381_n.jpg?alt=media&token=1e1feb52-550a-4b36-ae71-1fef8d4b6706",
    "location": "Enoosaen Demo Farm",
    "date": "July 2026"
  },
  {
    "id": "gal-13",
    "title": "Sahiwal Breeding Cattle",
    "description": "Display of sturdy Sahiwal genetics, ideal for the dual milk-and-beef tropical environment.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484011154_959145109700348_6229700170874551040_n.jpg?alt=media&token=87b2eb4b-bbc9-4a2d-a403-8403dfea184a",
    "location": "Breeding Exhibition",
    "date": "June 2026"
  },
  {
    "id": "gal-14",
    "title": "Keiyian Fiti Probiotic Yoghurt",
    "description": "Our certified, highly popular probiotic yogurt produced directly from member-supplied quality milk.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484035704_959700909644768_271133928789454720_n.jpg?alt=media&token=83d27701-b9d1-4864-ba3f-436b5df7ea5d",
    "location": "Keiyian Dairy Plant",
    "date": "May 2026"
  },
  {
    "id": "gal-15",
    "title": "Grazing Cattle Herd",
    "description": "Substandard-resilient breeds grazing under natural savanna pastures, promoting organic farming.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484075126_962855585995967_738930562222538427_n.jpg?alt=media&token=7cd1523a-2db5-430d-8e14-e0e3c2f0141a",
    "location": "Narok Savanna Fields",
    "date": "April 2026"
  },
  {
    "id": "gal-16",
    "title": "Subsidized Heavy Tractor",
    "description": "Subsidized modern farming mechanization assets, helping members with modern seedbed preparation.",
    "category": "facilities",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484150131_961306306150895_3893587077141575476_n.jpg?alt=media&token=eafa8b1c-07c8-40b8-b489-314ee4db9b59",
    "location": "Central Machinery Yard",
    "date": "March 2026"
  },
  {
    "id": "gal-17",
    "title": "Farmers Meeting",
    "description": "Warm interactive discussion between cooperative management and grassroot farmer members.",
    "category": "community",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484167123_962889459325913_2821419252264184392_n.jpg?alt=media&token=cf3399e6-ff6a-4acc-956c-bb95e75194c8",
    "location": "Highland Outreach Post",
    "date": "May 2026"
  },
  {
    "id": "gal-18",
    "title": "Member Training Session",
    "description": "Hands-on agricultural experts teaching members optimized dairy yield and modern pest control.",
    "category": "community",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484210617_962634282684764_7277036304859513255_n.jpg?alt=media&token=f3d69e13-c0f8-4cb3-ac3e-a03d91aa80c1",
    "location": "Trans Mara Training Hub",
    "date": "June 2026"
  },
  {
    "id": "gal-19",
    "title": "Tea Plantation",
    "description": "Endless lush rolling hills of vibrant high-altitude green tea, supporting sustainable livelihoods.",
    "category": "tea",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484492371_962857619329097_7764781701672429485_n.jpg?alt=media&token=f9f506c9-43af-48e7-86bf-90d4d69ce8cc",
    "location": "Keiyian Tea Zone",
    "date": "July 2026"
  },
  {
    "id": "gal-20",
    "title": "Tea Leaf Harvesting",
    "description": "Co-op farmers plucking premium green gold tea leaves during optimal morning conditions.",
    "category": "tea",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484493388_962889369325922_6078792261921715172_n.jpg?alt=media&token=2f517270-2872-40bf-9369-388bacf99e92",
    "location": "Main Tea Blocks",
    "date": "June 2026"
  },
  {
    "id": "gal-21",
    "title": "Farmer Training Session",
    "description": "Collaborative discussion sharing dairy milk-handling hygiene techniques in the local sub-county.",
    "category": "community",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484500047_962887495992776_7984986557206367779_n.jpg?alt=media&token=cf5e214a-4c35-4438-a87e-a358b798b5a6",
    "location": "Keiyian Community Hall",
    "date": "July 2026"
  },
  {
    "id": "gal-22",
    "title": "Cattle Grazing Herd",
    "description": "Vibrant local cattle grazing peacefully on the lush community cooperative fields.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484544742_965134212434771_6126834712606357677_n.jpg?alt=media&token=9fad2f62-d2cb-4d97-ae8c-7d52d48788fd",
    "location": "Mineral Depot Pastures",
    "date": "June 2026"
  },
  {
    "id": "gal-23",
    "title": "Cattle Herd Movement",
    "description": "Orderly rotational movement of cooperative cattle herds to fresh, rich pasturage plots.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484551651_965348535746672_5956914748621177125_n.jpg?alt=media&token=9e3214ea-34ab-484a-936c-5dbf6b8501b1",
    "location": "Sila Highlands",
    "date": "May 2026"
  },
  {
    "id": "gal-24",
    "title": "Tea Plantation Workers",
    "description": "Dedicated team members cultivating premium quality tea leaves in the early mist of Trans Mara.",
    "category": "tea",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484587712_962857922662400_3387558892608416137_n.jpg?alt=media&token=cae3f6e3-9163-4248-8bd6-2d9f151957a7",
    "location": "Keiyian tea zones",
    "date": "July 2026"
  },
  {
    "id": "gal-25",
    "title": "Cattle Herd Trekking",
    "description": "Members guiding herds along historical watering trails in the savanna plains.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484656882_966190635662462_4834501372997270003_n.jpg?alt=media&token=e8dc01ee-709d-4536-992c-3ca39cc26c6b",
    "location": "Keiyian Savanna",
    "date": "June 2026"
  },
  {
    "id": "gal-26",
    "title": "Holstein Friesian Cattle",
    "description": "Elite Holstein Friesian cows showing superior physical confirmation and high dairy capacities.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484719924_965141155767410_6910868025055392287_n.jpg?alt=media&token=2b1e6fb8-40c4-44c8-a6db-723f26d8d5e2",
    "location": "Livestock Center",
    "date": "June 2026"
  },
  {
    "id": "gal-27",
    "title": "Grazing Cattle Herd",
    "description": "Natural rotational paddock grazing that increases grass regenerations and builds soil health.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484794050_965133189101540_1887826783194788273_n.jpg?alt=media&token=5c22a2a0-3499-49e2-b9f8-c2f24f7a0f01",
    "location": "Demonstration Pastures",
    "date": "July 2026"
  },
  {
    "id": "gal-28",
    "title": "Probiotic Yogurt Cups",
    "description": "Certified, highly-nutritious probiotic yogurt batches packaged freshly at our cooperative processing facilities.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484806976_965348825746643_7672388640378192958_n.jpg?alt=media&token=8e65463a-e47d-4e8a-a901-25c4a5f9ed10",
    "location": "Yogurt Processing Unit",
    "date": "May 2026"
  },
  {
    "id": "gal-29",
    "title": "Brahman Cattle Herd",
    "description": "Heat-tolerant Brahman crossbreeds grazing in the Narok warm-savanna micro-climate.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484808749_965134309101428_2320522394127883699_n.jpg?alt=media&token=8bf325cb-8813-49e0-bb89-73fa8acaf6b0",
    "location": "Breeding Hub Fields",
    "date": "June 2026"
  },
  {
    "id": "gal-30",
    "title": "Herd of Cattle",
    "description": "Superb pedigreed herd of cattle moving through the rich Narok high-country pastures.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484849687_965137025767823_8147955928425814574_n.jpg?alt=media&token=9dcf256e-7728-45c2-aec2-e7dcde777368",
    "location": "Mara Foothills",
    "date": "June 2026"
  },
  {
    "id": "gal-31",
    "title": "Grazing Cattle Herd",
    "description": "Sustainably grazing mixed dairy and beef herds under cloud-filtered afternoon savanna sun.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484878146_965216565759869_8101809930043220710_n.jpg?alt=media&token=e5f504e3-6e46-4703-a2cd-312ae280d98d",
    "location": "Central Paddock Lines",
    "date": "May 2026"
  },
  {
    "id": "gal-32",
    "title": "Tea Plantation Workers",
    "description": "Smiling co-op farmers collecting first-grade tea harvests in their regional collection baskets.",
    "category": "tea",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484947954_962887505992775_6246888489684902518_n.jpg?alt=media&token=d9e46399-f523-4099-8ea6-2f8b82288a0f",
    "location": "High-Altitude Fields",
    "date": "July 2026"
  },
  {
    "id": "gal-33",
    "title": "Holstein Friesian Cattle",
    "description": "Healthy dairy cow standing elegantly in the co-op pasture, showcasing optimum health and hygiene.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484986979_965140962434096_5918156965877300238_n.jpg?alt=media&token=788ee419-4aa2-4146-b23e-a8c33b33d384",
    "location": "Central Pasture Block",
    "date": "May 2026"
  },
  {
    "id": "gal-34",
    "title": "Co-operative Member Meeting",
    "description": "Democratic co-op structure in action with community dialogue, feedback, and strategic dairy reviews.",
    "category": "community",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F484988543_962887515992774_260526343612743988_n.jpg?alt=media&token=869eb22a-eb63-4a44-9703-cf32841ef60c",
    "location": "Cooperative Pavilion",
    "date": "May 2026"
  },
  {
    "id": "gal-35",
    "title": "Grazing Cattle Herd",
    "description": "Beef and dual dairy livestock breeds thriving under natural, eco-friendly open range conditions.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F485033524_963503595931166_4836186551167314534_n.jpg?alt=media&token=ae1cbe71-1754-4892-904b-0b0d1388922a",
    "location": "Keiyian Outpost",
    "date": "June 2026"
  },
  {
    "id": "gal-36",
    "title": "Keiyian Fiti Probiotic Yoghurt",
    "description": "Packaged premium yogurt lines prepared for regional school feeding programs and retail centers.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F485144089_965349012413291_6092912673427168181_n.jpg?alt=media&token=15886d5d-a92a-493d-a06e-7b3ead029783",
    "location": "Co-op Dairy Hub",
    "date": "July 2026"
  },
  {
    "id": "gal-37",
    "title": "Red Zebu Cattle",
    "description": "Indigenous drought-resilient Red Zebu cattle raised sustainably by our dryland pastoralist members.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F485347781_969225058692353_7000103842542568174_n.jpg?alt=media&token=65c138fa-22b5-4c3f-a1fc-1b3e7b8ee244",
    "location": "Southern Savanna Zone",
    "date": "June 2026"
  },
  {
    "id": "gal-38",
    "title": "Herd of Cattle",
    "description": "A beautiful overhead wide shot of a massive cattle herd roaming the expansive grassland pastures.",
    "category": "dairy",
    "image": "https://firebasestorage.googleapis.com/v0/b/keiyian-farm.firebasestorage.app/o/Gallery%2F485593863_965957275685798_5157728703302792898_n.jpg?alt=media&token=bd0d1440-7201-4e34-8962-08be882470c7",
    "location": "Keiyian High Pastures",
    "date": "June 2026"
  }
];
  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-stone-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <ImageIcon className="h-4.5 w-4.5 text-[#246A1A]" />
            <span>Visual Showcase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight font-sans leading-none">
            Our Farming <span className="text-[#246A1A]">Gallery</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Take a visual tour through the thriving fields, cold-chain processing facilities, and close-knit farming community of Keiyian Farmers Co-operative in Narok County.
          </p>
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <div className="flex items-center space-x-2 text-stone-500 mr-2 text-xs font-bold uppercase tracking-wider">
            <Filter className="h-4 w-4 text-stone-400" />
            <span>Filter By:</span>
          </div>
          {categories.map((cat) => {
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer shadow-sm flex items-center space-x-2 ${
                  selectedCategory === cat.id
                    ? 'bg-[#246A1A] text-white'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-emerald-100'
                    : 'bg-stone-100 text-stone-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Bento Masonry Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                      onClick={() => setActiveImage(item)}
                      className="bg-white hover:bg-[#EBB914] text-stone-900 h-10 w-10 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110 ml-auto cursor-pointer"
                      title="Expand view"
                    >
                      <Maximize2 className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="absolute top-3 left-3 bg-stone-900/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                    {item.category}
                  </span>
                </div>

                {/* Info Text Area */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-stone-900 text-lg group-hover:text-[#246A1A] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Metadata Bar */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-medium">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-[#246A1A]" />
                      <span className="truncate max-w-[140px]">{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-[#EBB914]" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal Dialog */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setActiveImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Lightbox Image Panel */}
                <div className="relative flex-grow bg-black md:w-3/5 flex items-center justify-center">
                  <img
                    src={activeImage.image}
                    alt={activeImage.title}
                    className="w-full h-auto max-h-[45vh] md:max-h-[75vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => setActiveImage(null)}
                    className="absolute top-4 left-4 bg-stone-900/80 hover:bg-stone-950 text-white p-2 rounded-full border border-white/10 transition-transform hover:scale-105 shadow-md cursor-pointer md:hidden"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Lightbox Metadata Panel */}
                <div className="p-6 sm:p-8 md:w-2/5 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-stone-100 overflow-y-auto">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center space-x-1.5">
                        <Tag className="h-3 w-3 text-[#246A1A]" />
                        <span>{activeImage.category}</span>
                      </span>
                      <button
                        onClick={() => setActiveImage(null)}
                        className="hidden md:flex bg-stone-100 hover:bg-stone-200 text-stone-600 p-2 rounded-full transition-transform hover:scale-105 cursor-pointer"
                        title="Close Gallery"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-2xl font-black text-stone-900 tracking-tight font-sans leading-tight">
                        {activeImage.title}
                      </h2>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-stone-100 text-xs sm:text-sm">
                      <div className="flex items-center text-stone-600 space-x-2.5">
                        <div className="bg-stone-100 p-1.5 rounded-lg">
                          <MapPin className="h-4 w-4 text-[#246A1A]" />
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-bold uppercase">Location</p>
                          <p className="font-semibold text-stone-800">{activeImage.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-stone-600 space-x-2.5 mt-2">
                        <div className="bg-stone-100 p-1.5 rounded-lg">
                          <Calendar className="h-4 w-4 text-[#EBB914]" />
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-bold uppercase">Captured</p>
                          <p className="font-semibold text-stone-800">{activeImage.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-100 mt-6 flex">
                    <button
                      onClick={() => setActiveImage(null)}
                      className="w-full bg-[#246A1A] hover:bg-[#1E5615] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md hover:shadow-emerald-950/20"
                    >
                      <span>Return to Gallery</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

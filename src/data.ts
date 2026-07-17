import { Farmer, MilkDelivery, GrainDeposit, InputLoan, ExtensionBooking, Announcement, CooperativeStats } from './types';

// Default mock farmers
export const DEFAULT_FARMERS: Farmer[] = [
  {
    id: "KF-2041",
    name: "Ezekiel Kiprotich",
    phone: "+254 712 345 678",
    region: "Keiyian Center",
    dairyCattleCount: 5,
    maizeAcreage: 4,
    joinedDate: "2021-04-12"
  },
  {
    id: "KF-3011",
    name: "Faith Namunyak",
    phone: "+254 723 987 654",
    region: "Enoosaen",
    dairyCattleCount: 8,
    maizeAcreage: 10,
    joinedDate: "2022-09-18"
  },
  {
    id: "KF-1052",
    name: "Jackson Ole Kina",
    phone: "+254 734 555 123",
    region: "Kilgoris West",
    dairyCattleCount: 12,
    maizeAcreage: 15,
    joinedDate: "2019-11-05"
  }
];

// Milk delivery prices and values
export const MILK_PRICE_PER_LITER = 52; // KSh
export const MAIZE_PRICE_PER_BAG = 3800; // KSh (90kg bag)

// Default historical milk deliveries for the pre-populated farmers
export const DEFAULT_MILK_DELIVERIES: MilkDelivery[] = [
  // Ezekiel KF-2041
  { id: "MD-101", farmerId: "KF-2041", date: "2026-07-16", session: "Morning", quantityLiters: 18, qualityGrade: "A", status: "Approved", payoutAmount: 18 * MILK_PRICE_PER_LITER },
  { id: "MD-102", farmerId: "KF-2041", date: "2026-07-16", session: "Evening", quantityLiters: 12, qualityGrade: "A", status: "Approved", payoutAmount: 12 * MILK_PRICE_PER_LITER },
  { id: "MD-103", farmerId: "KF-2041", date: "2026-07-15", session: "Morning", quantityLiters: 17.5, qualityGrade: "B", status: "Approved", payoutAmount: 17.5 * MILK_PRICE_PER_LITER },
  { id: "MD-104", farmerId: "KF-2041", date: "2026-07-15", session: "Evening", quantityLiters: 13, qualityGrade: "A", status: "Approved", payoutAmount: 13 * MILK_PRICE_PER_LITER },
  { id: "MD-105", farmerId: "KF-2041", date: "2026-07-14", session: "Morning", quantityLiters: 19, qualityGrade: "A", status: "Approved", payoutAmount: 19 * MILK_PRICE_PER_LITER },
  { id: "MD-106", farmerId: "KF-2041", date: "2026-07-14", session: "Evening", quantityLiters: 11.5, qualityGrade: "B", status: "Approved", payoutAmount: 11.5 * MILK_PRICE_PER_LITER },
  { id: "MD-107", farmerId: "KF-2041", date: "2026-07-13", session: "Morning", quantityLiters: 16.5, qualityGrade: "A", status: "Approved", payoutAmount: 16.5 * MILK_PRICE_PER_LITER },
  
  // Faith KF-3011
  { id: "MD-201", farmerId: "KF-3011", date: "2026-07-16", session: "Morning", quantityLiters: 32, qualityGrade: "A", status: "Approved", payoutAmount: 32 * MILK_PRICE_PER_LITER },
  { id: "MD-202", farmerId: "KF-3011", date: "2026-07-16", session: "Evening", quantityLiters: 24, qualityGrade: "A", status: "Approved", payoutAmount: 24 * MILK_PRICE_PER_LITER },
  { id: "MD-203", farmerId: "KF-3011", date: "2026-07-15", session: "Morning", quantityLiters: 30.5, qualityGrade: "A", status: "Approved", payoutAmount: 30.5 * MILK_PRICE_PER_LITER },
  { id: "MD-204", farmerId: "KF-3011", date: "2026-07-15", session: "Evening", quantityLiters: 25, qualityGrade: "A", status: "Approved", payoutAmount: 25 * MILK_PRICE_PER_LITER },
  
  // Jackson KF-1052
  { id: "MD-301", farmerId: "KF-1052", date: "2026-07-16", session: "Morning", quantityLiters: 55, qualityGrade: "A", status: "Approved", payoutAmount: 55 * MILK_PRICE_PER_LITER },
  { id: "MD-302", farmerId: "KF-1052", date: "2026-07-16", session: "Evening", quantityLiters: 42, qualityGrade: "B", status: "Approved", payoutAmount: 42 * MILK_PRICE_PER_LITER },
  { id: "MD-303", farmerId: "KF-1052", date: "2026-07-15", session: "Morning", quantityLiters: 52, qualityGrade: "A", status: "Approved", payoutAmount: 52 * MILK_PRICE_PER_LITER },
];

// Default historical grain deposits
export const DEFAULT_GRAIN_DEPOSITS: GrainDeposit[] = [
  { id: "GD-101", farmerId: "KF-2041", date: "2026-05-10", grainType: "Maize", bags: 15, weightKg: 1350, moistureContent: 12.8, status: "Stored" },
  { id: "GD-102", farmerId: "KF-3011", date: "2026-05-18", grainType: "Maize", bags: 45, weightKg: 4050, moistureContent: 13.1, status: "Processed" },
  { id: "GD-103", farmerId: "KF-1052", date: "2026-05-24", grainType: "Maize", bags: 80, weightKg: 7200, moistureContent: 12.5, status: "Stored" },
  { id: "GD-104", farmerId: "KF-3011", date: "2026-06-02", grainType: "Sorghum", bags: 12, weightKg: 1080, moistureContent: 13.4, status: "Stored" },
];

// Default active input loans
export const DEFAULT_INPUT_LOANS: InputLoan[] = [
  { id: "IL-101", farmerId: "KF-2041", date: "2026-03-05", inputName: "DAP Fertilizer (50kg)", quantity: 2, unit: "Bags", totalCost: 7000, repaymentStatus: "Deducted from Payout" },
  { id: "IL-102", farmerId: "KF-2041", date: "2026-03-05", inputName: "Pannar Maize Seed (10kg)", quantity: 1, unit: "Pack", totalCost: 2800, repaymentStatus: "Active" },
  { id: "IL-103", farmerId: "KF-3011", date: "2026-03-12", inputName: "CAN Fertilizer (50kg)", quantity: 6, unit: "Bags", totalCost: 18000, repaymentStatus: "Deducted from Payout" },
  { id: "IL-104", farmerId: "KF-3011", date: "2026-03-12", inputName: "Pannar Maize Seed (10kg)", quantity: 3, unit: "Packs", totalCost: 8400, repaymentStatus: "Paid" },
  { id: "IL-105", farmerId: "KF-1052", date: "2026-04-01", inputName: "Super-Dairy Cow Feed", quantity: 10, unit: "Bags", totalCost: 25000, repaymentStatus: "Active" },
];

// Default extension bookings
export const DEFAULT_EXTENSIONS: ExtensionBooking[] = [
  { id: "EB-101", farmerId: "KF-2041", date: "2026-07-20", serviceType: "Veterinary Support", notes: "Ayrshire cow needs routine tick fever vaccination and overall physical checkup.", status: "Confirmed" },
  { id: "EB-102", farmerId: "KF-3011", date: "2026-07-22", serviceType: "Soil Testing", notes: "Soil health test for the 5-acre expansion zone before planting.", status: "Pending" },
  { id: "EB-103", farmerId: "KF-1052", date: "2026-07-15", serviceType: "Dairy Breeding", notes: "Artificial Insemination service request for Holstein heifer.", status: "Completed" },
];

// Default announcements
export const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "AN-101",
    title: "Milk Price Payout Increased to KSh 52",
    category: "Payments",
    content: "We are pleased to inform our dairy members that the cooperative board has adjusted raw milk milk payout rates to KSh 52 per Litre. This increase is driven by our improved processing contract with Brookside Dairy.",
    date: "2026-07-15",
    important: true
  },
  {
    id: "AN-102",
    title: "Maize Bulking Center Fully Operational",
    category: "Crops",
    content: "The central grain depot is now aggressively receiving dry maize. Farmers are advised to clean their grain to avoid high tare weights. Free moisture-testing services are available on arrival. Max moisture limit remains at 13.5%.",
    date: "2026-07-12",
    important: true
  },
  {
    id: "AN-103",
    title: "Foot & Mouth Vaccination Campaign",
    category: "Dairy",
    content: "In partnership with Nuru Kenya and the Narok County Government, the cooperative will run a subsidized Foot-and-Mouth disease vaccination campaign. Extension officers will visit collection hubs from Monday. Register via the portal.",
    date: "2026-07-10",
    important: false
  },
  {
    id: "AN-104",
    title: "Subsidized Crop Inputs Available",
    category: "General",
    content: "Soil-specific fertilizers (DAP, CAN, NPK) and certified hybrid crop seeds are now fully restocked at all 3 regional stores. Members can purchase with cash or apply for an inputs-on-credit package to be repaid through milk delivery payouts.",
    date: "2026-07-06",
    important: false
  }
];

// Default general cooperative statistics
export const DEFAULT_STATS: CooperativeStats = {
  milkCollectedToday: 14250,
  grainInStorageBags: 28450,
  activeMembers: 3240,
  regionsServed: 4
};

// --- Storage Helper Functions ---

const isClient = typeof window !== 'undefined';

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading key ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting key ${key} in localStorage:`, error);
  }
}

// Getters
export function getFarmers(): Farmer[] {
  const farmers = getStorageItem<Farmer[]>('keiyian_farmers', []);
  if (farmers.length === 0) {
    setStorageItem<Farmer[]>('keiyian_farmers', DEFAULT_FARMERS);
    return DEFAULT_FARMERS;
  }
  return farmers;
}

export function getMilkDeliveries(): MilkDelivery[] {
  const deliveries = getStorageItem<MilkDelivery[]>('keiyian_milk_deliveries', []);
  if (deliveries.length === 0) {
    setStorageItem<MilkDelivery[]>('keiyian_milk_deliveries', DEFAULT_MILK_DELIVERIES);
    return DEFAULT_MILK_DELIVERIES;
  }
  return deliveries;
}

export function getGrainDeposits(): GrainDeposit[] {
  const deposits = getStorageItem<GrainDeposit[]>('keiyian_grain_deposits', []);
  if (deposits.length === 0) {
    setStorageItem<GrainDeposit[]>('keiyian_grain_deposits', DEFAULT_GRAIN_DEPOSITS);
    return DEFAULT_GRAIN_DEPOSITS;
  }
  return deposits;
}

export function getInputLoans(): InputLoan[] {
  const loans = getStorageItem<InputLoan[]>('keiyian_input_loans', []);
  if (loans.length === 0) {
    setStorageItem<InputLoan[]>('keiyian_input_loans', DEFAULT_INPUT_LOANS);
    return DEFAULT_INPUT_LOANS;
  }
  return loans;
}

export function getExtensions(): ExtensionBooking[] {
  const extensions = getStorageItem<ExtensionBooking[]>('keiyian_extensions', []);
  if (extensions.length === 0) {
    setStorageItem<ExtensionBooking[]>('keiyian_extensions', DEFAULT_EXTENSIONS);
    return DEFAULT_EXTENSIONS;
  }
  return extensions;
}

export function getAnnouncements(): Announcement[] {
  return DEFAULT_ANNOUNCEMENTS; // These are static announcements, but can be configured later
}

// Setters / Appenders
export function registerFarmer(farmer: Farmer): void {
  const farmers = getFarmers();
  farmers.push(farmer);
  setStorageItem<Farmer[]>('keiyian_farmers', farmers);
}

export function addMilkDelivery(delivery: MilkDelivery): void {
  const deliveries = getMilkDeliveries();
  deliveries.unshift(delivery); // add to top of list
  setStorageItem<MilkDelivery[]>('keiyian_milk_deliveries', deliveries);
}

export function addGrainDeposit(deposit: GrainDeposit): void {
  const deposits = getGrainDeposits();
  deposits.unshift(deposit);
  setStorageItem<GrainDeposit[]>('keiyian_grain_deposits', deposits);
}

export function addInputLoan(loan: InputLoan): void {
  const loans = getInputLoans();
  loans.unshift(loan);
  setStorageItem<InputLoan[]>('keiyian_input_loans', loans);
}

export function addExtensionBooking(booking: ExtensionBooking): void {
  const bookings = getExtensions();
  bookings.unshift(booking);
  setStorageItem<ExtensionBooking[]>('keiyian_extensions', bookings);
}

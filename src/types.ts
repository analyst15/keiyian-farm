export type SessionType = 'Morning' | 'Evening';
export type QualityGrade = 'A' | 'B' | 'C';
export type LoanStatus = 'Deducted from Payout' | 'Active' | 'Paid';
export type BookingStatus = 'Confirmed' | 'Pending' | 'Completed';
export type GrainType = 'Maize' | 'Sorghum' | 'Beans';

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  region: string;
  dairyCattleCount: number;
  maizeAcreage: number;
  joinedDate: string;
}

export interface MilkDelivery {
  id: string;
  farmerId: string;
  date: string;
  session: SessionType;
  quantityLiters: number;
  qualityGrade: QualityGrade;
  status: 'Approved' | 'Pending';
  payoutAmount: number;
}

export interface GrainDeposit {
  id: string;
  farmerId: string;
  date: string;
  grainType: GrainType;
  bags: number;
  weightKg: number;
  moistureContent: number; // e.g., 13.5 (standard safe is <13.5%)
  status: 'Stored' | 'Pending' | 'Processed';
}

export interface InputLoan {
  id: string;
  farmerId: string;
  date: string;
  inputName: string;
  quantity: number;
  unit: string;
  totalCost: number;
  repaymentStatus: LoanStatus;
}

export interface ExtensionBooking {
  id: string;
  farmerId: string;
  date: string;
  serviceType: 'Veterinary Support' | 'Soil Testing' | 'Agronomy Training' | 'Dairy Breeding';
  notes: string;
  status: BookingStatus;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'General' | 'Dairy' | 'Crops' | 'Payments';
  content: string;
  date: string;
  important: boolean;
}

export interface CooperativeStats {
  milkCollectedToday: number;
  grainInStorageBags: number;
  activeMembers: number;
  regionsServed: number;
}

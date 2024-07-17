export interface LoginRequest {
  username: string;
  password: string;
}

export interface AssignRequest {
  categoryId?: string;
  guestName?: string;
  tableId?: string;
  wendingId?: string;
  place?: number;
  guests?: any[];
}

export interface RequestResponse {
  id: number;
  code: string;
  status: string;
  fullName: string;
  civility: string;
  phoneNumber: string;
  whatsappContact: string;
  email: string;
  typeUser: string;
  regionOfBirth: string;
  court: string;
  location: string;
  residence: string;
  address: string;
  user_close_friend_number: string;
  criminalRecordNumber: number;
  user_postal_code: string;
  birthCertificateUrl: string;
  passportVisaPageUrl: string;
  passportUrl: string;
  proofStayCameroonUrl: string;
  cniFrontUrl: string;
  cniBackUrl: string;
  weddingCertificateUrl: string;
  created_on: string;
  destination_address: string;
  destination_location: string;
  user_marital_status: string;
  user_occupation: string;
  user_residency_municipality: string;
}
export interface RequestPaginate {
  results: RequestResponse[];
  count: number;
  // pageSize: number;
  // totalResults: number;
  // totalPages: number;
}

export interface RegionDepartment {
  region: string;
  departments: string[];
  court?: string[];
}

export interface PaymentData {
  date: string;
  total_request_count: number;
  total_amount: number;
  "orange-money": MoneyData;
  "mtn-momo": MoneyData;
  regions: RegionData[];
  companies: CompanyData[];
  agents: AgentData[];
  courts: CourtData[];
}

interface MoneyData {
  total_amount: number;
  percentage: number;
}

interface RegionData {
  name: string | null;
  total_amount: number;
  total_request_count: number;
}

interface CompanyData {
  name: string;
  total_amount: number;
}

interface AgentData {
  name: string;
  total_amount: number;
  total_request_count: number;
}

interface CourtData {
  name: string;
  total_amount: number;
  total_request_count: number;
}

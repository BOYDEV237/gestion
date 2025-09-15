export interface User {
  id: string;
  name: string;
  email: string;
  departments: Department[];
  divisions: Division[];
  currentDepartment?: Department;
  currentDivision?: Division;
  currentOffice?: string;
}

export interface Department {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  color: string;
  icon: string;
  description: string;
  descriptionEn: string;
  services: string[];
  image: string;
}

export interface Bureau {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  color: string;
  icon: string;
}

export interface Division {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  description: string;
  descriptionEn: string;
  image: string;
  color: string;
  offices: Office[];
}

export interface Office {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  description: string;
  location: string;
  descriptionEn: string;
  image: string;
  color: string;
  divisionId: string;
}

export interface DocumentFlow {
  id: string;
  clientName: string;
  requestType: string;
  currentBureau: string;
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  createdAt: Date;
  updatedAt: Date;
  progress: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type Language = 'en' | 'fr';

export interface CompanyInfo {
  name: string;
  location: string;
  openingHours: string;
  phone: string;
  email: string;
}
export interface InstitutionCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Institution {
  id: string;
  categoryId: string;
  name: string;
  acronym?: string;
  isActive: boolean;
  
  // Organization Structure & Financial Governance
  parentId?: string;
  headOfInstitution?: string;
  budgetEnabled: boolean;
  allotmentEnabled: boolean;
}

// System-wide default parameters for configuring the institutional umbrella
export interface AppInstitutionalConfig {
  coreAgencyName: string;
  coreAgencyAcronym: string;
  categories: InstitutionCategory[];
}

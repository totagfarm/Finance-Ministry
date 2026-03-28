import { AppInstitutionalConfig, Institution, InstitutionCategory } from "../types/institution.types";

export const INSTITUTION_CATEGORIES: InstitutionCategory[] = [
  { id: 'core_agency_dept', name: 'MFDP internal departments and units' },
  { id: 'ministries', name: 'Ministries' },
  { id: 'agencies', name: 'Agencies' },
  { id: 'commissions', name: 'Commissions' },
  { id: 'state_owned_enterprises', name: 'State-Owned Enterprises' },
  { id: 'autonomous_institutions', name: 'Autonomous public institutions' },
  { id: 'project_implementation_units', name: 'Project Implementation Units' },
  { id: 'county_entities', name: 'County-level implementing entities' },
  { id: 'partner_programs', name: 'Development partner-funded programs' },
  { id: 'special_accounts', name: 'Special accounts and public funds' },
  { id: 'restricted_external', name: 'Restricted external participants (donors, auditors, public)' },
];

export const MOCK_INSTITUTIONS: Institution[] = [
  // Core Agency Departments
  { id: 'DEP-01', categoryId: 'core_agency_dept', name: 'Department of Budget & Development Planning', acronym: 'DBDP', isActive: true, budgetEnabled: false, allotmentEnabled: true, headOfInstitution: 'Deputy Minister for Budget' },
  { id: 'DEP-02', categoryId: 'core_agency_dept', name: 'Department of Economic Management', acronym: 'DEM', isActive: true, budgetEnabled: false, allotmentEnabled: true, headOfInstitution: 'Deputy Minister for Economic Management' },
  { id: 'DEP-03', categoryId: 'core_agency_dept', name: 'Department of Administration', acronym: 'DOA', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Deputy Minister for Administration' },
  { id: 'DEP-04', categoryId: 'core_agency_dept', name: 'Office of the Comptroller & Accountant General', acronym: 'CAG', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Comptroller General' },

  // Ministries
  { id: 'MIN-01', categoryId: 'ministries', name: 'Ministry of Health', acronym: 'MOH', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Minister of Health' },
  { id: 'MIN-02', categoryId: 'ministries', name: 'Ministry of Education', acronym: 'MOE', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Minister of Education' },
  { id: 'MIN-03', categoryId: 'ministries', name: 'Ministry of Public Works', acronym: 'MPW', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Minister of Public Works' },
  { id: 'MIN-04', categoryId: 'ministries', name: 'Ministry of Agriculture', acronym: 'MOA', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Minister of Agriculture' },

  // Sub-units / Linked Agencies (Parent-Child Demo)
  { id: 'AGE-01', categoryId: 'agencies', name: 'National Public Health Institute of Liberia', acronym: 'NPHIL', parentId: 'MIN-01', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Director General' },
  { id: 'AGE-02', categoryId: 'agencies', name: 'Liberia Revenue Authority', acronym: 'LRA', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Commissioner General' },
  { id: 'AGE-03', categoryId: 'agencies', name: 'Environmental Protection Agency', acronym: 'EPA', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Executive Director' },
  
  // SOEs
  { id: 'SOE-01', categoryId: 'state_owned_enterprises', name: 'National Port Authority', acronym: 'NPA', isActive: true, budgetEnabled: false, allotmentEnabled: false, headOfInstitution: 'Managing Director' },
  { id: 'SOE-02', categoryId: 'state_owned_enterprises', name: 'John F. Kennedy Medical Center', acronym: 'JFKMC', parentId: 'MIN-01', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Chief Executive Officer' },
  
  // Commissions
  { id: 'COM-01', categoryId: 'commissions', name: 'National Elections Commission', acronym: 'NEC', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Chairperson' },
  { id: 'COM-02', categoryId: 'commissions', name: 'Governance Commission', acronym: 'GC', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Chairperson' },

  // External / Donor programs
  { id: 'PRJ-01', categoryId: 'project_implementation_units', name: 'Education Sector Support Project', acronym: 'ESSP-PIU', parentId: 'MIN-02', isActive: true, budgetEnabled: false, allotmentEnabled: true, headOfInstitution: 'Project Coordinator' },
  
  // County entities
  { id: 'CTY-01', categoryId: 'county_entities', name: 'Montserrado County Administration', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Superintendent' },
  { id: 'CTY-02', categoryId: 'county_entities', name: 'Nimba County Administration', isActive: true, budgetEnabled: true, allotmentEnabled: true, headOfInstitution: 'Superintendent' },

  // External
  { id: 'EXT-01', categoryId: 'restricted_external', name: 'World Bank Local Auditing Unit', acronym: 'WB-Audit', isActive: true, budgetEnabled: false, allotmentEnabled: false },
];

export const APP_CONFIG: AppInstitutionalConfig = {
  coreAgencyName: "Ministry of Finance and Development Planning",
  coreAgencyAcronym: "MFDP",
  categories: INSTITUTION_CATEGORIES
};

import { 
  LayoutDashboard, PieChart, Briefcase, ReceiptText, Building, Users2, TrendingDown, 
  TrendingUp, Globe, Compass, Users as UsersIcon, Building2, Factory, FileText, 
  BarChart3, ArrowRightLeft, Network, Settings
} from 'lucide-react';

export type NavItem = { label: string, path: string };
export type NavSection = { icon: any, label: string, items: NavItem[] };

export const ALL_SECTIONS: Record<string, NavSection> = {
  dashboard: {
    icon: LayoutDashboard,
    label: 'Dashboard',
    items: [
      { label: 'Executive Overview', path: '/app' },
      { label: 'My Work Queue', path: '/app/dashboard/work-queue' },
      { label: 'Alerts & Exceptions', path: '/app/pending?module=Alerts%20%26%20Exceptions' },
      { label: 'Calendar & Deadlines', path: '/app/finance/calendar' },
      { label: 'Briefing Packs', path: '/app/pending?module=Briefing%20Packs' }
    ]
  },
  budgetAndAllocation: {
    icon: PieChart,
    label: 'Budget & Allocation',
    items: [
      { label: 'Budget Cycle Dashboard', path: '/app/finance/budget' },
      { label: 'Budget Ceilings', path: '/app/finance/budget' },
      { label: 'Agency / Entity Submissions', path: '/app/institutions' },
      { label: 'Budget Hearings & Reviews', path: '/app/pending?module=Budget%20Hearings' },
      { label: 'Version Comparison', path: '/app/pending?module=Version%20Comparison' },
      { label: 'Appropriation Registry', path: '/app/finance/appropriations' },
      { label: 'Allocation Summaries', path: '/app/finance/appropriations' }
    ]
  },
  allotments: {
    icon: Briefcase,
    label: 'Allotments',
    items: [
      { label: 'Allotment Dashboard', path: '/app/finance/allotments/new' },
      { label: 'New Allotment Request', path: '/app/finance/allotments/new' },
      { label: 'Allotment Requests', path: '/app/pending?module=Allotment%20Requests' },
      { label: 'Validation Workspace', path: '/app/pending?module=Validation%20Workspace' },
      { label: 'Cash Feasibility Review', path: '/app/pending?module=Cash%20Feasibility' },
      { label: 'Approval Decisions', path: '/app/pending?module=Approval%20Decisions' },
      { label: 'Release Notices', path: '/app/pending?module=Release%20Notices' },
      { label: 'Entity Balance View', path: '/app/pending?module=Entity%20Balance' },
      { label: 'Utilization Monitor', path: '/app/pending?module=Utilization%20Monitor' },
      { label: 'Allotment Periods & Calendar', path: '/app/pending?module=Allotment%20Periods' },
      { label: 'Override Log', path: '/app/pending?module=Override%20Log' }
    ]
  },
  expenditureControl: {
    icon: ReceiptText,
    label: 'Expenditure Control',
    items: [
      { label: 'Execution Overview', path: '/app/finance/execution' },
      { label: 'Commitment Register', path: '/app/pending?module=Commitment%20Register' },
      { label: 'Obligations Queue', path: '/app/pending?module=Obligations%20Queue' },
      { label: 'Invoice Queue', path: '/app/pending?module=Invoice%20Queue' },
      { label: 'Spending Authority Check', path: '/app/pending?module=Spending%20Authority' },
      { label: 'Blocked Transactions', path: '/app/pending?module=Blocked%20Transactions' },
      { label: 'Donor-Funded Projects (DFP)', path: '/app/finance/donor-projects' }
    ]
  },
  treasuryAndPayments: {
    icon: Building,
    label: 'Treasury & Payments',
    items: [
      { label: 'Treasury Dashboard', path: '/app/finance/treasury' },
      { label: 'Cash Position', path: '/app/finance/treasury' },
      { label: 'Payment Vouchers', path: '/app/pending?module=Payment%20Vouchers' },
      { label: 'Batch Builder', path: '/app/pending?module=Batch%20Builder' },
      { label: 'Batch Approval', path: '/app/pending?module=Batch%20Approval' },
      { label: 'EFT Monitor', path: '/app/finance/treasury' },
      { label: 'Bank Statement Import', path: '/app/pending?module=Bank%20Statement%20Import' },
      { label: 'Reconciliation Workspace', path: '/app/pending?module=Reconciliation%20Workspace' },
      { label: 'Cash Forecast', path: '/app/pending?module=Cash%20Forecast' },
      { label: 'Arrears Monitor', path: '/app/pending?module=Arrears%20Monitor' },
      { label: 'Failed Transfers', path: '/app/pending?module=Failed%20Transfers' }
    ]
  },
  payrollInterface: {
    icon: Users2,
    label: 'Payroll Interface',
    items: [
      { label: 'Payroll Dashboard', path: '/app/finance/payroll' },
      { label: 'PAN Feed', path: '/app/pending?module=PAN%20Feed' },
      { label: 'Establishment Control', path: '/app/pending?module=Establishment%20Control' },
      { label: 'Payroll Instruction Review', path: '/app/pending?module=Payroll%20Instruction' },
      { label: 'Payroll Exceptions', path: '/app/pending?module=Payroll%20Exceptions' },
      { label: 'Payroll to Treasury Handoff', path: '/app/pending?module=Payroll%20Treasury%20Handoff' }
    ]
  },
  debtAndFiscalRisk: {
    icon: TrendingDown,
    label: 'Debt & Fiscal Risk',
    items: [
      { label: 'Debt Portfolio Dashboard', path: '/app/finance/debt' },
      { label: 'Creditor Registry', path: '/app/finance/debt' },
      { label: 'Instrument Registry', path: '/app/finance/debt' },
      { label: 'Loan Agreements', path: '/app/finance/debt' },
      { label: 'Debt Service Calendar', path: '/app/finance/debt' },
      { label: 'Guarantees', path: '/app/pending?module=Guarantees' },
      { label: 'Contingent Liabilities', path: '/app/pending?module=Contingent%20Liabilities' },
      { label: 'PPP Exposure', path: '/app/pending?module=PPP%20Exposure' },
      { label: 'Fiscal Risk Dashboard', path: '/app/macro' },
      { label: 'Meridian Migration Bridge', path: '/app/finance/debt' }
    ]
  },
  revenueIntelligence: {
    icon: TrendingUp,
    label: 'Revenue Intelligence',
    items: [
      { label: 'Revenue Dashboard', path: '/app/finance/revenue' },
      { label: 'LITAS Feed', path: '/app/finance/revenue/log' },
      { label: 'ASYCUDA Feed', path: '/app/pending?module=ASYCUDA%20Feed' },
      { label: 'Revenue Forecasting', path: '/app/finance/revenue' },
      { label: 'Variance Analysis', path: '/app/pending?module=Variance%20Analysis' },
      { label: 'Anomaly Center', path: '/app/pending?module=Anomaly%20Center' },
      { label: 'Revenue Exports', path: '/app/pending?module=Revenue%20Exports' }
    ]
  },
  aidAndDevelopment: {
    icon: Globe,
    label: 'Aid & Development',
    items: [
      { label: 'Aid Portfolio Dash', path: '/app/development/aid' },
      { label: 'Donor Registry', path: '/app/development/aid' },
      { label: 'Donor Programs', path: '/app/development/aid' },
      { label: 'Aid Activities', path: '/app/development/aid' },
      { label: 'Disbursement Tracking', path: '/app/development/aid' },
      { label: 'County Investment Map', path: '/app/development/aid' },
      { label: 'Aid Reporting', path: '/app/development/aid' },
      { label: 'Aid Analytics', path: '/app/development/aid' }
    ]
  },
  projectsAndAppraisal: {
    icon: Compass,
    label: 'Projects & Appraisal',
    items: [
      { label: 'Project Bank', path: '/app/development/projects' },
      { label: 'Project Detail', path: '/app/pending?module=Project%20Detail' },
      { label: 'Project Concept Intake', path: '/app/development/projects/new' },
      { label: 'Project Appraisal Workspace', path: '/app/pending?module=Appraisal%20Workspace' },
      { label: 'Committee Review', path: '/app/pending?module=Committee%20Review' },
      { label: 'Prioritization Dashboard', path: '/app/pending?module=Prioritization%20Dashboard' },
      { label: 'Milestones', path: '/app/pending?module=Milestones' },
      { label: 'Results & Monitoring', path: '/app/pending?module=Results%20%26%20Monitoring' },
      { label: 'Project Risks', path: '/app/pending?module=Project%20Risks' },
      { label: 'Donor-Funded Project 360', path: '/app/pending?module=Donor-Funded%20Project%20360' }
    ]
  },
  ngoAccreditation: {
    icon: UsersIcon,
    label: 'NGO Accreditation',
    items: [
      { label: 'NGO Public Entry', path: '/app/development/ngo/new' },
      { label: 'NGO Applications', path: '/app/development/ngo' },
      { label: 'Reviewer Queue', path: '/app/development/ngo' },
      { label: 'Reviewer Workspace', path: '/app/development/ngo' },
      { label: 'Accreditation Decisions', path: '/app/development/ngo' },
      { label: 'NGO Administration', path: '/app/development/ngo' },
      { label: 'NGO Analysis', path: '/app/development/ngo' },
      { label: 'Status Management', path: '/app/development/ngo' },
      { label: 'Document Type Setup', path: '/app/development/ngo' }
    ]
  },
  macOversight: {
    icon: Building2,
    label: 'MAC Oversight',
    items: [
      { label: 'MAC Registry', path: '/app/oversight/mac' },
      { label: 'MAC Profiles', path: '/app/pending?module=MAC%20Profiles' },
      { label: 'Budget Performance', path: '/app/pending?module=Budget%20Performance' },
      { label: 'Allotment History', path: '/app/pending?module=Allotment%20History' },
      { label: 'Commitments & Payments', path: '/app/pending?module=Commitments%20%26%20Payments' },
      { label: 'Projects by MAC', path: '/app/pending?module=Projects%20by%20MAC' },
      { label: 'Procurement by MAC', path: '/app/pending?module=Procurement%20by%20MAC' },
      { label: 'Assets by MAC', path: '/app/finance/assets' },
      { label: 'Exceptions', path: '/app/oversight/compliance/new' },
      { label: 'MAC Scorecards', path: '/app/oversight/evaluation/new' }
    ]
  },
  soeOversight: {
    icon: Factory,
    label: 'SOE Oversight',
    items: [
      { label: 'SOE Registry', path: '/app/oversight/soe' },
      { label: 'SOE Profiles', path: '/app/pending?module=SOE%20Profiles' },
      { label: 'Governance', path: '/app/pending?module=Governance' },
      { label: 'Financial Submissions', path: '/app/pending?module=Financial%20Submissions' },
      { label: 'Subsidy Requests', path: '/app/pending?module=Subsidy%20Requests' },
      { label: 'Dividend Tracking', path: '/app/pending?module=Dividend%20Tracking' },
      { label: 'Guarantee Exposure', path: '/app/pending?module=Guarantee%20Exposure' },
      { label: 'Liabilities & Arrears', path: '/app/pending?module=Liabilities%20%26%20Arrears' },
      { label: 'KPI Scorecards', path: '/app/oversight/evaluation/new' },
      { label: 'Risk Dashboard', path: '/app/macro' }
    ]
  },
  documentsAndAudit: {
    icon: FileText,
    label: 'Documents & Audit',
    items: [
      { label: 'Document Center', path: '/app/documents' },
      { label: 'Upload Documents', path: '/app/documents' },
      { label: 'Document Bundles', path: '/app/pending?module=Document%20Bundles' },
      { label: 'Linked Evidence', path: '/app/pending?module=Linked%20Evidence' },
      { label: 'Correspondence Register', path: '/app/pending?module=Correspondence%20Register' },
      { label: 'Incoming Correspondence', path: '/app/pending?module=Incoming%20Correspondence' },
      { label: 'Outgoing Correspondence', path: '/app/pending?module=Outgoing%20Correspondence' },
      { label: 'Signatures & Approvals', path: '/app/pending?module=Signatures%20%26%20Approvals' },
      { label: 'Audit Evidence Packs', path: '/app/oversight/audit' },
      { label: 'Access Logs', path: '/app/admin/security' }
    ]
  },
  reportsAndTransparency: {
    icon: BarChart3,
    label: 'Reports & Transparency',
    items: [
      { label: 'Report Builder', path: '/app/reports' },
      { label: 'Saved Reports', path: '/app/pending?module=Saved%20Reports' },
      { label: 'Scheduled Reports', path: '/app/pending?module=Scheduled%20Reports' },
      { label: 'Export Center', path: '/app/pending?module=Export%20Center' },
      { label: 'Briefing Pack Archive', path: '/app/pending?module=Briefing%20Pack%20Archive' },
      { label: 'Public Transparency Portal', path: '/app/pending?module=Public%20Transparency%20Portal' }
    ]
  },
  integrationsAndReconciliation: {
    icon: ArrowRightLeft,
    label: 'Integrations & Reconciliation',
    items: [
      { label: 'Integration Monitor', path: '/app/pending?module=Integration%20Monitor' },
      { label: 'Connector Details', path: '/app/pending?module=Connector%20Details' },
      { label: 'Sync Job History', path: '/app/pending?module=Sync%20Job%20History' },
      { label: 'Reconciliation Console', path: '/app/pending?module=Reconciliation%20Console' },
      { label: 'Mapping Registry', path: '/app/pending?module=Mapping%20Registry' },
      { label: 'Retry Queue', path: '/app/pending?module=Retry%20Queue' },
      { label: 'Error Logs', path: '/app/pending?module=Error%20Logs' },
      { label: 'Source System Health', path: '/app/pending?module=Source%20System%20Health' }
    ]
  },
  workflowAndRules: {
    icon: Network,
    label: 'Workflow & Rules',
    items: [
      { label: 'Workflow Rules', path: '/app/admin/workflow' },
      { label: 'Approval Paths', path: '/app/admin/workflow/new' },
      { label: 'Release Rules', path: '/app/pending?module=Release%20Rules' },
      { label: 'Override Rules', path: '/app/pending?module=Override%20Rules' },
      { label: 'Escalation Rules', path: '/app/pending?module=Escalation%20Rules' },
      { label: 'Workflow Monitor', path: '/app/admin/workflow' }
    ]
  },
  administration: {
    icon: Settings,
    label: 'Administration',
    items: [
      { label: 'Institutions & Structure', path: '/app/institutions/setup' },
      { label: 'Users', path: '/app/admin/security' },
      { label: 'Roles & Permissions', path: '/app/admin/security/new-role' },
      { label: 'Approval Thresholds', path: '/app/pending?module=Approval%20Thresholds' },
      { label: 'Delegations', path: '/app/pending?module=Delegations' },
      { label: 'Reference Data', path: '/app/pending?module=Reference%20Data' },
      { label: 'Fiscal Calendar Setup', path: '/app/pending?module=Fiscal%20Calendar' },
      { label: 'Chart of Accounts', path: '/app/pending?module=Chart%20of%20Accounts' },
      { label: 'Fund Sources', path: '/app/pending?module=Fund%20Sources' },
      { label: 'Notification Templates', path: '/app/pending?module=Notification%20Templates' },
      { label: 'Branding & UI Settings', path: '/app/pending?module=Branding%20%26%20UI' },
      { label: 'System Settings', path: '/app/admin/settings' }
    ]
  }
};

export const ROLE_CATEGORIES = {
  "Executive Leadership Users": [
    "Minister of Finance & Development Planning",
    "Deputy Minister for Fiscal Affairs",
    "Deputy Minister for Budget & Development Planning",
    "Deputy Minister for Administration",
    "Comptroller & Accountant General",
    "Senior Executive Advisers / Special Assistants",
    "Chief of Office / Executive Coordination Staff"
  ],
  "MFDP Internal Core Functional Users": [
    "Budget Director", "Budget Analyst", "Budget Review Officer", "Budget Hearing Coordinator", "Budget Submission Validator", "MTEF / Medium-Term Planning Officer", "Appropriation Officer",
    "Allotment Analyst", "Allotment Review Officer", "Allotment Approver", "Release Control Officer", "Balance Verification Officer", "Override Approval Authority",
    "Expenditure Control Officer", "Commitment Control Officer", "Obligation Review Officer", "Invoice Verification Officer", "Spending Authority Validation Officer", "Financial Compliance Officer",
    "Treasury Director", "Treasury Cash Analyst", "Treasury Operations Officer", "Payment Voucher Officer", "Batch Processing Officer", "EFT Monitoring Officer", "Reconciliation Officer", "Arrears Monitoring Officer", "Cash Forecasting Officer",
    "Payroll Finance Control Officer", "Payroll Review Officer", "PAN / Establishment Feed Officer", "Payroll Exception Resolution Officer", "Payroll-to-Treasury Liaison",
    "Debt Director / Head of Debt Unit", "Debt Portfolio Officer", "Debt Recording Officer", "Debt Service Officer", "Guarantee Monitoring Officer", "Contingent Liability Officer", "Fiscal Risk Analyst", "PPP Fiscal Exposure Analyst",
    "Revenue Analyst", "Revenue Forecasting Officer", "Tax Data Analyst", "Customs Data Analyst", "Revenue Variance Analyst", "Revenue Anomaly Officer",
    "Development Planning Director", "Aid Management Officer", "Donor Coordination Officer", "Public Investment Officer", "Program Monitoring Officer", "County Investment Monitoring Officer", "Development Reporting Officer",
    "Project Bank Officer", "Project Appraisal Analyst", "Economic Appraisal Officer", "Financial Appraisal Officer", "Environmental / Climate Appraisal Officer", "Social Safeguards Review Officer", "Appraisal Committee Secretary", "Project Prioritization Officer",
    "NGO Registry Officer", "NGO Reviewer", "NGO Accreditation Analyst", "NGO Approver", "NGO Administration Officer", "NGO Compliance Officer",
    "Procurement Oversight Officer", "Contract Monitoring Officer", "Supplier Performance Analyst", "Procurement Compliance Officer", "Tender Review Officer",
    "Asset Oversight Manager", "Asset Registry Officer", "Inventory Control Officer", "Maintenance Oversight Officer", "Fleet Oversight Officer", "Disposal Approval Officer",
    "MAC Oversight Analyst", "Institutional Performance Officer", "Budget Performance Monitor", "MAC Exception Review Officer", "MAC Scorecard Officer",
    "SOE Oversight Director", "SOE Reporting Officer", "SOE Financial Analysis Officer", "Subsidy Review Officer", "Dividend Monitoring Officer", "Guarantee Exposure Analyst", "SOE Risk Scoring Officer", "SOE Compliance Officer",
    "Records Officer", "Document Control Officer", "Correspondence Officer", "EDMS Administrator", "Audit Evidence Officer", "Internal Auditor", "Compliance Auditor",
    "Macro-Fiscal Director", "Macroeconomic Analyst", "Forecasting Officer", "Scenario Modeling Officer", "Fiscal Framework Officer", "Policy Analysis Officer"
  ],
  "External Government Entity Users": [
    "MAC Head / Minister / Agency Head / Commission Head", "MAC Budget Officer", "MAC Finance Director", "MAC Accountant", "MAC Allotment Request Officer", "MAC Procurement Officer", "MAC Project Coordinator", "MAC Asset Focal Person", "MAC Internal Audit Focal Person", "MAC Reporting Officer",
    "SOE CEO / Managing Director", "SOE Finance Director", "SOE Budget Officer", "SOE Subsidy Request Officer", "SOE Reporting Officer", "SOE Governance / Board Liaison Officer", "SOE Risk / Compliance Officer", "SOE Project / Investment Focal Person",
    "Project Implementation Unit Coordinator", "Project Financial Management Officer", "Project Procurement Officer", "Project Monitoring Officer", "Project Reporting Officer"
  ],
  "External Oversight / Restricted Users": [
    "General Auditing Commission Reviewer", "Internal Audit Agency Reviewer", "Civil Service Agency Payroll Liaison", "Liberia Revenue Authority Restricted Analyst", "PPCC Restricted Procurement User", "Central Bank / Banking Interface Liaison", "Debt Partner / Commonwealth Secretariat Support User", "Development Partner Restricted User", "Donor Representative", "External Evaluator", "Approved Consultant / Technical Adviser", "Legislature / Committee Restricted Viewer"
  ],
  "NGO Users": [
    "NGO Applicant", "NGO Authorized Representative", "NGO Compliance Officer", "NGO Document Uploader", "NGO Renewal Applicant", "NGO Tracking / Status User"
  ],
  "Public / Transparency Users": [
    "Public Transparency Viewer", "Public Report Downloader", "Public Project Map Viewer", "Public NGO Status Checker"
  ],
  "Platform Administration & Technical Users": [
    "Super Administrator", "Platform Administrator", "Security Administrator", "Identity & Access Administrator", "Workflow Administrator", "Integration Administrator", "Database Administrator", "DevOps Administrator", "Audit Log Administrator", "Report Administrator", "Reference Data Administrator", "Notification Administrator", "System Support Officer", "Help Desk Officer"
  ],
  "AI / Automation / Service Users": [
    "Integration Service Account", "Workflow Engine Service Account", "Reporting Service Account", "Notification Service Account", "Sync/Reconciliation Bot", "Scheduled Job Runner", "Audit Logging Service", "API Client Service User"
  ],
  "County-level users": [
    "County Development Officer", "County Project Monitoring Officer", "County Finance Liaison", "County Asset Verification Officer", "County Reporting Focal Person", "County Administration Viewer", "County-based PIU Officer"
  ]
};

// Auto extract type definitions from exactly the arrays provided
export type Role = typeof ROLE_CATEGORIES[keyof typeof ROLE_CATEGORIES][number];

// TEMPLATES define generic sidebar navigation sets that mapped dynamically
const TEMPLATES = {
  EXECUTIVE: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.budgetAndAllocation, ALL_SECTIONS.allotments, 
    ALL_SECTIONS.expenditureControl, ALL_SECTIONS.treasuryAndPayments, 
    ALL_SECTIONS.debtAndFiscalRisk, ALL_SECTIONS.revenueIntelligence, 
    ALL_SECTIONS.aidAndDevelopment, ALL_SECTIONS.projectsAndAppraisal, 
    ALL_SECTIONS.macOversight, ALL_SECTIONS.soeOversight, 
    ALL_SECTIONS.reportsAndTransparency, ALL_SECTIONS.documentsAndAudit
  ],
  BUDGET: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.budgetAndAllocation, ALL_SECTIONS.allotments,
    ALL_SECTIONS.macOversight, ALL_SECTIONS.reportsAndTransparency, ALL_SECTIONS.documentsAndAudit
  ],
  EXPENDITURE: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.allotments, ALL_SECTIONS.expenditureControl,
    ALL_SECTIONS.reportsAndTransparency, ALL_SECTIONS.documentsAndAudit
  ],
  TREASURY: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.allotments, ALL_SECTIONS.expenditureControl,
    ALL_SECTIONS.treasuryAndPayments, ALL_SECTIONS.payrollInterface, ALL_SECTIONS.reportsAndTransparency,
    ALL_SECTIONS.integrationsAndReconciliation, ALL_SECTIONS.documentsAndAudit
  ],
  PAYROLL: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.payrollInterface, ALL_SECTIONS.reportsAndTransparency
  ],
  DEBT: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.debtAndFiscalRisk, ALL_SECTIONS.projectsAndAppraisal, ALL_SECTIONS.reportsAndTransparency
  ],
  REVENUE: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.revenueIntelligence, ALL_SECTIONS.reportsAndTransparency
  ],
  AID_AND_DEVELOPMENT: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.aidAndDevelopment, ALL_SECTIONS.projectsAndAppraisal,
    ALL_SECTIONS.ngoAccreditation, ALL_SECTIONS.reportsAndTransparency, ALL_SECTIONS.documentsAndAudit
  ],
  NGO_ACCREDITATION: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.ngoAccreditation, ALL_SECTIONS.reportsAndTransparency, ALL_SECTIONS.documentsAndAudit
  ],
  OVERSIGHT: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.macOversight, ALL_SECTIONS.soeOversight,
    ALL_SECTIONS.debtAndFiscalRisk, ALL_SECTIONS.reportsAndTransparency, ALL_SECTIONS.documentsAndAudit
  ],
  DOCUMENTS_AND_AUDIT: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.documentsAndAudit, ALL_SECTIONS.reportsAndTransparency
  ],
  MACRO_FISCAL: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.budgetAndAllocation, ALL_SECTIONS.debtAndFiscalRisk, ALL_SECTIONS.revenueIntelligence, ALL_SECTIONS.reportsAndTransparency
  ],
  EXTERNAL_MAC: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.budgetAndAllocation, ALL_SECTIONS.allotments, ALL_SECTIONS.projectsAndAppraisal, ALL_SECTIONS.documentsAndAudit
  ],
  EXTERNAL_SOE: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.soeOversight, ALL_SECTIONS.documentsAndAudit
  ],
  EXTERNAL_OVERSIGHT: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.reportsAndTransparency, ALL_SECTIONS.documentsAndAudit
  ],
  PUBLIC: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.reportsAndTransparency, ALL_SECTIONS.ngoAccreditation
  ],
  ADMIN: [
    ALL_SECTIONS.dashboard, ALL_SECTIONS.integrationsAndReconciliation, ALL_SECTIONS.workflowAndRules,
    ALL_SECTIONS.administration, ALL_SECTIONS.documentsAndAudit, ALL_SECTIONS.reportsAndTransparency
  ],
  NONE: []
};

function assignTemplate(role: string): NavSection[] {
  if (role.includes('Minister') || role.includes('Comptroller') || role.includes('Executive') || role.includes('Chief') || role.includes('CEO') || role.includes('Managing Director')) {
    return TEMPLATES.EXECUTIVE;
  }
  if (role.includes('Budget') || role.includes('MTEF') || role.includes('Appropriation')) {
    return TEMPLATES.BUDGET;
  }
  if (role.includes('Allotment') || role.includes('Release Control') || role.includes('Override') || role.includes('Commitment') || role.includes('Invoice') || role.includes('Expenditure')) {
    return TEMPLATES.EXPENDITURE;
  }
  if (role.includes('Treasury') || role.includes('Batch') || role.includes('EFT') || role.includes('Cash Forecasting')) {
    return TEMPLATES.TREASURY;
  }
  if (role.includes('Payroll') || role.includes('Establishment')) {
    return TEMPLATES.PAYROLL;
  }
  if (role.includes('Debt') || role.includes('Guarantee') || role.includes('Liability')) {
    return TEMPLATES.DEBT;
  }
  if (role.includes('Revenue') || role.includes('Tax') || role.includes('Customs')) {
    return TEMPLATES.REVENUE;
  }
  if (role.includes('Development') || role.includes('Aid') || role.includes('Appraisal') || role.includes('Project Bank') || role.includes('Prioritization')) {
    return TEMPLATES.AID_AND_DEVELOPMENT;
  }
  if (role.includes('NGO') && !role.includes('Public') && !role.includes('Applicant') && !role.includes('Representative') && !role.includes('Uploader')) {
    return TEMPLATES.NGO_ACCREDITATION;
  }
  if (role.includes('Oversight') || role.includes('Procurement') || role.includes('Asset') || role.includes('Compliance')) {
    return TEMPLATES.OVERSIGHT;
  }
  if (role.includes('Document') || role.includes('Record') || role.includes('Audit')) {
    return TEMPLATES.DOCUMENTS_AND_AUDIT;
  }
  if (role.includes('Macro') || role.includes('Forecasting') || role.includes('Scenario')) {
    return TEMPLATES.MACRO_FISCAL;
  }
  if (role.includes('MAC ') || role.includes('Project Coordinator')) {
    return TEMPLATES.EXTERNAL_MAC;
  }
  if (role.includes('SOE ')) {
    return TEMPLATES.EXTERNAL_SOE;
  }
  if (role.includes('Reviewer') || role.includes('Liaison') || role.includes('Restricted') || role.includes('Evaluator') || role.includes('Support')) {
    return TEMPLATES.EXTERNAL_OVERSIGHT;
  }
  if (role.includes('Public') || role.includes('Applicant') || role.includes('Uploader') || role.includes('Representative')) {
    return TEMPLATES.PUBLIC;
  }
  if (role.includes('Service Account') || role.includes('Bot') || role.includes('Runner') || role.includes('Client')) {
    return TEMPLATES.NONE; // Headless users don't need UI
  }
  return TEMPLATES.ADMIN; // Admins and unknown fallback
}

// Generate the Map Dynamically
const generatedMap: any = {};
Object.values(ROLE_CATEGORIES).flat().forEach(role => {
  generatedMap[role] = assignTemplate(role);
});

export const ROLE_NAV_MAP: Record<Role, NavSection[]> = generatedMap;

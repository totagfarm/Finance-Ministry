/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import LandingPage from "./pages/LandingPage";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import BudgetCycleDashboard from "./pages/finance/BudgetCycleDashboard";
import CeilingConfiguration from "./pages/finance/budget/CeilingConfiguration";
import AgencySubmissionGrid from "./pages/finance/budget/AgencySubmissionGrid";
import HearingsWorkspace from "./pages/finance/budget/HearingsWorkspace";
import NewAllotmentRequest from "./pages/finance/NewAllotmentRequest";
import ValidationWorkspace from "./pages/finance/ValidationWorkspace";
import AllotmentBalanceView from "./pages/finance/AllotmentBalanceView";
import ExecutionOverview from "./pages/finance/ExecutionOverview";
import PurchaseOrderGeneration from "./pages/finance/execution/PurchaseOrderGeneration";
import VoucherProcessing from "./pages/finance/execution/VoucherProcessing";
import TreasuryDashboard from "./pages/finance/TreasuryDashboard";
import PaymentDispatchWorkspace from "./pages/finance/treasury/PaymentDispatchWorkspace";
import EFTExecutionMonitor from "./pages/finance/EFTExecutionMonitor";
import DebtPortfolioDashboard from "./pages/finance/DebtPortfolioDashboard";
import LoanRegistrationWorkspace from "./pages/finance/debt/LoanRegistrationWorkspace";
import ProcurementDashboard from "./pages/finance/ProcurementDashboard";
import NewTenderForm from "./pages/finance/procurement/NewTenderForm";
import AssetRegistry from "./pages/finance/AssetRegistry";
import AssetAcquisitionForm from "./pages/finance/assets/AssetAcquisitionForm";
import AidManagementDashboard from "./pages/development/AidManagementDashboard";
import NGOAdministrationConsole from "./pages/development/NGOAdministrationConsole";
import NGOAccreditationWizard from "./pages/development/ngo/NGOAccreditationWizard";
import ProjectBank from "./pages/development/ProjectBank";
import NewProjectInduction from "./pages/development/projects/NewProjectInduction";
import AuditTrackingDashboard from "./pages/oversight/AuditTrackingDashboard";
import AuditFindingWizard from "./pages/oversight/audit/AuditFindingWizard";
import ComplianceMonitor from "./pages/oversight/ComplianceMonitor";
import NewComplianceFlag from "./pages/oversight/compliance/NewComplianceFlag";
import MACRegistry from "./pages/oversight/MACRegistry";
import SOERegistry from "./pages/oversight/SOERegistry";
import NewInstitutionalEvaluation from "./pages/oversight/evaluation/NewInstitutionalEvaluation";
import SystemSettings from "./pages/admin/SystemSettings";
import SecurityCommandCenter from "./pages/admin/SecurityCommandCenter";
import NewRoleAssignment from "./pages/admin/NewRoleAssignment";
import NewWorkflowPipeline from "./pages/admin/workflow/NewWorkflowPipeline";
import Reports from "./pages/Reports";
import ModulePlaceholder from "./pages/ModulePlaceholder";
import InstitutionRegistry from "./pages/institutions/InstitutionRegistry";
import InstitutionProfile from "./pages/institutions/InstitutionProfile";
import InstitutionSetup from "./pages/institutions/InstitutionSetup";
import AppropriationRegistry from "./pages/finance/AppropriationRegistry";
import RevenueDashboard from "./pages/finance/RevenueDashboard";
import DailyRevenueLog from "./pages/finance/revenue/DailyRevenueLog";
import PayrollDashboard from "./pages/finance/payroll/PayrollDashboard";
import MacroDashboard from "./pages/macro/MacroDashboard";
import DocumentCenter from "./pages/documents/DocumentCenter";
import WorkflowEngine from "./pages/admin/WorkflowEngine";
import CalendarAndDeadlines from "./pages/finance/CalendarAndDeadlines";
import WorkQueue from "./pages/dashboard/WorkQueue";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="trace-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="finance/budget" element={<BudgetCycleDashboard />} />
            <Route path="finance/budget/ceilings" element={<CeilingConfiguration />} />
            <Route path="finance/budget/submission" element={<AgencySubmissionGrid />} />
            <Route path="finance/budget/hearings" element={<HearingsWorkspace />} />
            <Route path="finance/allotments/new" element={<NewAllotmentRequest />} />
            <Route path="finance/allotments/validation" element={<ValidationWorkspace />} />
            <Route path="finance/allotments/balance" element={<AllotmentBalanceView />} />
            <Route path="finance/execution" element={<ExecutionOverview />} />
            <Route path="finance/execution/po-generation" element={<PurchaseOrderGeneration />} />
            <Route path="finance/execution/vouchers" element={<VoucherProcessing />} />
            <Route path="finance/treasury" element={<TreasuryDashboard />} />
            <Route path="finance/treasury/dispatch" element={<PaymentDispatchWorkspace />} />
            <Route path="finance/treasury/eft" element={<EFTExecutionMonitor />} />
            <Route path="finance/debt" element={<DebtPortfolioDashboard />} />
            <Route path="finance/debt/registration" element={<LoanRegistrationWorkspace />} />
            <Route path="finance/procurement" element={<ProcurementDashboard />} />
            <Route path="finance/procurement/new" element={<NewTenderForm />} />
            <Route path="finance/assets" element={<AssetRegistry />} />
            <Route path="finance/assets/new" element={<AssetAcquisitionForm />} />
            <Route path="development/aid" element={<AidManagementDashboard />} />
            <Route path="development/ngo" element={<NGOAdministrationConsole />} />
            <Route path="development/ngo/new" element={<NGOAccreditationWizard />} />
            <Route path="development/projects" element={<ProjectBank />} />
            <Route path="development/projects/new" element={<NewProjectInduction />} />
            <Route path="oversight/audit" element={<AuditTrackingDashboard />} />
            <Route path="oversight/audit/new" element={<AuditFindingWizard />} />
            <Route path="oversight/compliance" element={<ComplianceMonitor />} />
            <Route path="oversight/compliance/new" element={<NewComplianceFlag />} />
            <Route path="admin/settings" element={<SystemSettings />} />
            <Route path="admin/security" element={<SecurityCommandCenter />} />
            <Route path="admin/security/new-role" element={<NewRoleAssignment />} />
            <Route path="admin/workflow" element={<WorkflowEngine />} />
            <Route path="admin/workflow/new" element={<NewWorkflowPipeline />} />
            
            <Route path="institutions" element={<InstitutionRegistry />} />
            <Route path="institutions/setup" element={<InstitutionSetup />} />
            <Route path="institutions/:id" element={<InstitutionProfile />} />
            <Route path="finance/appropriations" element={<AppropriationRegistry />} />
            <Route path="finance/revenue" element={<RevenueDashboard />} />
            <Route path="finance/revenue/log" element={<DailyRevenueLog />} />
            <Route path="finance/payroll" element={<PayrollDashboard />} />
            <Route path="oversight/mac" element={<MACRegistry />} />
            <Route path="oversight/soe" element={<SOERegistry />} />
            <Route path="oversight/evaluation/new" element={<NewInstitutionalEvaluation />} />
            <Route path="macro" element={<MacroDashboard />} />
            <Route path="documents" element={<DocumentCenter />} />
            <Route path="reports" element={<Reports />} />
            <Route path="finance/calendar" element={<CalendarAndDeadlines />} />
            <Route path="dashboard/work-queue" element={<WorkQueue />} />
            <Route path="pending" element={<ModulePlaceholder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

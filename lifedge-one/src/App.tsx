/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import LandingPage from "./pages/LandingPage";
import GlobalShell from "./pages/GlobalShell";
import DashboardOverview from "./pages/DashboardOverview";
import BudgetCycleDashboard from "./pages/finance/BudgetCycleDashboard";
import NewAllotmentRequest from "./pages/finance/NewAllotmentRequest";
import ValidationWorkspace from "./pages/finance/ValidationWorkspace";
import AllotmentBalanceView from "./pages/finance/AllotmentBalanceView";
import ExecutionOverview from "./pages/finance/ExecutionOverview";
import TreasuryDashboard from "./pages/finance/TreasuryDashboard";
import EFTExecutionMonitor from "./pages/finance/EFTExecutionMonitor";
import DebtPortfolioDashboard from "./pages/finance/DebtPortfolioDashboard";
import AidManagementDashboard from "./pages/development/AidManagementDashboard";
import NGOAdministrationConsole from "./pages/development/NGOAdministrationConsole";
import ProjectBank from "./pages/development/ProjectBank";
import AuditTrackingDashboard from "./pages/oversight/AuditTrackingDashboard";
import ComplianceMonitor from "./pages/oversight/ComplianceMonitor";
import SystemSettings from "./pages/admin/SystemSettings";
import UserManagement from "./pages/admin/UserManagement";
import Reports from "./pages/Reports";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="lifedge-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/app" element={<GlobalShell />}>
            <Route index element={<DashboardOverview />} />
            <Route path="finance/budget" element={<BudgetCycleDashboard />} />
            <Route path="finance/allotments/new" element={<NewAllotmentRequest />} />
            <Route path="finance/allotments/validation" element={<ValidationWorkspace />} />
            <Route path="finance/allotments/balance" element={<AllotmentBalanceView />} />
            <Route path="finance/execution" element={<ExecutionOverview />} />
            <Route path="finance/treasury" element={<TreasuryDashboard />} />
            <Route path="finance/treasury/eft" element={<EFTExecutionMonitor />} />
            <Route path="finance/debt" element={<DebtPortfolioDashboard />} />
            <Route path="development/aid" element={<AidManagementDashboard />} />
            <Route path="development/ngo" element={<NGOAdministrationConsole />} />
            <Route path="development/projects" element={<ProjectBank />} />
            <Route path="oversight/audit" element={<AuditTrackingDashboard />} />
            <Route path="oversight/compliance" element={<ComplianceMonitor />} />
            <Route path="admin/settings" element={<SystemSettings />} />
            <Route path="admin/users" element={<UserManagement />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

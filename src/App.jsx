import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import AssessmentsPage from './pages/student/AssessmentsPage';
import AssessmentDetailPage from './pages/student/AssessmentDetailPage';
import PracticePage from './pages/student/PracticePage';
import ResultsPage from './pages/student/ResultsPage';
import LeaderboardPage from './pages/student/LeaderboardPage';
import StudentProfilePage from './pages/student/StudentProfilePage';
import StudentSettingsPage from './pages/student/StudentSettingsPage';

// Exam Experience
import ExamPage from './pages/exam/ExamPage';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import CreateAssessmentPage from './pages/recruiter/CreateAssessmentPage';
import ManageAssessmentsPage from './pages/recruiter/ManageAssessmentsPage';
import CandidateResultsPage from './pages/recruiter/CandidateResultsPage';
import AIGeneratorPage from './pages/recruiter/AIGeneratorPage';
import LiveMonitoringPage from './pages/recruiter/LiveMonitoringPage';
import RecruiterProfilePage from './pages/recruiter/RecruiterProfilePage';
import RecruiterSettingsPage from './pages/recruiter/RecruiterSettingsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagementPage from './pages/admin/UserManagementPage';
import AdminAssessmentsPage from './pages/admin/AdminAssessmentsPage';
import QuestionBankPage from './pages/admin/QuestionBankPage';
import FlaggedEventsPage from './pages/admin/FlaggedEventsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

export default function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Root redirect */}
      <Route
        path="/"
        element={
          isAuthenticated && user ? (
            <Navigate to={`/${user.role}`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Auth Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Fullscreen Exam Route (Protected for candidates) */}
      <Route
        path="/exam/:assessmentId"
        element={
          <ProtectedRoute allowedRoles={['student', 'admin']}>
            <ExamPage />
          </ProtectedRoute>
        }
      />

      {/* Student Protected Portal */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="assessments/:id" element={<AssessmentDetailPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="results/:id" element={<ResultsPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="settings" element={<StudentSettingsPage />} />
      </Route>

      {/* Recruiter Protected Portal */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RecruiterDashboard />} />
        <Route path="create" element={<CreateAssessmentPage />} />
        <Route path="assessments" element={<ManageAssessmentsPage />} />
        <Route path="candidates" element={<CandidateResultsPage />} />
        <Route path="ai-generator" element={<AIGeneratorPage />} />
        <Route path="monitoring" element={<LiveMonitoringPage />} />
        <Route path="profile" element={<RecruiterProfilePage />} />
        <Route path="settings" element={<RecruiterSettingsPage />} />
      </Route>

      {/* Admin Protected Portal */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="assessments" element={<AdminAssessmentsPage />} />
        <Route path="questions" element={<QuestionBankPage />} />
        <Route path="monitoring" element={<LiveMonitoringPage />} />
        <Route path="flagged" element={<FlaggedEventsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

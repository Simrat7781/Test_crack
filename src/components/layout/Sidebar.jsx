import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Code2,
  Trophy,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Building2,
  Shield,
  Brain,
  Eye,
  HelpCircle,
  BookOpen,
  PlusCircle,
  ClipboardList,
  AlertTriangle,
  Database,
} from 'lucide-react';

const studentNav = [
  { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
  { label: 'Assessments', path: '/student/assessments', icon: FileText },
  { label: 'Practice', path: '/student/practice', icon: Code2 },
  { label: 'Results', path: '/student/results', icon: BarChart3 },
  { label: 'Leaderboard', path: '/student/leaderboard', icon: Trophy },
  { divider: true },
  { label: 'Profile', path: '/student/profile', icon: User },
  { label: 'Settings', path: '/student/settings', icon: Settings },
];

const recruiterNav = [
  { label: 'Dashboard', path: '/recruiter', icon: LayoutDashboard },
  { label: 'Create Assessment', path: '/recruiter/create', icon: PlusCircle },
  { label: 'Manage Assessments', path: '/recruiter/assessments', icon: ClipboardList },
  { label: 'Candidates', path: '/recruiter/candidates', icon: Users },
  { label: 'AI Generator', path: '/recruiter/ai-generator', icon: Brain },
  { label: 'Monitoring', path: '/recruiter/monitoring', icon: Eye },
  { divider: true },
  { label: 'Profile', path: '/recruiter/profile', icon: Building2 },
  { label: 'Settings', path: '/recruiter/settings', icon: Settings },
];

const adminNav = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Assessments', path: '/admin/assessments', icon: FileText },
  { label: 'Question Bank', path: '/admin/questions', icon: Database },
  { label: 'Monitoring', path: '/admin/monitoring', icon: Eye },
  { label: 'Flagged Events', path: '/admin/flagged', icon: AlertTriangle },
  { divider: true },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems =
    user?.role === 'admin'
      ? adminNav
      : user?.role === 'recruiter'
      ? recruiterNav
      : studentNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-navy-100 z-40
        flex flex-col transition-all duration-200
        ${collapsed ? 'w-[68px]' : 'w-[248px]'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-navy-100 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shrink-0">
          <Brain className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-navy-900 text-lg tracking-tight">
            Assessly<span className="text-primary-600"> AI</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5">
        {navItems.map((item, i) => {
          if (item.divider) {
            return <div key={i} className="my-3 border-t border-navy-100" />;
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/student' || item.path === '/recruiter' || item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                }
                ${collapsed ? 'justify-center' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-navy-100 p-2.5 shrink-0">
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold shrink-0">
              {user.name?.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-navy-900 truncate">{user.name}</p>
              <p className="text-xs text-navy-400 truncate capitalize">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-navy-600 hover:bg-red-50 hover:text-red-600 transition-colors
            ${collapsed ? 'justify-center' : ''}`}
          title="Sign out"
        >
          <LogOut className="w-[18px] h-[18px]" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-navy-200 shadow-sm flex items-center justify-center text-navy-400 hover:text-navy-600 hover:border-navy-300 transition-colors z-50"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </aside>
  );
}

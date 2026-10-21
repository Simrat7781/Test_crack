import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminDashboardData } from '../../data/dashboard';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  ShieldAlert,
  Users,
  Building2,
  FileText,
  Database,
  ArrowRight,
  Server,
  Activity,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { stats, platformActivity, suspiciousEvents, recentUsers } = adminDashboardData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-navy-100 shadow-xs">
        <div>
          <span className="text-xs uppercase font-bold text-red-600 tracking-wider">Super Administrator</span>
          <h1 className="text-2xl font-extrabold text-navy-900 mt-0.5">
            System Operations Control Center
          </h1>
          <p className="text-sm text-navy-500 mt-1">
            Global monitoring for Assessly AI: user permissions, proctoring security violations, and server telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/flagged">
            <Button variant="danger" icon={ShieldAlert}>
              {stats.flaggedEvents} Flagged Events
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Total Candidates</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.totalStudents}</p>
            <span className="text-xs text-navy-500">Across 32 Universities</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Active Companies</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.activeCompanies}</p>
            <span className="text-xs text-navy-500">{stats.totalAssessments} live tests</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Submissions</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.completedAttempts}</p>
            <span className="text-xs text-emerald-600 font-medium">99.98% Sandbox Uptime</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-50 text-red-600">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Integrity Flags</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.flaggedEvents}</p>
            <span className="text-xs text-red-600 font-semibold">Requires human audit</span>
          </div>
        </Card>
      </div>

      {/* Throughput Chart */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-navy-900">Platform Test Activity (Weekly)</h3>
          <p className="text-xs text-navy-400 mt-0.5">Concurrent test takers and daily finished assessments</p>
        </CardHeader>
        <CardBody>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={platformActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={2.5} fill="url(#actGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      {/* Flagged Suspicious Incidents */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-navy-900">Recent Proctoring Fraud Flags</h3>
            <p className="text-xs text-navy-400 mt-0.5">High severity events intercepted during live tests</p>
          </div>
          <Link to="/admin/flagged">
            <Button variant="ghost" size="sm" iconRight={ArrowRight}>
              Audit All Events
            </Button>
          </Link>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase text-navy-500 font-semibold border-b border-navy-100">
              <tr>
                <th className="px-5 py-3">Candidate</th>
                <th className="px-5 py-3">Assessment</th>
                <th className="px-5 py-3">Violation Details</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {suspiciousEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-navy-50/50">
                  <td className="px-5 py-3 font-semibold text-navy-900">{ev.candidate}</td>
                  <td className="px-5 py-3 text-xs text-navy-600">{ev.assessment}</td>
                  <td className="px-5 py-3 text-xs text-navy-800 font-medium">{ev.event}</td>
                  <td className="px-5 py-3">
                    <Badge variant={ev.severity === 'high' ? 'danger' : 'warning'}>
                      {ev.severity.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-xs text-navy-400 font-mono">{ev.time}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={ev.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

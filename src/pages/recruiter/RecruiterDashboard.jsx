import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { recruiterDashboardData } from '../../data/dashboard';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  Users,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  Brain,
  Eye,
  ArrowRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const { stats, scoreDistribution, assessmentPerformance, recentSubmissions, topCandidates } =
    recruiterDashboardData;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-navy-100 shadow-xs">
        <div>
          <span className="text-xs uppercase font-bold text-primary-600 tracking-wider">Hiring Workspace</span>
          <h1 className="text-2xl font-extrabold text-navy-900 mt-0.5">
            Welcome back, {user?.name || 'Arjun'} 💼
          </h1>
          <p className="text-sm text-navy-500 mt-1">
            {user?.company || 'TechCorp Solutions'} candidate recruitment and skill benchmarking overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/recruiter/ai-generator">
            <Button variant="secondary" icon={Brain}>
              AI Question Studio
            </Button>
          </Link>
          <Link to="/recruiter/create">
            <Button variant="primary" icon={PlusCircle}>
              New Assessment
            </Button>
          </Link>
        </div>
      </div>

      {/* Recruiter Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Total Candidates</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.totalCandidates}</p>
            <span className="text-xs text-navy-500">{stats.completedTests} tests finished</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Shortlisted</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.shortlisted}</p>
            <span className="text-xs text-emerald-600 font-medium">Ready for interview</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Avg Score</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.averageScore}%</p>
            <span className="text-xs text-navy-500">Passing cutoff: 70%</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Active Tests</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.activeAssessments}</p>
            <span className="text-xs text-amber-600 font-medium">2 closing this week</span>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution Histogram */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-navy-900">Score Distribution Curve</h3>
            <p className="text-xs text-navy-400 mt-0.5">Evaluated candidates grouped by percentage bracket</p>
          </CardHeader>
          <CardBody>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Assessment Performance Breakdown */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-navy-900">Assessment Cohort Metrics</h3>
            <p className="text-xs text-navy-400 mt-0.5">Average score and test taker throughput by assessment</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {assessmentPerformance.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-navy-900">{item.name}</span>
                    <span className="text-primary-600">Avg {item.avgScore}% • {item.candidates} candidates</span>
                  </div>
                  <div className="w-full bg-navy-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-primary-600 h-full rounded-full" style={{ width: `${item.avgScore}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Candidate Submissions Table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-navy-900">Recent Candidate Submissions</h3>
            <p className="text-xs text-navy-400 mt-0.5">Real-time candidate submissions and auto-calculated scores</p>
          </div>
          <Link to="/recruiter/candidates">
            <Button variant="ghost" size="sm" iconRight={ArrowRight}>
              All Candidates
            </Button>
          </Link>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase text-navy-500 font-semibold border-b border-navy-100">
              <tr>
                <th className="px-5 py-3">Candidate</th>
                <th className="px-5 py-3">Assessment</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Time Taken</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {recentSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-navy-50/50">
                  <td className="px-5 py-3 font-semibold text-navy-900">{sub.name}</td>
                  <td className="px-5 py-3 text-xs text-navy-600">{sub.assessment}</td>
                  <td className="px-5 py-3 font-bold text-navy-900">{sub.score}%</td>
                  <td className="px-5 py-3 text-xs text-navy-500">{sub.time}</td>
                  <td className="px-5 py-3 text-xs text-navy-500">{sub.date}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link to="/recruiter/candidates">
                      <Button size="xs" variant="outline">Review</Button>
                    </Link>
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

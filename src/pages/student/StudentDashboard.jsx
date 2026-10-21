import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { studentDashboardData } from '../../data/dashboard';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  Trophy,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { stats, upcomingAssessments, recentAttempts, performanceTrend, topicStrengths, recommendedPractice } =
    studentDashboardData;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-800 p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium backdrop-blur-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI Placement Preparation Ready
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Priya'}! 👋
          </h1>
          <p className="mt-2 text-primary-100 text-sm sm:text-base leading-relaxed">
            You're currently ranked in the <strong className="text-white">Top 5%</strong> of candidate tests this month.
            Continue practicing to keep your placement edge sharp.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/student/assessments">
              <Button variant="secondary" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold border-0">
                Browse Assessments
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/student/practice">
              <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                Solve Daily Challenge
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Completed Tests</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.completedAssessments}</p>
            <span className="text-xs text-emerald-600 font-medium">85% attendance rate</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Average Score</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.averageScore}%</p>
            <span className="text-xs text-emerald-600 font-medium">↑ +4.2% from last month</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Overall Rank</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">#{stats.currentRank}</p>
            <span className="text-xs text-navy-500">out of {stats.totalStudents}</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-violet-50 text-violet-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Coding Solved</p>
            <p className="text-2xl font-bold text-navy-900 mt-0.5">{stats.problemsSolved}</p>
            <span className="text-xs text-primary-600 font-medium">Top skill: Java & DSA</span>
          </div>
        </Card>
      </div>

      {/* Main Charts & Overview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-navy-900">Performance Trajectory</h3>
              <p className="text-xs text-navy-400 mt-0.5">Aggregate test score performance over past months</p>
            </div>
            <Badge variant="success">Trending Up</Badge>
          </CardHeader>
          <CardBody>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis domain={[50, 100]} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Topic Skill Radar */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-navy-900">Skill Proficiency</h3>
            <p className="text-xs text-navy-400 mt-0.5">Assessed across 6 key evaluation topics</p>
          </CardHeader>
          <CardBody className="flex flex-col items-center">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={topicStrengths}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="topic" tick={{ fill: '#475569', fontSize: 10 }} />
                  <Radar name="Proficiency" dataKey="score" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full mt-2 text-center text-xs text-navy-500">
              Strongest in <strong className="text-emerald-600">Arrays & Strings (92%)</strong>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Two Column Section: Upcoming Tests & Recent Attempts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assessments */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-600" />
              <h3 className="font-semibold text-navy-900">Upcoming Live Assessments</h3>
            </div>
            <Link to="/student/assessments" className="text-xs font-semibold text-primary-600 hover:text-primary-700">
              View All
            </Link>
          </CardHeader>
          <CardBody className="divide-y divide-navy-50">
            {upcomingAssessments.map((test) => (
              <div key={test.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-navy-900">{test.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-navy-400">
                    <span>{test.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {test.duration} mins
                    </span>
                  </div>
                </div>
                <Link to={`/student/assessments/${test.id}`}>
                  <Button size="sm" variant="outline">
                    Instructions
                  </Button>
                </Link>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Recent Attempts */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="font-semibold text-navy-900">Recent Test Results</h3>
            </div>
            <Link to="/student/results" className="text-xs font-semibold text-primary-600 hover:text-primary-700">
              Detailed Reports
            </Link>
          </CardHeader>
          <CardBody className="divide-y divide-navy-50">
            {recentAttempts.slice(0, 3).map((item) => (
              <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-navy-900">{item.title}</h4>
                  <p className="text-xs text-navy-400 mt-0.5">{item.company} • Rank #{item.rank}/{item.totalParticipants}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-navy-900">{item.score}/{item.totalMarks}</p>
                    <p className="text-xs font-medium text-emerald-600">{item.percentage}%</p>
                  </div>
                  <Link to={`/student/results/${item.id}`}>
                    <Button size="xs" variant="ghost">View</Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* AI Practice Recommendations */}
      <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-semibold text-navy-900">AI Tailored Recommendations</h3>
          </div>
          <Badge variant="purple">AI Adaptive Engine</Badge>
        </CardHeader>
        <CardBody className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedPractice.map((rec) => (
            <div key={rec.topic} className="p-4 rounded-xl bg-white border border-navy-100 shadow-2xs hover:border-primary-300 transition-colors">
              <h4 className="font-semibold text-sm text-navy-900">{rec.topic}</h4>
              <p className="text-xs text-amber-600 font-medium mt-1">{rec.reason}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-navy-400">{rec.problems} practice problems</span>
                <Link to="/student/practice">
                  <Button size="xs" variant="outline">Practice</Button>
                </Link>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

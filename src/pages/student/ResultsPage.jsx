import { useParams, Link } from 'react-router-dom';
import { resultData } from '../../data/dashboard';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Download,
  Share2,
  Award,
  BarChart2,
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

export default function ResultsPage() {
  const { id } = useParams();
  const result = resultData[id] || resultData['asmnt_006'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            to="/student"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-500 hover:text-navy-900 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Assessment Performance Report</h1>
          <p className="text-sm text-navy-500 mt-0.5">{result.assessmentTitle} • {result.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={Download}>
            Download PDF
          </Button>
          <Button variant="outline" size="sm" icon={Share2}>
            Share
          </Button>
        </div>
      </div>

      {/* Hero Score Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-primary-50 to-indigo-50 border-primary-200">
          <p className="text-xs font-semibold uppercase text-primary-700 tracking-wider">Score Achieved</p>
          <p className="text-3xl font-extrabold text-navy-900 mt-1">
            {result.scoredMarks} <span className="text-sm font-medium text-navy-400">/ {result.totalMarks}</span>
          </p>
          <p className="text-xs text-primary-600 font-semibold mt-1">{result.percentage}% marks scored</p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <p className="text-xs font-semibold uppercase text-amber-700 tracking-wider">Cohort Rank</p>
          <p className="text-3xl font-extrabold text-navy-900 mt-1">
            #{result.rank} <span className="text-sm font-medium text-navy-400">/ {result.totalParticipants}</span>
          </p>
          <p className="text-xs text-amber-700 font-semibold mt-1">Top 6% percentile</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold uppercase text-navy-400 tracking-wider">Time Invested</p>
          <p className="text-2xl font-bold text-navy-900 mt-1">{result.timeTaken}</p>
          <p className="text-xs text-navy-500 mt-1">Out of {result.totalTime} allocated</p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold uppercase text-navy-400 tracking-wider">Result Status</p>
          <div className="mt-1">
            <Badge variant="success" className="text-sm py-1 px-3">
              Shortlist Eligible
            </Badge>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1.5">Met cutoff threshold (≥ 70%)</p>
        </Card>
      </div>

      {/* Topic Breakdown Chart */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-navy-900">Topic-Wise Skill Proficiency (%)</h3>
          <p className="text-xs text-navy-400 mt-0.5">Granular performance mapped to core domain pillars</p>
        </CardHeader>
        <CardBody>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.topicPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="topic" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="percentage" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      {/* Section-Wise Breakdown Table */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-navy-900">Sectional Breakdown</h3>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50/70 text-xs uppercase text-navy-500 border-b border-navy-100 font-semibold">
              <tr>
                <th className="px-5 py-3">Section</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Accuracy</th>
                <th className="px-5 py-3">Correct / Total</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {result.sections.map((sec, i) => {
                const percent = Math.round((sec.scored / sec.total) * 100);
                return (
                  <tr key={i} className="hover:bg-navy-50/30">
                    <td className="px-5 py-3 font-semibold text-navy-900">{sec.name}</td>
                    <td className="px-5 py-3 text-navy-700 font-medium">{sec.scored} / {sec.total}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-navy-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${percent >= 75 ? 'bg-emerald-500' : 'bg-primary-500'}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{percent}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-navy-500">
                      {sec.correct !== null ? `${sec.correct} correct` : `${sec.testCasesPassed}/${sec.totalTestCases} test cases`}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={percent >= 75 ? 'success' : 'primary'}>
                        {percent >= 75 ? 'Strong' : 'Proficient'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Coding Verdict Details */}
      {result.codingResults && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-navy-900">Coding Challenges Test Matrix</h3>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50/70 text-xs uppercase text-navy-500 border-b border-navy-100 font-semibold">
                <tr>
                  <th className="px-5 py-3">Problem</th>
                  <th className="px-5 py-3">Test Cases</th>
                  <th className="px-5 py-3">Execution Time</th>
                  <th className="px-5 py-3">Memory</th>
                  <th className="px-5 py-3">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {result.codingResults.map((cr, idx) => (
                  <tr key={idx} className="hover:bg-navy-50/30">
                    <td className="px-5 py-3 font-semibold text-navy-900">{cr.problem}</td>
                    <td className="px-5 py-3 text-navy-700">
                      {cr.testCasesPassed} / {cr.totalTestCases} passed
                    </td>
                    <td className="px-5 py-3 text-xs font-mono text-navy-600">{cr.runtime}</td>
                    <td className="px-5 py-3 text-xs font-mono text-navy-600">{cr.memory}</td>
                    <td className="px-5 py-3">
                      <Badge variant={cr.status === 'Accepted' ? 'success' : 'warning'}>
                        {cr.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

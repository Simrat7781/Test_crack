import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { Search, Filter, Download, Check, X, Eye } from 'lucide-react';

const CANDIDATES = [
  { id: 'c1', name: 'Sneha Patel', email: 'sneha@iitb.ac.in', college: 'IIT Bombay', assessment: 'Java Backend', score: 92, testTime: '1h 05m', warnings: 0, status: 'shortlisted' },
  { id: 'c2', name: 'Rahul Kumar', email: 'rahul.k@nitt.edu', college: 'NIT Trichy', assessment: 'Full Stack Dev', score: 85, testTime: '1h 22m', warnings: 1, status: 'shortlisted' },
  { id: 'c3', name: 'Ananya Reddy', email: 'ananya@pilani.bits.ac.in', college: 'BITS Pilani', assessment: 'DSA Challenge', score: 88, testTime: '1h 45m', warnings: 0, status: 'shortlisted' },
  { id: 'c4', name: 'Amit Sharma', email: 'amit.s@nsut.ac.in', college: 'NSUT Delhi', assessment: 'Full Stack Dev', score: 67, testTime: '1h 28m', warnings: 0, status: 'review' },
  { id: 'c5', name: 'Nikhil Verma', email: 'nikhil@iiitd.ac.in', college: 'IIIT Delhi', assessment: 'React Frontend', score: 78, testTime: '42m', warnings: 2, status: 'review' },
  { id: 'c6', name: 'Kavita Desai', email: 'kavita@coep.ac.in', college: 'COEP Pune', assessment: 'DSA Challenge', score: 45, testTime: '1h 50m', warnings: 0, status: 'rejected' },
  { id: 'c7', name: 'Vikash Singh', email: 'vikash@iitd.ac.in', college: 'IIT Delhi', assessment: 'Full Stack Dev', score: 82, testTime: '1h 15m', warnings: 0, status: 'shortlisted' },
];

export default function CandidateResultsPage() {
  const { notify } = useNotification();
  const [candidates, setCandidates] = useState(CANDIDATES);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleUpdateStatus = (id, newStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    notify.success(`Candidate marked as ${newStatus}`);
  };

  const filtered = candidates.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.college.toLowerCase().includes(search.toLowerCase()) ||
      c.assessment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Candidate Submissions & Grading</h1>
          <p className="text-sm text-navy-500 mt-0.5">Review scores, test integrity flags, and advance qualified talent to interviews.</p>
        </div>
        <Button variant="secondary" icon={Download}>
          Export CSV Report
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              placeholder="Search candidate, college, test..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-navy-500">Pipeline Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs p-2 rounded-lg border border-navy-200 bg-white"
            >
              <option value="all">All Candidates</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="review">Under Review</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase text-navy-500 font-semibold border-b border-navy-100">
              <tr>
                <th className="px-5 py-3">Candidate</th>
                <th className="px-5 py-3">College</th>
                <th className="px-5 py-3">Assessment</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Integrity Flags</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Decisions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {filtered.map((cand) => (
                <tr key={cand.id} className="hover:bg-navy-50/50">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-navy-900">{cand.name}</p>
                    <p className="text-xs text-navy-400">{cand.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-navy-700">{cand.college}</td>
                  <td className="px-5 py-3.5 text-xs text-navy-600">{cand.assessment}</td>
                  <td className="px-5 py-3.5 font-bold text-navy-900">{cand.score}%</td>
                  <td className="px-5 py-3.5 text-xs text-navy-500">{cand.testTime}</td>
                  <td className="px-5 py-3.5">
                    {cand.warnings === 0 ? (
                      <span className="text-xs text-emerald-600 font-medium">Clean (0)</span>
                    ) : (
                      <span className="text-xs text-amber-600 font-semibold">
                        {cand.warnings} Warning(s)
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={cand.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="xs"
                        variant={cand.status === 'shortlisted' ? 'success' : 'outline'}
                        onClick={() => handleUpdateStatus(cand.id, 'shortlisted')}
                        title="Shortlist for interview"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="xs"
                        variant={cand.status === 'rejected' ? 'danger' : 'ghost'}
                        onClick={() => handleUpdateStatus(cand.id, 'rejected')}
                        title="Reject candidate"
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
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

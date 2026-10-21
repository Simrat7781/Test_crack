import { useState } from 'react';
import { Link } from 'react-router-dom';
import { assessments } from '../../data/assessments';
import { Card } from '../../components/ui/Card';
import { Badge, StatusBadge, DifficultyBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { PlusCircle, Search, Copy, Users, Eye, Edit3 } from 'lucide-react';

export default function ManageAssessmentsPage() {
  const { notify } = useNotification();
  const [search, setSearch] = useState('');

  const filtered = assessments.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopyLink = (id) => {
    navigator.clipboard?.writeText(`${window.location.origin}/student/assessments/${id}`);
    notify.success('Candidate invitation link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Manage Assessments</h1>
          <p className="text-sm text-navy-500 mt-0.5">View and manage company tests, candidate invites, and live testing states.</p>
        </div>
        <Link to="/recruiter/create">
          <Button variant="primary" icon={PlusCircle}>
            Create Assessment
          </Button>
        </Link>
      </div>

      <Card className="p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search assessments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase text-navy-500 font-semibold border-b border-navy-100">
              <tr>
                <th className="px-5 py-3">Assessment Title</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Difficulty</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Questions</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-navy-50/50">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-navy-900">{item.title}</p>
                    <p className="text-xs text-navy-400">{item.skills.slice(0, 3).join(', ')}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-navy-600 capitalize">{item.type}</td>
                  <td className="px-5 py-3.5">
                    <DifficultyBadge difficulty={item.difficulty} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-navy-700">{item.duration} mins</td>
                  <td className="px-5 py-3.5 text-xs text-navy-700">{item.totalQuestions} Qs</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="xs"
                        variant="ghost"
                        icon={Copy}
                        onClick={() => handleCopyLink(item.id)}
                        title="Copy candidate test link"
                      />
                      <Link to="/recruiter/monitoring">
                        <Button size="xs" variant="ghost" icon={Eye} title="Monitor Live" />
                      </Link>
                      <Link to="/recruiter/candidates">
                        <Button size="xs" variant="outline" icon={Users}>
                          Candidates
                        </Button>
                      </Link>
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

import { useState } from 'react';
import { assessments } from '../../data/assessments';
import { Card } from '../../components/ui/Card';
import { Badge, StatusBadge, DifficultyBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search } from 'lucide-react';

export default function AdminAssessmentsPage() {
  const [search, setSearch] = useState('');

  const filtered = assessments.filter(
    (a) => a.title.toLowerCase().includes(search.toLowerCase()) || a.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">System Assessments Directory</h1>
        <p className="text-sm text-navy-500 mt-0.5">Platform-wide overview of all corporate tests, question allocations, and statuses.</p>
      </div>

      <Card className="p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 text-xs uppercase text-navy-500 font-semibold border-b border-navy-100">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Difficulty</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-navy-50/50">
                <td className="px-5 py-3.5 font-semibold text-navy-900">{item.title}</td>
                <td className="px-5 py-3.5 text-xs text-navy-600">{item.company}</td>
                <td className="px-5 py-3.5">
                  <DifficultyBadge difficulty={item.difficulty} />
                </td>
                <td className="px-5 py-3.5 text-xs text-navy-500">{item.duration} mins</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

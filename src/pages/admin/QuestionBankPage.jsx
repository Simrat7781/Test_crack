import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge, DifficultyBadge } from '../../components/ui/Badge';
import { Search, Database, Code2 } from 'lucide-react';

const QUESTIONS = [
  { id: 'qb_1', title: 'Two Sum', topic: 'Array / Hash Table', type: 'Coding', difficulty: 'Easy', usageCount: 42 },
  { id: 'qb_2', title: '0/1 Knapsack Problem', topic: 'Dynamic Programming', type: 'MCQ', difficulty: 'Medium', usageCount: 28 },
  { id: 'qb_3', title: 'Red-Black Tree Balance Invariant', topic: 'Data Structures', type: 'MCQ', difficulty: 'Hard', usageCount: 19 },
  { id: 'qb_4', title: 'Longest Substring Without Repeating Characters', topic: 'Strings / Two Pointers', type: 'Coding', difficulty: 'Medium', usageCount: 35 },
  { id: 'qb_5', title: 'CAP Theorem Partition Tolerance', topic: 'System Design', type: 'MCQ', difficulty: 'Medium', usageCount: 50 },
];

export default function QuestionBankPage() {
  const [search, setSearch] = useState('');

  const filtered = QUESTIONS.filter(
    (q) => q.title.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Enterprise Question Repository</h1>
        <p className="text-sm text-navy-500 mt-0.5">Central curated question library for algorithmic tests and domain aptitude evaluations.</p>
      </div>

      <Card className="p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search questions by topic..."
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
              <th className="px-5 py-3">Question Title</th>
              <th className="px-5 py-3">Domain Topic</th>
              <th className="px-5 py-3">Format</th>
              <th className="px-5 py-3">Difficulty</th>
              <th className="px-5 py-3">Used in Tests</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {filtered.map((q) => (
              <tr key={q.id} className="hover:bg-navy-50/50">
                <td className="px-5 py-3.5 font-semibold text-navy-900">{q.title}</td>
                <td className="px-5 py-3.5 text-xs text-navy-600">{q.topic}</td>
                <td className="px-5 py-3.5">
                  <Badge variant={q.type === 'Coding' ? 'purple' : 'primary'}>{q.type}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <DifficultyBadge difficulty={q.difficulty} />
                </td>
                <td className="px-5 py-3.5 text-xs text-navy-500">{q.usageCount} times</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

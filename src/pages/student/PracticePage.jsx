import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge, DifficultyBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Code2, Search, CheckCircle2, ArrowRight, Sparkles, Filter } from 'lucide-react';

const PRACTICE_PROBLEMS = [
  { id: 'p1', title: 'Two Sum', difficulty: 'Easy', topic: 'Array & Hash Table', solved: true, acceptance: '52%' },
  { id: 'p2', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Sliding Window', solved: true, acceptance: '34%' },
  { id: 'p3', title: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', solved: true, acceptance: '76%' },
  { id: 'p4', title: 'Merge k Sorted Lists', difficulty: 'Hard', topic: 'Heap / Divide & Conquer', solved: false, acceptance: '49%' },
  { id: 'p5', title: 'Coin Change', difficulty: 'Medium', topic: 'Dynamic Programming', solved: false, acceptance: '42%' },
  { id: 'p6', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', topic: 'Trees & BFS', solved: true, acceptance: '66%' },
  { id: 'p7', title: 'LRU Cache Design', difficulty: 'Hard', topic: 'Design / Hash Table', solved: false, acceptance: '41%' },
  { id: 'p8', title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stack', solved: true, acceptance: '88%' },
];

export default function PracticePage() {
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('all');

  const filtered = PRACTICE_PROBLEMS.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.topic.toLowerCase().includes(search.toLowerCase());
    const matchDiff = diffFilter === 'all' || p.difficulty === diffFilter;
    return matchSearch && matchDiff;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Practice Arena</h1>
          <p className="text-sm text-navy-500 mt-1">Sharpen your core coding and data structures skills with curated challenges.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="purple" className="py-1 px-3">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> 5 Solved this week
          </Badge>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              placeholder="Search problem or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-navy-500">Difficulty:</span>
            <select
              value={diffFilter}
              onChange={(e) => setDiffFilter(e.target.value)}
              className="text-xs p-2 rounded-lg border border-navy-200 bg-white"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="divide-y divide-navy-100">
          {filtered.map((problem) => (
            <div key={problem.id} className="p-4 flex items-center justify-between hover:bg-navy-50/50 transition-colors">
              <div className="flex items-center gap-3">
                {problem.solved ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-navy-300 shrink-0" />
                )}
                <div>
                  <h4 className="text-sm font-semibold text-navy-900 hover:text-primary-600 cursor-pointer">
                    {problem.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-navy-400 mt-0.5">
                    <span>{problem.topic}</span>
                    <span>•</span>
                    <span>Acceptance: {problem.acceptance}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DifficultyBadge difficulty={problem.difficulty} />
                <Link to="/exam/asmnt_001">
                  <Button size="sm" variant={problem.solved ? 'secondary' : 'primary'}>
                    {problem.solved ? 'Re-solve' : 'Solve'}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

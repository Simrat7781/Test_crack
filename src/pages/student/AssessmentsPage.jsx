import { useState } from 'react';
import { Link } from 'react-router-dom';
import { assessments } from '../../data/assessments';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge, DifficultyBadge, StatusBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  Search,
  Clock,
  FileQuestion,
  ShieldCheck,
  Code2,
  Brain,
  Filter,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function AssessmentsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredAssessments = assessments.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesDiff = difficultyFilter === 'all' || item.difficulty === difficultyFilter;

    return matchesSearch && matchesType && matchesDiff;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Assessments Catalog</h1>
          <p className="text-sm text-navy-500 mt-1">
            Browse company hiring evaluations, aptitude benchmarks, and algorithmic coding assessments.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              placeholder="Search by title, company, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-navy-500">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-xs py-1.5 px-2.5 rounded-lg border border-navy-200 bg-white text-navy-700 focus:outline-none focus:border-primary-500"
              >
                <option value="all">All Types</option>
                <option value="mixed">Mixed (Aptitude + Coding)</option>
                <option value="coding">Coding Only</option>
                <option value="mcq">MCQ Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-navy-500">Difficulty:</span>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="text-xs py-1.5 px-2.5 rounded-lg border border-navy-200 bg-white text-navy-700 focus:outline-none focus:border-primary-500"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssessments.map((test) => (
          <Card key={test.id} hover className="flex flex-col justify-between overflow-hidden group">
            <div>
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                    {test.company}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <DifficultyBadge difficulty={test.difficulty} />
                    <StatusBadge status={test.status} />
                  </div>
                </div>

                <h3 className="font-bold text-base text-navy-900 mt-2.5 group-hover:text-primary-600 transition-colors">
                  {test.title}
                </h3>
                <p className="text-xs text-navy-500 mt-1 line-clamp-2 leading-relaxed">
                  {test.description}
                </p>
              </div>

              {/* Assessment Meta specs */}
              <div className="px-5 py-2.5 bg-navy-50/50 border-y border-navy-100 flex items-center justify-between text-xs text-navy-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-navy-400" />
                  <span>{test.duration} mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileQuestion className="w-3.5 h-3.5 text-navy-400" />
                  <span>{test.totalQuestions} questions</span>
                </div>
                {test.webcamRequired && (
                  <div className="flex items-center gap-1 text-primary-600">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Proctored</span>
                  </div>
                )}
              </div>

              {/* Skills Tags */}
              <div className="p-5 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {test.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-navy-100 text-navy-700"
                    >
                      {skill}
                    </span>
                  ))}
                  {test.skills.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[11px] text-navy-400">
                      +{test.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0">
              <Link to={`/student/assessments/${test.id}`} className="w-full block">
                <Button variant="primary" className="w-full justify-center">
                  Start / Details
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {filteredAssessments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-navy-200">
          <p className="text-navy-500 text-sm">No assessments matched your filter criteria.</p>
        </div>
      )}
    </div>
  );
}

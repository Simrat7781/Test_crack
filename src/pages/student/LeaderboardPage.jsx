import { useState } from 'react';
import { leaderboardData } from '../../data/dashboard';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Trophy, Medal, Search, Flame, Award } from 'lucide-react';

export default function LeaderboardPage() {
  const [search, setSearch] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('all');

  const filtered = leaderboardData.filter((user) => {
    const matchSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchCollege = collegeFilter === 'all' || user.college === collegeFilter;
    return matchSearch && matchCollege;
  });

  const colleges = ['all', ...new Set(leaderboardData.map((d) => d.college))];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Global Leaderboard</h1>
        <p className="text-sm text-navy-500 mt-1">
          Top engineering candidates ranked by aggregate evaluation scores, coding speed, and test accuracy.
        </p>
      </div>

      {/* Top 3 Podium Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {leaderboardData.slice(0, 3).map((item, idx) => {
          const medals = ['🥇', '🥈', '🥉'];
          const borders = ['border-amber-400 bg-amber-50/30', 'border-slate-300 bg-slate-50/30', 'border-orange-400 bg-orange-50/30'];
          return (
            <Card key={item.rank} className={`p-5 text-center border-2 ${borders[idx]} relative`}>
              <div className="text-3xl mb-1">{medals[idx]}</div>
              <p className="text-xs uppercase font-bold text-navy-400 tracking-wider">Rank #{item.rank}</p>
              <h3 className="text-lg font-bold text-navy-900 mt-1">{item.name}</h3>
              <p className="text-xs text-navy-500">{item.college}</p>
              <div className="mt-3 py-1.5 px-3 rounded-full bg-white border border-navy-100 inline-block">
                <span className="font-extrabold text-primary-700">{item.score}</span>
                <span className="text-xs text-navy-400 ml-1">pts</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filter controls */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              placeholder="Search candidate name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-navy-500">Institution:</span>
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="text-xs p-2 rounded-lg border border-navy-200 bg-white"
            >
              {colleges.map((col) => (
                <option key={col} value={col}>
                  {col === 'all' ? 'All Colleges' : col}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Leaderboard Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase text-navy-500 font-semibold border-b border-navy-100">
              <tr>
                <th className="px-5 py-3">Rank</th>
                <th className="px-5 py-3">Candidate</th>
                <th className="px-5 py-3">College</th>
                <th className="px-5 py-3">Assessments</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {filtered.map((cand) => (
                <tr key={cand.rank} className="hover:bg-navy-50/50">
                  <td className="px-5 py-3.5 font-bold text-navy-900">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-navy-100 text-xs">
                      #{cand.rank}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-navy-900">{cand.name}</td>
                  <td className="px-5 py-3.5 text-xs text-navy-600">{cand.college}</td>
                  <td className="px-5 py-3.5 text-xs text-navy-500">{cand.assessments} taken</td>
                  <td className="px-5 py-3.5 font-bold text-primary-600">{cand.score}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {cand.badges.map((b) => (
                        <span key={b} className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                          {b}
                        </span>
                      ))}
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

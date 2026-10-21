import { useState } from 'react';
import { adminDashboardData } from '../../data/dashboard';
import { Card } from '../../components/ui/Card';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { Search, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

const USERS = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya.sharma@student.edu', role: 'student', college: 'IIT Delhi', status: 'active', joined: '2025-08-15' },
  { id: 'u2', name: 'Arjun Mehta', email: 'recruiter@techcorp.com', role: 'recruiter', company: 'TechCorp Solutions', status: 'active', joined: '2025-06-01' },
  { id: 'u3', name: 'Vikram Singh', email: 'admin@assessly.ai', role: 'admin', status: 'active', joined: '2025-01-01' },
  { id: 'u4', name: 'Aditya Joshi', email: 'aditya@student.edu', role: 'student', college: 'BITS Pilani', status: 'active', joined: '2026-10-14' },
  { id: 'u5', name: 'Meera Shah', email: 'meera@dataworks.com', role: 'recruiter', company: 'DataWorks Inc.', status: 'pending', joined: '2026-10-11' },
];

export default function UserManagementPage() {
  const { notify } = useNotification();
  const [users, setUsers] = useState(USERS);
  const [search, setSearch] = useState('');

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
      )
    );
    notify.info('User status toggled');
  };

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">User Administration</h1>
        <p className="text-sm text-navy-500 mt-0.5">Control candidate credentials, recruiter organization approvals, and platform roles.</p>
      </div>

      <Card className="p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search users..."
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
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Affiliation</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-navy-50/50">
                <td className="px-5 py-3.5 font-semibold text-navy-900">{u.name}</td>
                <td className="px-5 py-3.5 text-xs text-navy-500">{u.email}</td>
                <td className="px-5 py-3.5">
                  <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'recruiter' ? 'purple' : 'primary'}>
                    {u.role.toUpperCase()}
                  </Badge>
                </td>
                <td className="px-5 py-3.5 text-xs text-navy-700">{u.college || u.company || 'Assessly AI'}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Button size="xs" variant="outline" onClick={() => toggleStatus(u.id)}>
                    {u.status === 'active' ? 'Suspend' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

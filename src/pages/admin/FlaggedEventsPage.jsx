import { useState } from 'react';
import { adminDashboardData } from '../../data/dashboard';
import { Card } from '../../components/ui/Card';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { ShieldAlert, Check, X, AlertTriangle } from 'lucide-react';

export default function FlaggedEventsPage() {
  const { notify } = useNotification();
  const [events, setEvents] = useState(adminDashboardData.suspiciousEvents);

  const handleAction = (id, newStatus) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
    );
    notify.info(`Security incident ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Proctoring Fraud Incidents</h1>
        <p className="text-sm text-navy-500 mt-0.5">Audit computer vision triggers, multi-screen detection, and tab change violations.</p>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-50 text-xs uppercase text-navy-500 font-semibold border-b border-navy-100">
            <tr>
              <th className="px-5 py-3">Candidate</th>
              <th className="px-5 py-3">Assessment</th>
              <th className="px-5 py-3">Violation Event</th>
              <th className="px-5 py-3">Severity</th>
              <th className="px-5 py-3">Timestamp</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Review Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {events.map((ev) => (
              <tr key={ev.id} className="hover:bg-navy-50/50">
                <td className="px-5 py-3.5 font-semibold text-navy-900">{ev.candidate}</td>
                <td className="px-5 py-3.5 text-xs text-navy-600">{ev.assessment}</td>
                <td className="px-5 py-3.5 text-xs text-navy-900 font-medium">{ev.event}</td>
                <td className="px-5 py-3.5">
                  <Badge variant={ev.severity === 'high' ? 'danger' : 'warning'}>
                    {ev.severity.toUpperCase()}
                  </Badge>
                </td>
                <td className="px-5 py-3.5 text-xs text-navy-400 font-mono">{ev.time}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={ev.status} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => handleAction(ev.id, 'dismissed')}
                    >
                      Dismiss
                    </Button>
                    <Button
                      size="xs"
                      variant="danger"
                      onClick={() => handleAction(ev.id, 'escalated')}
                    >
                      Escalate
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

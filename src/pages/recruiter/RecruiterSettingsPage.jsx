import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { Bell, Key, Save } from 'lucide-react';

export default function RecruiterSettingsPage() {
  const { notify } = useNotification();
  const [notifyOnComplete, setNotifyOnComplete] = useState(true);
  const [autoShortlist, setAutoShortlist] = useState(true);

  const handleSave = () => {
    notify.success('Recruiting preferences updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Recruiting Preferences</h1>
        <p className="text-sm text-navy-500 mt-0.5">Automated screening rules, webhook notifications, and API credentials.</p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-navy-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary-600" /> Automated Screening Triggers
          </h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-navy-900">Real-time Submission Alerts</p>
              <p className="text-xs text-navy-400">Trigger email when candidate finishes test</p>
            </div>
            <input
              type="checkbox"
              checked={notifyOnComplete}
              onChange={(e) => setNotifyOnComplete(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-navy-100">
            <div>
              <p className="text-sm font-semibold text-navy-900">Auto-Shortlist Above Cutoff</p>
              <p className="text-xs text-navy-400">Instantly tag candidates with ≥ 85% as Shortlisted</p>
            </div>
            <input
              type="checkbox"
              checked={autoShortlist}
              onChange={(e) => setAutoShortlist(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 cursor-pointer"
            />
          </label>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" icon={Save} onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
}

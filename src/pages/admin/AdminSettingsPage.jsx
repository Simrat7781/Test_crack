import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { Server, ShieldCheck, Database, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const { notify } = useNotification();
  const [dockerLimit, setDockerLimit] = useState(50);
  const [maxTabWarnings, setMaxTabWarnings] = useState(3);

  const handleSave = () => {
    notify.success('System configuration saved!');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">System Infrastructure & Policies</h1>
        <p className="text-sm text-navy-500 mt-0.5">Configure backend sandbox limits, LLM token quotas, and automated fraud thresholds.</p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-navy-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-primary-600" /> Docker Code Execution Sandbox
          </h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Max Concurrent Isolated Containers
            </label>
            <input
              type="number"
              value={dockerLimit}
              onChange={(e) => setDockerLimit(Number(e.target.value))}
              className="w-full sm:w-60 text-sm p-2 rounded-lg border border-navy-200"
            />
            <p className="text-xs text-navy-400 mt-1">Controls resource throttling for student code runs</p>
          </div>
          <div className="pt-3 border-t border-navy-100">
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Max Allowed Tab Switches Before Auto-Submit
            </label>
            <input
              type="number"
              value={maxTabWarnings}
              onChange={(e) => setMaxTabWarnings(Number(e.target.value))}
              className="w-full sm:w-60 text-sm p-2 rounded-lg border border-navy-200"
            />
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" icon={Save} onClick={handleSave}>
          Update Infrastructure Settings
        </Button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { Bell, Shield, Lock, Moon, Sun, Save } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function StudentSettingsPage() {
  const { notify } = useNotification();
  const { theme, toggleTheme } = useTheme();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const handleSave = () => {
    notify.success('Preferences saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Account & Security Settings</h1>
        <p className="text-sm text-navy-500 mt-0.5">Configure notification alerts, exam security preferences, and display options.</p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-navy-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary-600" /> Notifications & Alerts
          </h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-navy-900">Email Assessment Deadlines</p>
              <p className="text-xs text-navy-400">Receive reminder emails 24 hours before tests begin</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-navy-100">
            <div>
              <p className="text-sm font-semibold text-navy-900">AI Adaptive Suggestions</p>
              <p className="text-xs text-navy-400">Receive personalized problem sets based on weak topics</p>
            </div>
            <input
              type="checkbox"
              checked={aiSuggestions}
              onChange={(e) => setAiSuggestions(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 cursor-pointer"
            />
          </label>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-navy-900 flex items-center gap-2">
            <Moon className="w-4 h-4 text-primary-600" /> Interface Theme
          </h3>
        </CardHeader>
        <CardBody className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-navy-900">Theme Mode</p>
            <p className="text-xs text-navy-400">Currently using {theme} mode</p>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" icon={Save} onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}

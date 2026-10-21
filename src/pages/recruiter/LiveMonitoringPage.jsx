import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';
import { Eye, Video, AlertTriangle, ShieldAlert, CheckCircle, RefreshCw } from 'lucide-react';

const LIVE_CANDIDATES = [
  { id: 'm1', name: 'Rohit Agarwal', test: 'Full Stack Dev', timeLeft: '42m', tabSwitches: 3, faceStatus: 'Warning (Multiple Faces)', suspicious: true },
  { id: 'm2', name: 'Deepa Nair', test: 'Java Backend', timeLeft: '28m', tabSwitches: 1, faceStatus: 'Normal (1 face)', suspicious: false },
  { id: 'm3', name: 'Karthik Iyer', test: 'Full Stack Dev', timeLeft: '55m', tabSwitches: 0, faceStatus: 'Normal (1 face)', suspicious: false },
  { id: 'm4', name: 'Anjali Verma', test: 'DSA Challenge', timeLeft: '18m', tabSwitches: 4, faceStatus: 'Face Not Detected', suspicious: true },
  { id: 'm5', name: 'Suresh Kumar', test: 'DSA Challenge', timeLeft: '35m', tabSwitches: 0, faceStatus: 'Normal (1 face)', suspicious: false },
  { id: 'm6', name: 'Pooja Hegde', test: 'SQL Design', timeLeft: '50m', tabSwitches: 0, faceStatus: 'Normal (1 face)', suspicious: false },
];

export default function LiveMonitoringPage() {
  const { notify } = useNotification();
  const [candidates, setCandidates] = useState(LIVE_CANDIDATES);

  const handleIssueWarning = (name) => {
    notify.warning(`Issued instant screen warning to ${name}`);
  };

  const handleTerminateTest = (id, name) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    notify.error(`Terminated exam session for ${name} due to proctoring violation`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Proctoring Stream Active
          </div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Active Exam Room Monitoring</h1>
          <p className="text-sm text-navy-500 mt-0.5">Real-time candidate telemetry, computer vision face tracking, and integrity telemetry.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="danger">{candidates.filter((c) => c.suspicious).length} Flagged Sessions</Badge>
        </div>
      </div>

      {/* Grid of Live Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {candidates.map((cand) => (
          <Card key={cand.id} className={`overflow-hidden ${cand.suspicious ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
            {/* Simulated Live Webcam Box */}
            <div className="h-44 bg-slate-950 relative flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-16 h-16 rounded-full border-2 ${
                    cand.suspicious ? 'border-red-500 animate-pulse' : 'border-emerald-500'
                  } flex items-center justify-center bg-slate-900`}
                >
                  <Video className={`w-6 h-6 ${cand.suspicious ? 'text-red-400' : 'text-emerald-400'}`} />
                </div>
                <span className="text-[11px] font-mono text-slate-300">{cand.faceStatus}</span>
              </div>

              {/* Feed Overlays */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-slate-200">
                {cand.timeLeft} left
              </div>
            </div>

            {/* Candidate Details */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-navy-900">{cand.name}</h4>
                  <p className="text-xs text-navy-400">{cand.test}</p>
                </div>
                {cand.tabSwitches > 0 ? (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    {cand.tabSwitches} Tab Switch(es)
                  </span>
                ) : (
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    Clean Session
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-navy-100">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => handleIssueWarning(cand.name)}
                  className="flex-1 text-amber-700 hover:bg-amber-50 border-amber-200"
                >
                  Issue Warning
                </Button>
                <Button
                  size="xs"
                  variant="danger"
                  onClick={() => handleTerminateTest(cand.id, cand.name)}
                  className="flex-1"
                >
                  Terminate
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { assessments } from '../../data/assessments';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge, DifficultyBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  Clock,
  FileQuestion,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Maximize2,
  Wifi,
  ArrowLeft,
  Play,
} from 'lucide-react';

export default function AssessmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find matching assessment or default to first
  const assessment = assessments.find((a) => a.id === id) || assessments[0];

  const [checks, setChecks] = useState({
    webcam: true,
    browser: true,
    network: true,
    terms: false,
  });

  const allChecksPassed = checks.webcam && checks.browser && checks.network && checks.terms;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <Link
        to="/student/assessments"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Assessments
      </Link>

      {/* Main Overview Card */}
      <Card className="overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-navy-900 to-indigo-950 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-white/10 text-primary-200">
              {assessment.company}
            </span>
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={assessment.difficulty} />
              <Badge variant="purple">AI Proctoring Enabled</Badge>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">{assessment.title}</h1>
          <p className="text-sm text-navy-200 mt-2 max-w-2xl leading-relaxed">{assessment.description}</p>

          <div className="mt-6 flex flex-wrap gap-6 text-xs text-navy-200">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary-400" />
              <span>Duration: <strong className="text-white">{assessment.duration} minutes</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileQuestion className="w-4 h-4 text-primary-400" />
              <span>Questions: <strong className="text-white">{assessment.totalQuestions} items</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Webcam & Tab Lock Active</span>
            </div>
          </div>
        </div>

        {/* Sections Breakdown */}
        <div className="p-6">
          <h3 className="font-semibold text-base text-navy-900 mb-4">Assessment Structure</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {assessment.sections.map((sec, idx) => (
              <div key={idx} className="p-3.5 rounded-lg border border-navy-100 bg-surface-secondary flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-navy-900">{sec.name}</p>
                  <p className="text-[11px] text-navy-500 mt-0.5">{sec.questions} Questions</p>
                </div>
                <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded">
                  {sec.marks} Marks
                </span>
              </div>
            ))}
          </div>

          {/* Exam Instructions */}
          <div className="mt-6">
            <h3 className="font-semibold text-base text-navy-900 mb-2">Instructions & Guidelines</h3>
            <ul className="space-y-1.5 list-disc list-inside text-xs text-navy-600 leading-relaxed">
              {assessment.instructions.map((inst, idx) => (
                <li key={idx}>{inst}</li>
              ))}
            </ul>
          </div>

          {/* Pre-Exam Hardware & Integrity Verification */}
          <div className="mt-6 p-4 rounded-xl border border-indigo-100 bg-indigo-50/30">
            <h4 className="text-sm font-semibold text-navy-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              System & Environment Pre-Flight Check
            </h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs p-2.5 rounded bg-white border border-navy-100">
                <Camera className="w-4 h-4 text-emerald-600" />
                <span className="text-navy-700">Webcam Verified</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />
              </div>
              <div className="flex items-center gap-2 text-xs p-2.5 rounded bg-white border border-navy-100">
                <Maximize2 className="w-4 h-4 text-emerald-600" />
                <span className="text-navy-700">Fullscreen Supported</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />
              </div>
              <div className="flex items-center gap-2 text-xs p-2.5 rounded bg-white border border-navy-100">
                <Wifi className="w-4 h-4 text-emerald-600" />
                <span className="text-navy-700">Stable Connection</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />
              </div>
            </div>

            <label className="flex items-center gap-2.5 mt-4 cursor-pointer text-xs text-navy-700">
              <input
                type="checkbox"
                checked={checks.terms}
                onChange={(e) => setChecks({ ...checks, terms: e.target.checked })}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 cursor-pointer"
              />
              <span>
                I agree to adhere to the code of conduct, proctoring rules, and honor pledge for this assessment.
              </span>
            </label>
          </div>

          {/* Launch Action */}
          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-navy-100">
            <Link to="/student/assessments">
              <Button variant="ghost">Cancel</Button>
            </Link>
            <Button
              variant="primary"
              size="lg"
              disabled={!allChecksPassed}
              onClick={() => navigate(`/exam/${assessment.id}`)}
              className="gap-2 shadow-md"
            >
              <Play className="w-4 h-4 fill-white" />
              Start Assessment Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

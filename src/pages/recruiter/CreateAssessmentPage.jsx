import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useNotification } from '../../context/NotificationContext';
import { Plus, Trash2, ShieldCheck, Check, Clock, Brain } from 'lucide-react';

export default function CreateAssessmentPage() {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [form, setForm] = useState({
    title: '',
    role: '',
    duration: 90,
    type: 'mixed',
    difficulty: 'Medium',
    cutoff: 70,
    webcamRequired: true,
    fullscreenRequired: true,
    negativeMarking: true,
    sections: [
      { name: 'Aptitude & Reasoning', questions: 10, marks: 10 },
      { name: 'DSA & Core CS MCQs', questions: 15, marks: 30 },
      { name: 'Coding Problems', questions: 2, marks: 40 },
    ],
  });

  const handleAddSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { name: 'New Section', questions: 5, marks: 10 }],
    }));
  };

  const handleRemoveSection = (idx) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      notify.error('Assessment title is required');
      return;
    }
    notify.success('Assessment created successfully!');
    navigate('/recruiter/assessments');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Create Hiring Assessment</h1>
        <p className="text-sm text-navy-500 mt-0.5">
          Design custom multi-section evaluations with AI proctoring and automated code grading.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-base text-navy-900 border-b border-navy-100 pb-3">
            General Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Assessment Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. SDE-1 Campus Hiring 2026"
              required
            />
            <Input
              label="Target Role / Designation"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. Backend Developer"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Duration (mins)</label>
              <input
                type="number"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                className="w-full text-sm p-2.5 rounded-lg border border-navy-200"
                min={15}
                max={240}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full text-sm p-2.5 rounded-lg border border-navy-200 bg-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Cutoff (%)</label>
              <input
                type="number"
                value={form.cutoff}
                onChange={(e) => setForm({ ...form, cutoff: Number(e.target.value) })}
                className="w-full text-sm p-2.5 rounded-lg border border-navy-200"
                min={1}
                max={100}
              />
            </div>
          </div>
        </Card>

        {/* Sections Builder */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-navy-100 pb-3">
            <h3 className="font-semibold text-base text-navy-900">Assessment Sections</h3>
            <Button type="button" size="xs" variant="outline" icon={Plus} onClick={handleAddSection}>
              Add Section
            </Button>
          </div>

          <div className="space-y-3">
            {form.sections.map((sec, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-navy-50/50 border border-navy-100">
                <input
                  type="text"
                  value={sec.name}
                  onChange={(e) => {
                    const next = [...form.sections];
                    next[idx].name = e.target.value;
                    setForm({ ...form, sections: next });
                  }}
                  className="flex-1 text-sm p-2 rounded border border-navy-200 bg-white"
                  placeholder="Section title"
                />
                <div className="w-24">
                  <input
                    type="number"
                    value={sec.questions}
                    onChange={(e) => {
                      const next = [...form.sections];
                      next[idx].questions = Number(e.target.value);
                      setForm({ ...form, sections: next });
                    }}
                    className="w-full text-xs p-2 rounded border border-navy-200 bg-white"
                    placeholder="Questions"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={sec.marks}
                    onChange={(e) => {
                      const next = [...form.sections];
                      next[idx].marks = Number(e.target.value);
                      setForm({ ...form, sections: next });
                    }}
                    className="w-full text-xs p-2 rounded border border-navy-200 bg-white"
                    placeholder="Marks"
                  />
                </div>
                {form.sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSection(idx)}
                    className="p-2 text-navy-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Proctoring Settings */}
        <Card className="p-6 space-y-3">
          <h3 className="font-semibold text-base text-navy-900 border-b border-navy-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-600" />
            Integrity & AI Proctoring Configuration
          </h3>
          <div className="space-y-2 text-xs text-navy-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.webcamRequired}
                onChange={(e) => setForm({ ...form, webcamRequired: e.target.checked })}
                className="w-4 h-4 rounded text-primary-600 cursor-pointer"
              />
              <span>Require Continuous Webcam & Face Detection Feed</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.fullscreenRequired}
                onChange={(e) => setForm({ ...form, fullscreenRequired: e.target.checked })}
                className="w-4 h-4 rounded text-primary-600 cursor-pointer"
              />
              <span>Enforce Strict Fullscreen & Record Tab Switches (Auto-fail on 3 warnings)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.negativeMarking}
                onChange={(e) => setForm({ ...form, negativeMarking: e.target.checked })}
                className="w-4 h-4 rounded text-primary-600 cursor-pointer"
              />
              <span>Enable Negative Marking (-0.25 on incorrect MCQs)</span>
            </label>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => navigate('/recruiter/assessments')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg">
            Save & Publish Assessment
          </Button>
        </div>
      </form>
    </div>
  );
}

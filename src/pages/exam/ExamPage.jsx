import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { examQuestions } from '../../data/questions';
import { assessments } from '../../data/assessments';
import { codeService } from '../../services/codeService';
import { useNotification } from '../../context/NotificationContext';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  Play,
  CheckCircle,
  XCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Video,
  FileCode,
  Terminal,
  RotateCcw,
  Send,
} from 'lucide-react';

const STARTER_CODES = {
  python: `class Solution:
    def solve(self, nums, target):
        # Write your algorithmic solution here
        seen = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in seen:
                return [seen[diff], i]
            seen[n] = i
        return []
`,
  java: `class Solution {
    public int[] solve(int[] nums, int target) {
        // Write your algorithmic solution here
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}
`,
  cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> solve(vector<int>& nums, int target) {
        // Write your algorithmic solution here
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};
`,
};

export default function ExamPage() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();

  // Load questions
  const questions = examQuestions[assessmentId] || examQuestions['asmnt_001'];
  const assessment = assessments.find((a) => a.id === assessmentId) || assessments[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQ = questions[currentIndex] || questions[0];

  // User responses state
  const [answers, setAnswers] = useState({}); // { [qId]: selectedOptionIndex }
  const [markedForReview, setMarkedForReview] = useState({}); // { [qId]: boolean }
  const [codeDrafts, setCodeDrafts] = useState({}); // { [qId]: { language, code } }

  // Editor states
  const [selectedLang, setSelectedLang] = useState('python');
  const [codeOutput, setCodeOutput] = useState(null);
  const [runningCode, setRunningCode] = useState(false);
  const [activeTab, setActiveTab] = useState('testcases'); // 'testcases' | 'output'

  // Exam timer
  const [timeLeft, setTimeLeft] = useState(assessment.duration * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Anti-cheat / Proctoring warnings
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Proctoring tab-switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => {
          const next = prev + 1;
          notify.warning(`Warning: Tab change detected! (${next}/3 allowed)`);
          return next;
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [notify]);

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (idx) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleClearAnswer = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const currentCode =
    codeDrafts[currentQ.id]?.[selectedLang] || STARTER_CODES[selectedLang] || '';

  const handleCodeChange = (newCode) => {
    setCodeDrafts((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...(prev[currentQ.id] || {}),
        [selectedLang]: newCode,
      },
    }));
  };

  const handleRunCode = async () => {
    setRunningCode(true);
    setActiveTab('output');
    try {
      const res = await codeService.runCode(currentCode, selectedLang, currentQ.testCases);
      setCodeOutput(res);
      notify.success('Execution completed');
    } catch (err) {
      setCodeOutput({ status: 'Runtime Error', error: err.message });
      notify.error('Execution encountered an issue');
    } finally {
      setRunningCode(false);
    }
  };

  const handleSubmitExam = () => {
    notify.success('Assessment submitted successfully!');
    navigate('/student/results/asmnt_006');
  };

  // Stats for submission dialog
  const totalCount = questions.length;
  const answeredCount = Object.keys(answers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = totalCount - answeredCount;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Bar Navigation */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-base tracking-tight">
            Assessly<span className="text-primary-400"> AI</span> Exam Engine
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium hidden sm:inline-block">
            {assessment.title}
          </span>
        </div>

        {/* Center Timer */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 font-mono font-bold text-sm">
          <Clock className="w-4 h-4 animate-pulse text-amber-400" />
          <span>{formatTimer(timeLeft)}</span>
        </div>

        {/* Right Tools & Finish Button */}
        <div className="flex items-center gap-3">
          {tabSwitchCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/60 border border-red-800/60 px-2 py-1 rounded">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Warnings: {tabSwitchCount}/3</span>
            </div>
          )}

          <Button
            size="sm"
            variant="danger"
            onClick={() => setIsSubmitModalOpen(true)}
            className="font-semibold shadow"
          >
            Finish Test
          </Button>
        </div>
      </header>

      {/* Main Examination Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left / Center Area: Problem & Input Panel */}
        <div className="flex-1 flex flex-col overflow-y-auto border-r border-slate-800">
          {/* Subheader: Section & Question Header */}
          <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary-950 text-primary-300 border border-primary-800">
                {currentQ.section}
              </span>
              <h2 className="text-sm font-semibold text-slate-200">
                Question {currentIndex + 1} of {totalCount}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Marks: <strong className="text-slate-200">+{currentQ.marks}</strong></span>
              {currentQ.negativeMarks > 0 && (
                <span className="text-red-400">(-{currentQ.negativeMarks})</span>
              )}
            </div>
          </div>

          {/* Question Content View */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {currentQ.type === 'mcq' ? (
              <div className="max-w-3xl space-y-6">
                <p className="text-base text-slate-100 font-medium whitespace-pre-line leading-relaxed">
                  {currentQ.question}
                </p>

                {/* Multiple Choice Options */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = answers[currentQ.id] === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-primary-950/70 border-primary-500 text-white shadow-sm'
                            : 'bg-slate-800/50 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-200'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected
                              ? 'bg-primary-600 text-white'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-sm font-normal">{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Coding Problem View */
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{currentQ.question}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={currentQ.difficulty === 'Easy' ? 'success' : 'warning'}>
                      {currentQ.difficulty || 'Medium'}
                    </Badge>
                    {currentQ.topics?.map((t) => (
                      <span key={t} className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                  {currentQ.description}
                </div>

                {/* Examples */}
                {currentQ.examples?.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Examples</h4>
                    {currentQ.examples.map((ex, i) => (
                      <div key={i} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                        <p><strong className="text-primary-400">Input:</strong> {ex.input}</p>
                        <p><strong className="text-emerald-400">Output:</strong> {ex.output}</p>
                        {ex.explanation && (
                          <p className="text-slate-400 font-sans mt-1">Explanation: {ex.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {currentQ.constraints?.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Constraints</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 font-mono">
                      {currentQ.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Toolbar */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleReview}
                className={`text-xs ${
                  markedForReview[currentQ.id]
                    ? 'bg-purple-950/60 text-purple-300 border border-purple-800'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 mr-1" />
                {markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
              </Button>

              {answers[currentQ.id] !== undefined && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAnswer}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear Selection
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={currentIndex === totalCount - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(totalCount - 1, prev + 1))}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Area: Coding Editor OR Question Palette Sidebar */}
        {currentQ.type === 'coding' ? (
          <div className="w-1/2 flex flex-col bg-slate-950 border-l border-slate-800">
            {/* Editor Top Bar */}
            <div className="h-11 px-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-primary-400" />
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="text-xs bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 focus:outline-none"
                >
                  <option value="python">Python 3</option>
                  <option value="java">Java 17</option>
                  <option value="cpp">C++ 20</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => handleCodeChange(STARTER_CODES[selectedLang])}
                  className="text-slate-400 hover:text-slate-200"
                  title="Reset code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="xs"
                  variant="primary"
                  loading={runningCode}
                  onClick={handleRunCode}
                  className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 border-0"
                >
                  <Play className="w-3 h-3 fill-white" />
                  Run Code
                </Button>
              </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 min-h-[300px]">
              <Editor
                height="100%"
                language={selectedLang === 'cpp' ? 'cpp' : selectedLang}
                theme="vs-dark"
                value={currentCode}
                onChange={handleCodeChange}
                options={{
                  fontSize: 13,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                  padding: { top: 10 },
                }}
              />
            </div>

            {/* Code Execution Output Console */}
            <div className="h-52 border-t border-slate-800 bg-slate-950 flex flex-col">
              <div className="h-9 px-4 border-b border-slate-800 flex items-center gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('testcases')}
                  className={`py-1.5 transition-colors ${
                    activeTab === 'testcases' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-slate-400'
                  }`}
                >
                  Test Cases
                </button>
                <button
                  onClick={() => setActiveTab('output')}
                  className={`py-1.5 transition-colors ${
                    activeTab === 'output' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-slate-400'
                  }`}
                >
                  Terminal Output
                </button>
              </div>

              <div className="flex-1 p-3.5 overflow-y-auto text-xs font-mono">
                {activeTab === 'testcases' ? (
                  <div className="space-y-2">
                    {currentQ.testCases?.map((tc, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Case {idx + 1}: </span>
                        <span className="text-slate-200">{tc.input.replace('\n', ', target = ')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {runningCode ? (
                      <div className="flex items-center gap-2 text-slate-400">
                        <div className="w-3 h-3 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
                        <span>Compiling and running against Docker sandbox...</span>
                      </div>
                    ) : codeOutput ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              codeOutput.status === 'Accepted'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-red-950 text-red-400 border border-red-800'
                            }`}
                          >
                            {codeOutput.status}
                          </span>
                          {codeOutput.runtime && (
                            <span className="text-slate-400">Runtime: {codeOutput.runtime}</span>
                          )}
                        </div>

                        {codeOutput.testCases?.map((tc) => (
                          <div
                            key={tc.id}
                            className={`p-2 rounded border text-xs ${
                              tc.passed
                                ? 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
                                : 'bg-red-950/30 border-red-900/60 text-red-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>Test Case #{tc.id}</span>
                              <span>{tc.passed ? 'PASSED' : 'FAILED'}</span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1">
                              Expected: {tc.expected} | Got: {tc.actual || 'N/A'}
                            </div>
                          </div>
                        ))}

                        {codeOutput.error && (
                          <pre className="text-red-400 whitespace-pre-wrap mt-2 p-2 rounded bg-red-950/40">
                            {codeOutput.error}
                          </pre>
                        )}
                      </div>
                    ) : (
                      <p className="text-slate-500">Run code to view compilation outputs and test metrics.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* Right Drawer: Question Navigation Palette */}
        <div className="w-72 bg-slate-950 border-l border-slate-800 p-4 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Question Palette
              </h4>
              <span className="text-xs text-slate-500">{answeredCount}/{totalCount} Done</span>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-purple-600 inline-block" />
                <span>For Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700 inline-block" />
                <span>Unvisited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-primary-500 inline-block" />
                <span>Current</span>
              </div>
            </div>

            {/* Question Pills Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-[calc(100vh-360px)] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isReview = markedForReview[q.id];
                const isCurrent = currentIndex === idx;

                let pillColor = 'bg-slate-800 text-slate-400 border border-slate-700';
                if (isAnswered) pillColor = 'bg-emerald-600 text-white border-emerald-500';
                if (isReview) pillColor = 'bg-purple-600 text-white border-purple-500';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${pillColor} ${
                      isCurrent ? 'ring-2 ring-primary-400 ring-offset-2 ring-offset-slate-950' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Proctoring Cam Simulation Box */}
          <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <Video className="w-3.5 h-3.5 animate-pulse" />
                <span>Webcam Live</span>
              </div>
              <span className="text-[10px] text-slate-500">Face: OK</span>
            </div>
            <div className="w-full h-24 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-emerald-500/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <span className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono">
                AI ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Test Confirmation Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Assessment"
        actions={
          <div className="flex items-center justify-end gap-3 w-full">
            <Button variant="ghost" onClick={() => setIsSubmitModalOpen(false)}>
              Continue Test
            </Button>
            <Button variant="danger" onClick={handleSubmitExam}>
              Yes, Submit Now
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-navy-800">
          <p className="text-sm">
            Are you sure you want to finalize and submit your assessment? You cannot change your answers after submission.
          </p>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-navy-50 text-center">
            <div>
              <p className="text-xs text-navy-400">Answered</p>
              <p className="text-xl font-bold text-emerald-600">{answeredCount}</p>
            </div>
            <div>
              <p className="text-xs text-navy-400">Marked Review</p>
              <p className="text-xl font-bold text-purple-600">{reviewCount}</p>
            </div>
            <div>
              <p className="text-xs text-navy-400">Unanswered</p>
              <p className="text-xl font-bold text-amber-600">{unansweredCount}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

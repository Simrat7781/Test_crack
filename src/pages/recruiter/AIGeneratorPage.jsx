import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useNotification } from '../../context/NotificationContext';
import {
  Brain,
  Sparkles,
  CheckCircle,
  Copy,
  PlusCircle,
  Code2,
  FileQuestion,
  Wand2,
  Settings2,
} from 'lucide-react';

export default function AIGeneratorPage() {
  const { notify } = useNotification();
  const [role, setRole] = useState('Senior Backend Engineer');
  const [techStack, setTechStack] = useState('Java, Spring Boot, PostgreSQL, Docker');
  const [topic, setTopic] = useState('Concurrency & Database Indexing');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionType, setQuestionType] = useState('both');
  const [generating, setGenerating] = useState(false);

  // Generated questions mock state
  const [generatedItems, setGeneratedItems] = useState([
    {
      id: 'ai_1',
      type: 'mcq',
      topic: 'Database Indexing & B-Trees',
      difficulty: 'Medium',
      question:
        'In PostgreSQL, why might a query with `WHERE date_col >= CURRENT_DATE - INTERVAL 7 DAY` ignore an existing B-Tree index on `date_col`?',
      options: [
        'Because B-Trees do not support interval arithmetic in PostgreSQL.',
        'If PostgreSQL planner estimates that more than ~15-20% of total table pages would be read, a sequential scan becomes more efficient.',
        'Because date comparisons must strictly use Hash indexes rather than B-Trees.',
        'Because indexes are only active if the query includes an explicit LIMIT clause.',
      ],
      correctAnswer: 1,
      explanation:
        'Cost-based query planners switch from index scans to bitmap/sequential scans when the selectivity threshold indicates a large fraction of tuples will match.',
      added: false,
    },
    {
      id: 'ai_2',
      type: 'coding',
      topic: 'Concurrency / Distributed Systems',
      difficulty: 'Hard',
      title: 'Design a Distributed Rate Limiter with Sliding Window Counter',
      description:
        'Implement a thread-safe rate limiter service that allows at most `K` requests per client per window of `M` seconds. Multiple application instances can hit the limiter concurrently. Must maintain precision without memory leaks.',
      sampleInput: 'allowRequest("client_102", timestamp = 1718000000)',
      sampleOutput: 'true',
      testCases: [
        { input: 'Requests = 5 within 1000ms window, limit = 5', expected: 'All allowed' },
        { input: 'Request #6 within 1000ms window, limit = 5', expected: 'Rejected (429 Too Many Requests)' },
      ],
      added: false,
    },
  ]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      notify.success('AI Engine generated 2 tailored assessment questions!');
    }, 1200);
  };

  const handleAddQuestion = (idx) => {
    setGeneratedItems((prev) => {
      const copy = [...prev];
      copy[idx].added = true;
      return copy;
    });
    notify.success('Question added to assessment draft!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Assessly LLM Engine
        </div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">AI Question Generator Studio</h1>
        <p className="text-sm text-navy-500 mt-1">
          Generate production-grade MCQs and algorithmic coding challenges customized for specific job roles and seniority.
        </p>
      </div>

      {/* Generator Prompt Box */}
      <Card className="p-6 border-primary-200 bg-gradient-to-br from-white to-primary-50/20">
        <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-primary-600" />
          Target Role & Evaluation Parameters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Target Role / Job Title"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. SDE-2, Full Stack React & Node, DevOps"
          />

          <Input
            label="Key Tech Stack / Languages"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="e.g. Java, Python, Go, Kubernetes"
          />

          <Input
            label="Domain / Subtopic Focus"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Dynamic Programming, System Design, SQL"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full text-sm p-2.5 rounded-lg border border-navy-200 bg-white text-navy-800"
              >
                <option value="Easy">Easy (Entry Level)</option>
                <option value="Medium">Medium (Mid Level)</option>
                <option value="Hard">Hard (Staff / Senior)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Question Format</label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full text-sm p-2.5 rounded-lg border border-navy-200 bg-white text-navy-800"
              >
                <option value="both">Both (MCQs & Coding)</option>
                <option value="coding">Coding Problems Only</option>
                <option value="mcq">MCQs Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            variant="primary"
            size="lg"
            loading={generating}
            onClick={handleGenerate}
            icon={Wand2}
            className="shadow-sm"
          >
            Generate Questions with AI
          </Button>
        </div>
      </Card>

      {/* Generated Questions List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-navy-900 flex items-center justify-between">
          <span>Generated Question Variations ({generatedItems.length})</span>
          <span className="text-xs text-navy-500 font-normal">Ready to review and commit to question bank</span>
        </h3>

        {generatedItems.map((item, idx) => (
          <Card key={item.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant={item.type === 'coding' ? 'purple' : 'primary'}>
                  {item.type === 'coding' ? 'Coding Challenge' : 'Multiple Choice MCQ'}
                </Badge>
                <Badge variant="warning">{item.difficulty}</Badge>
                <span className="text-xs text-navy-400 font-medium">{item.topic}</span>
              </div>

              <Button
                size="sm"
                variant={item.added ? 'secondary' : 'primary'}
                disabled={item.added}
                onClick={() => handleAddQuestion(idx)}
                icon={item.added ? CheckCircle : PlusCircle}
              >
                {item.added ? 'Added to Test' : 'Add to Assessment'}
              </Button>
            </div>

            {item.type === 'mcq' ? (
              <div className="mt-3 space-y-3">
                <p className="font-semibold text-sm text-navy-900">{item.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {item.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-lg border ${
                        i === item.correctAnswer
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                          : 'bg-navy-50/50 border-navy-100 text-navy-700'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg bg-indigo-50/50 text-xs text-indigo-900 border border-indigo-100">
                  <strong>AI Explanation:</strong> {item.explanation}
                </div>
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                <h4 className="font-semibold text-sm text-navy-900">{item.title}</h4>
                <p className="text-xs text-navy-600 leading-relaxed">{item.description}</p>
                <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs space-y-1">
                  <p><span className="text-primary-400">Sample Call:</span> {item.sampleInput}</p>
                  <p><span className="text-emerald-400">Expected:</span> {item.sampleOutput}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, User, Building2, Brain, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await register(form);
      notify.success('Account created successfully!');
      navigate(`/${user.role}`);
    } catch (err) {
      notify.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'student', label: 'Student', icon: User, desc: 'Take assessments & practice' },
    { id: 'recruiter', label: 'Recruiter', icon: Building2, desc: 'Create & manage assessments' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-navy-900">
              Assessly<span className="text-primary-600"> AI</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-navy-900">Create your account</h2>
          <p className="text-navy-500 mt-1">Get started with intelligent assessments</p>
        </div>

        <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selection */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-navy-700">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => updateField('role', r.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer
                      ${form.role === r.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-navy-200 hover:border-navy-300'
                      }`}
                  >
                    <r.icon className={`w-5 h-5 ${form.role === r.id ? 'text-primary-600' : 'text-navy-400'}`} />
                    <div className="text-left">
                      <p className={`text-sm font-medium ${form.role === r.id ? 'text-primary-700' : 'text-navy-700'}`}>
                        {r.label}
                      </p>
                      <p className="text-xs text-navy-400">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Full name"
              icon={User}
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              error={errors.name}
            />
            <Input
              label="Email address"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              error={errors.password}
            />
            <Input
              label="Confirm password"
              type="password"
              icon={Lock}
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
            />

            <Button type="submit" loading={loading} className="w-full" size="lg" iconRight={ArrowRight}>
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-navy-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

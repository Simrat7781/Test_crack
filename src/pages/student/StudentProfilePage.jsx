import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { User, Mail, Phone, BookOpen, MapPin, Award, CheckCircle } from 'lucide-react';

export default function StudentProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Candidate Profile</h1>
        <p className="text-sm text-navy-500 mt-0.5">Manage your personal credentials, educational background, and resume skills.</p>
      </div>

      {/* Profile Overview Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {user?.name?.charAt(0) || 'P'}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-navy-900">{user?.name || 'Priya Sharma'}</h2>
            <p className="text-xs text-navy-500 mt-0.5">{user?.college || 'IIT Delhi'} • {user?.branch || 'Computer Science'}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="success">Verified Candidate</Badge>
              <Badge variant="primary">Graduating 2027</Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-navy-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2 text-navy-700">
            <Mail className="w-4 h-4 text-navy-400" />
            <span>{user?.email || 'priya.sharma@student.edu'}</span>
          </div>
          <div className="flex items-center gap-2 text-navy-700">
            <Phone className="w-4 h-4 text-navy-400" />
            <span>{user?.phone || '+91 98765 43210'}</span>
          </div>
          <div className="flex items-center gap-2 text-navy-700">
            <MapPin className="w-4 h-4 text-navy-400" />
            <span>New Delhi, India</span>
          </div>
        </div>
      </Card>

      {/* Verified Skills & Badges */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-navy-900">Verified Technical Competencies</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['Java', 'Python', 'Data Structures & Algorithms', 'System Design', 'SQL', 'Spring Boot', 'React.js'].map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-lg bg-navy-50 text-navy-800 text-xs font-semibold border border-navy-200/60 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                {skill}
              </span>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

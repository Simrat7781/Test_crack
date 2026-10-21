import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Building2, Mail, Phone, Users, ShieldCheck } from 'lucide-react';

export default function RecruiterProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Organization Profile</h1>
        <p className="text-sm text-navy-500 mt-0.5">Recruiting partner account details and enterprise subscription tier.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-primary-700 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-navy-900">{user?.name || 'Arjun Mehta'}</h2>
            <p className="text-xs text-navy-500 mt-0.5">{user?.designation || 'Senior Technical Recruiter'} • {user?.company || 'TechCorp Solutions'}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="purple">Enterprise Plan</Badge>
              <Badge variant="success">Verified Recruiter</Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-navy-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2 text-navy-700">
            <Mail className="w-4 h-4 text-navy-400" />
            <span>{user?.email || 'recruiter@techcorp.com'}</span>
          </div>
          <div className="flex items-center gap-2 text-navy-700">
            <Phone className="w-4 h-4 text-navy-400" />
            <span>{user?.phone || '+91 99876 54321'}</span>
          </div>
          <div className="flex items-center gap-2 text-navy-700">
            <Building2 className="w-4 h-4 text-navy-400" />
            <span>{user?.industry || 'Information Technology'}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

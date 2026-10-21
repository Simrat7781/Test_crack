export function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const variants = {
    default: 'bg-navy-100 text-navy-600',
    primary: 'bg-primary-50 text-primary-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-red-50 text-red-700',
    purple: 'bg-violet-50 text-violet-700',
    blue: 'bg-blue-50 text-blue-700',
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const config = {
    available: { label: 'Available', variant: 'success' },
    upcoming: { label: 'Upcoming', variant: 'blue' },
    'in-progress': { label: 'In Progress', variant: 'warning' },
    completed: { label: 'Completed', variant: 'primary' },
    expired: { label: 'Expired', variant: 'default' },
    shortlisted: { label: 'Shortlisted', variant: 'success' },
    review: { label: 'Under Review', variant: 'warning' },
    rejected: { label: 'Rejected', variant: 'danger' },
    active: { label: 'Active', variant: 'success' },
    pending: { label: 'Pending', variant: 'warning' },
    dismissed: { label: 'Dismissed', variant: 'default' },
    escalated: { label: 'Escalated', variant: 'danger' },
  };

  const { label, variant } = config[status] || { label: status, variant: 'default' };
  return <Badge variant={variant}>{label}</Badge>;
}

export function DifficultyBadge({ difficulty }) {
  const config = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger',
  };
  return <Badge variant={config[difficulty] || 'default'}>{difficulty}</Badge>;
}

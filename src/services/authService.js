// Mock authentication service
// Replace with real Spring Boot JWT authentication when backend is ready

const DEMO_ACCOUNTS = {
  student: {
    id: 'usr_s1',
    email: 'priya.sharma@student.edu',
    name: 'Priya Sharma',
    role: 'student',
    avatar: null,
    college: 'Indian Institute of Technology, Delhi',
    branch: 'Computer Science & Engineering',
    year: '3rd Year',
    phone: '+91 98765 43210',
    skills: ['Java', 'Python', 'Data Structures', 'SQL', 'React'],
    joinedAt: '2025-08-15',
  },
  recruiter: {
    id: 'usr_r1',
    email: 'recruiter@techcorp.com',
    name: 'Arjun Mehta',
    role: 'recruiter',
    avatar: null,
    company: 'TechCorp Solutions',
    designation: 'Senior Technical Recruiter',
    phone: '+91 99876 54321',
    companySize: '500-1000',
    industry: 'Information Technology',
    joinedAt: '2025-06-01',
  },
  admin: {
    id: 'usr_a1',
    email: 'admin@assessly.ai',
    name: 'Vikram Singh',
    role: 'admin',
    avatar: null,
    designation: 'Platform Administrator',
    phone: '+91 91234 56789',
    joinedAt: '2025-01-01',
  },
};

const MOCK_PASSWORD = 'demo123';

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(email, password) {
    await delay(800);

    // Find matching demo account
    const account = Object.values(DEMO_ACCOUNTS).find(
      (acc) => acc.email === email
    );

    if (!account) {
      throw new Error('No account found with this email address.');
    }

    if (password !== MOCK_PASSWORD) {
      throw new Error('Invalid password. Use "demo123" for demo accounts.');
    }

    // Generate a mock JWT token
    const token = `mock_jwt_${account.role}_${Date.now()}`;

    return {
      user: { ...account },
      token,
    };
  },

  async register(userData) {
    await delay(1000);
    const newUser = {
      id: `usr_${Date.now()}`,
      ...userData,
      joinedAt: new Date().toISOString().split('T')[0],
    };
    return {
      user: newUser,
      token: `mock_jwt_${userData.role}_${Date.now()}`,
    };
  },

  async resetPassword(email) {
    await delay(800);
    const account = Object.values(DEMO_ACCOUNTS).find(
      (acc) => acc.email === email
    );
    if (!account) {
      throw new Error('No account found with this email address.');
    }
    return { message: 'Password reset link sent to your email.' };
  },

  async getCurrentUser(token) {
    await delay(300);
    if (!token || !token.startsWith('mock_jwt_')) return null;
    const role = token.split('_')[2];
    return DEMO_ACCOUNTS[role] || null;
  },

  getDemoAccounts() {
    return Object.entries(DEMO_ACCOUNTS).map(([key, acc]) => ({
      role: key,
      email: acc.email,
      password: MOCK_PASSWORD,
      name: acc.name,
    }));
  },
};

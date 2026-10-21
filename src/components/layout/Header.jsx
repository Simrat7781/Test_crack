import { Bell, Search, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function Header({ onMobileMenuToggle }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'Full Stack Developer Assessment starts in 3 days', time: '2h ago', unread: true },
    { id: 2, text: 'Your Java Backend results are ready', time: '1d ago', unread: true },
    { id: 3, text: 'New practice problems available in DSA', time: '2d ago', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-navy-100 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg text-navy-500 hover:bg-navy-50"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search assessments, topics..."
            className="w-72 pl-10 pr-4 py-2 text-sm rounded-lg border border-navy-200 bg-navy-50/50 text-navy-700 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-navy-500 hover:bg-navy-50 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-navy-500 hover:bg-navy-50 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500" />
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-navy-100 shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-navy-100">
                  <h4 className="text-sm font-semibold text-navy-900">Notifications</h4>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 border-b border-navy-50 hover:bg-navy-50/50 cursor-pointer transition-colors ${
                        n.unread ? 'bg-primary-50/30' : ''
                      }`}
                    >
                      <p className="text-sm text-navy-700">{n.text}</p>
                      <p className="text-xs text-navy-400 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 text-center border-t border-navy-100">
                  <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-px h-6 bg-navy-200 mx-1" />

        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-navy-900 leading-tight">{user?.name}</p>
            <p className="text-xs text-navy-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

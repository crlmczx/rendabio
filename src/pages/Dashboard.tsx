import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Settings, 
  LogOut, 
  MessageSquare, 
  BarChart3, 
  Zap,
  ChevronRight,
  Crown,
  Sparkles
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: t('dashboard.stats.conversations'), value: '128', icon: MessageSquare, color: 'from-blue-500 to-blue-700' },
    { label: t('dashboard.stats.tasks'), value: '56', icon: Zap, color: 'from-emerald-500 to-emerald-700' },
    { label: t('dashboard.stats.timeSaved'), value: '24h', icon: BarChart3, color: 'from-purple-500 to-purple-700' },
  ];

  const agents = [
    { name: 'Teamo', role: 'Commander', icon: Crown, color: 'from-primary to-primary-dark' },
    { name: 'DeepResearch', role: 'Researcher', icon: Sparkles, color: 'from-blue-500 to-blue-700' },
    { name: 'Craft', role: 'Creator', icon: MessageSquare, color: 'from-purple-500 to-purple-700' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-white font-semibold text-xl">RendaBio</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-white text-sm">{t('nav.dashboard')}</Link>
              <Link to="/agents" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.agents')}</Link>
              <Link to="/history" className="text-gray-400 hover:text-white text-sm transition-colors">History</Link>
              <Link to="/settings" className="text-gray-400 hover:text-white text-sm transition-colors">{t('dashboard.settings')}</Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              <div className="flex items-center gap-3">
                {user?.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full bg-white/10"
                  />
                )}
                <span className="text-white text-sm hidden sm:block">{user?.name}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('dashboard.welcome', { name: user?.name })}
          </h1>
          <p className="text-gray-400">
            {t('dashboard.subtitle')}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-surface border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-surface border-border h-full">
              <CardHeader>
                <CardTitle className="text-white">{t('dashboard.quickStart')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {agents.map((agent) => (
                    <button
                      key={agent.name}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/50 transition-colors text-left group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <agent.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{agent.name}</h3>
                        <p className="text-gray-400 text-sm">{agent.role}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <p className="text-gray-300 text-sm">
                      Tip: Try typing "Help me analyze Tesla's financial report" to start your first task
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-surface border-border h-full">
              <CardHeader>
                <CardTitle className="text-white">{t('dashboard.account')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  {user?.avatar && (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-16 h-16 rounded-full bg-white/10"
                    />
                  )}
                  <div>
                    <h3 className="text-white font-medium">{user?.name}</h3>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{t('dashboard.plan')}</span>
                    <span className="text-primary text-sm font-medium">Free</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{t('dashboard.callsRemaining')}</span>
                    <span className="text-white text-sm">8/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{t('dashboard.joined')}</span>
                    <span className="text-white text-sm">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                    <Settings className="w-4 h-4 mr-2" />
                    {t('dashboard.settings')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

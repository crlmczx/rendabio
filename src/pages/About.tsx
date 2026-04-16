import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Zap, 
  Users, 
  Shield,
  ArrowRight,
  Github,
  Twitter,
  Mail,
  MessageCircle,
  Video,
  FileText,
  PlayCircle
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';

const stats = [
  { value: '10,000+', label: '活跃用户' },
  { value: '500,000+', label: '任务完成' },
  { value: '50+', label: 'AI 智能体' },
  { value: '99.9%', label: '服务可用性' },
];

const values = [
  {
    icon: Target,
    title: '使命',
    description: '让每个人都能拥有自己的 AI 智能体团队，提升工作效率，释放创造力。',
    color: 'from-primary to-primary-dark',
  },
  {
    icon: Zap,
    title: '创新',
    description: '持续探索 AI 技术前沿，将最新的研究成果转化为实用的产品功能。',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Users,
    title: '用户至上',
    description: '以用户需求为中心，打造简洁、高效、易用的产品体验。',
    color: 'from-purple-500 to-purple-700',
  },
  {
    icon: Shield,
    title: '数据安全',
    description: '采用企业级安全措施，保护用户数据隐私，让您安心使用。',
    color: 'from-emerald-500 to-emerald-700',
  },
];

const team = [
  { name: '张明', role: '创始人 & CEO', avatar: 'ZM' },
  { name: '李华', role: '首席技术官', avatar: 'LH' },
  { name: '王芳', role: '产品总监', avatar: 'WF' },
  { name: '陈强', role: 'AI 研究主管', avatar: 'CQ' },
];

export function About() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-white font-semibold text-xl">RendaBio</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-400 hover:text-white text-sm">首页</Link>
              <Link to="/articles" className="text-gray-400 hover:text-white text-sm">文章</Link>
              <Link to="/about" className="text-white text-sm">关于</Link>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-primary hover:bg-primary-light text-white">
                    仪表盘
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="bg-primary hover:bg-primary-light text-white">
                    登录
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              关于 <span className="text-gradient">RendaBio</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              我们致力于打造最先进的 AI 多智能体协作平台，
              让每个人都能拥有自己的 AI 团队。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary-light text-white px-8">
                  开始使用
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="mailto:contact@rendabio.com">
                <Button variant="outline" className="border-white/10 text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  联系我们
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              我们的价值观
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              这些原则指导着我们的每一个决策，塑造着我们的产品和文化。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-surface border-border h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              核心团队
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              一群热爱技术和创新的伙伴，共同打造未来。
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{member.avatar}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-border rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              与我们联系
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              有任何问题或建议？我们随时欢迎您的反馈。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a href="mailto:contact@rendabio.com">
                <Button className="bg-primary hover:bg-primary-light text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  发送邮件
                </Button>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/10 text-white">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/10 text-white">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
              </a>
            </div>
            
            {/* Chinese Social Media */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-500 text-sm mb-4">关注我们的中文社交媒体</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    微信公众号
                  </Button>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-black/30 text-gray-800 bg-white hover:bg-gray-100">
                    <Video className="w-4 h-4 mr-2" />
                    抖音
                  </Button>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                    <FileText className="w-4 h-4 mr-2" />
                    今日头条
                  </Button>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-red-400/30 text-red-300 hover:bg-red-400/10 hover:text-red-200">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    西瓜视频
                  </Button>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    微博
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} RendaBio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-500 hover:text-white text-sm">隐私政策</Link>
              <Link to="/terms" className="text-gray-500 hover:text-white text-sm">服务条款</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

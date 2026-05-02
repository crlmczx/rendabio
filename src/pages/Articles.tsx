import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  FileText, 
  Clock, 
  User, 
  Eye,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  createdAt: string;
  views: number;
  tags: string[];
  status: 'published' | 'draft';
}

const mockArticles: Article[] = [
  {
    id: '5',
    title: 'Teamo Agent：AI多智能体平台如何重塑企业工作流',
    excerpt: 'Teamo Agent 是一个革命性的AI多智能体协作平台，通过多个专业化AI智能体的协同工作，为企业提供95%+的准确率和50%-90%的效率提升。',
    author: 'RendaBio Team',
    createdAt: '2026-05-02',
    views: 0,
    tags: ['AI智能体', '多智能体', '企业效率', '团队协作', '数字化转型'],
    status: 'published',
  },
  {
    id: '1',
    title: '基于深度学习的自然语言处理研究进展',
    excerpt: '本文综述了近年来深度学习在自然语言处理领域的最新进展，包括Transformer架构、预训练语言模型等...',
    author: '张教授',
    createdAt: '2025-01-15',
    views: 1234,
    tags: ['深度学习', 'NLP', '综述'],
    status: 'published',
  },
  {
    id: '2',
    title: '国家自然科学基金申请书撰写指南',
    excerpt: '详细介绍国家自然科学基金申请书的撰写要点、注意事项和常见问题...',
    author: '李研究员',
    createdAt: '2025-01-10',
    views: 892,
    tags: ['基金申请', '科研', '指南'],
    status: 'published',
  },
  {
    id: '3',
    title: 'SCI论文写作技巧与投稿策略',
    excerpt: '分享SCI论文写作的核心技巧和投稿策略，帮助研究者提高论文发表成功率...',
    author: '王博士',
    createdAt: '2025-01-05',
    views: 2156,
    tags: ['SCI', '论文写作', '投稿'],
    status: 'published',
  },
  {
    id: '4',
    title: '硕士论文开题报告模板与示例',
    excerpt: '提供硕士论文开题报告的标准模板和优秀示例，助力研究生顺利完成开题...',
    author: '陈导师',
    createdAt: '2025-01-03',
    views: 1567,
    tags: ['开题报告', '硕士', '模板'],
    status: 'draft',
  },
];

export function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const { user } = useAuth();

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || article.status === filter;
    return matchesSearch && matchesFilter;
  });

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
              <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm">仪表盘</Link>
              <Link to="/articles" className="text-white text-sm">文章</Link>
              <Link to="/files" className="text-gray-400 hover:text-white text-sm">文件</Link>
              <Link to="/settings" className="text-gray-400 hover:text-white text-sm">设置</Link>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              {user?.avatar && (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-white/10" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">文章管理</h1>
              <p className="text-gray-400">管理您的所有文章和草稿</p>
            </div>
            <Link to="/articles/create">
              <Button className="bg-primary hover:bg-primary-light text-white">
                <Plus className="w-4 h-4 mr-2" />
                新建文章
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-primary text-white' : 'border-white/10 text-white'}
              >
                <Filter className="w-4 h-4 mr-2" />
                全部
              </Button>
              <Button
                variant={filter === 'published' ? 'default' : 'outline'}
                onClick={() => setFilter('published')}
                className={filter === 'published' ? 'bg-primary text-white' : 'border-white/10 text-white'}
              >
                已发布
              </Button>
              <Button
                variant={filter === 'draft' ? 'default' : 'outline'}
                onClick={() => setFilter('draft')}
                className={filter === 'draft' ? 'bg-primary text-white' : 'border-white/10 text-white'}
              >
                草稿
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid gap-4">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Card className="bg-surface border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                        {article.status === 'draft' && (
                          <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                            草稿
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.createdAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-white/5 text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/articles/${article.id}`}>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link to={`/articles/${article.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">暂无文章</h3>
            <p className="text-gray-400 mb-4">开始创建您的第一篇文章吧</p>
            <Link to="/articles/create">
              <Button className="bg-primary hover:bg-primary-light text-white">
                <Plus className="w-4 h-4 mr-2" />
                新建文章
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  User, 
  Clock,
  X,
  TrendingUp,
  History
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: 'article' | 'agent' | 'user';
  author?: string;
  date?: string;
  tags?: string[];
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: '基于深度学习的自然语言处理研究进展',
    excerpt: '本文综述了近年来深度学习在自然语言处理领域的最新进展...',
    type: 'article',
    author: '张教授',
    date: '2025-01-15',
    tags: ['深度学习', 'NLP'],
  },
  {
    id: '2',
    title: 'DeepResearch 智能体',
    excerpt: '深度研究员，精准搜索和全球信息整合...',
    type: 'agent',
  },
  {
    id: '3',
    title: '国家自然科学基金申请书撰写指南',
    excerpt: '详细介绍国家自然科学基金申请书的撰写要点...',
    type: 'article',
    author: '李研究员',
    date: '2025-01-10',
    tags: ['基金申请'],
  },
];

const hotSearches = [
  'SCI论文写作',
  '国家自然科学基金',
  '深度学习',
  '开题报告',
  '文献综述',
  '数据分析',
];

const recentSearches = [
  '硕士论文',
  '答辩PPT',
  '研究方法',
];

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
    }
  };

  const filteredResults = mockResults.filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'agent':
        return <User className="w-5 h-5 text-purple-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'article':
        return '文章';
      case 'agent':
        return '智能体';
      default:
        return '其他';
    }
  };

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
              <Input
                placeholder="搜索文章、智能体、用户..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-14 pr-12 py-6 text-lg bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); setHasSearched(false); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {!hasSearched ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Hot Searches */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-white font-medium">热门搜索</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {hotSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => { setQuery(term); setHasSearched(true); }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-500" />
                <h2 className="text-white font-medium">最近搜索</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => { setQuery(term); setHasSearched(true); }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Search Results */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-400">
                找到 <span className="text-white">{filteredResults.length}</span> 个结果
              </p>
            </div>

            <div className="space-y-4">
              {filteredResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-surface border-border hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{getTypeIcon(result.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="bg-white/5 text-gray-400 text-xs">
                              {getTypeLabel(result.type)}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-1 hover:text-primary cursor-pointer">
                            {result.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2">{result.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {result.author && (
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {result.author}
                              </span>
                            )}
                            {result.date && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {result.date}
                              </span>
                            )}
                          </div>
                          {result.tags && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {result.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="border-white/10 text-gray-400">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredResults.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">未找到结果</h3>
                <p className="text-gray-400">尝试使用其他关键词搜索</p>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}

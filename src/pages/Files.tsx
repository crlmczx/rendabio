import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  File,
  MoreVertical,
  Download,
  Trash2,
  Folder,
  Grid3X3,
  List
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';

interface FileItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'other';
  size: string;
  updatedAt: string;
}

const mockFiles: FileItem[] = [
  { id: '1', name: '开题报告模板.docx', type: 'document', size: '245 KB', updatedAt: '2025-01-15' },
  { id: '2', name: '实验数据.xlsx', type: 'document', size: '1.2 MB', updatedAt: '2025-01-14' },
  { id: '3', name: '论文图表.png', type: 'image', size: '3.5 MB', updatedAt: '2025-01-13' },
  { id: '4', name: '参考文献.pdf', type: 'document', size: '5.8 MB', updatedAt: '2025-01-12' },
  { id: '5', name: '答辩PPT.pptx', type: 'document', size: '12.3 MB', updatedAt: '2025-01-10' },
  { id: '6', name: '研究方法.docx', type: 'document', size: '156 KB', updatedAt: '2025-01-08' },
];

export function Files() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const { user } = useAuth();

  const filteredFiles = mockFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-8 h-8 text-blue-400" />;
      case 'image':
        return <ImageIcon className="w-8 h-8 text-purple-400" />;
      default:
        return <File className="w-8 h-8 text-gray-400" />;
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

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm">仪表盘</Link>
              <Link to="/articles" className="text-gray-400 hover:text-white text-sm">文章</Link>
              <Link to="/files" className="text-white text-sm">文件</Link>
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
              <h1 className="text-3xl font-bold text-white mb-2">文件管理</h1>
              <p className="text-gray-400">管理您的所有文件和资料</p>
            </div>
            <Button className="bg-primary hover:bg-primary-light text-white">
              <Upload className="w-4 h-4 mr-2" />
              上传文件
            </Button>
          </div>
        </motion.div>

        {/* Storage Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Folder className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-white font-medium">存储空间</p>
                    <p className="text-gray-400 text-sm">已使用 2.3 GB / 10 GB</p>
                  </div>
                </div>
                <p className="text-primary font-medium">23%</p>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[23%] bg-gradient-to-r from-primary to-primary-light rounded-full" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="搜索文件..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-primary text-white' : 'border-white/10 text-white'}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-primary text-white' : 'border-white/10 text-white'}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Files List */}
        {viewMode === 'list' ? (
          <div className="space-y-2">
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card className="bg-surface border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {getFileIcon(file.type)}
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{file.name}</h3>
                        <p className="text-gray-400 text-sm">{file.size} · {file.updatedAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card className="bg-surface border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">{getFileIcon(file.type)}</div>
                    <h3 className="text-white font-medium truncate">{file.name}</h3>
                    <p className="text-gray-400 text-sm">{file.size}</p>
                    <p className="text-gray-500 text-xs">{file.updatedAt}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filteredFiles.length === 0 && (
          <div className="text-center py-16">
            <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">暂无文件</h3>
            <p className="text-gray-400 mb-4">上传您的第一个文件</p>
            <Button className="bg-primary hover:bg-primary-light text-white">
              <Upload className="w-4 h-4 mr-2" />
              上传文件
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

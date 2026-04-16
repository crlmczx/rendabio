import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Image as ImageIcon,
  X,
  Eye
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';

export function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const navigate = useNavigate();
  useAuth();

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveDraft = () => {
    // Save draft logic
    console.log('Saving draft:', { title, content, tags });
    navigate('/articles');
  };

  const handlePublish = () => {
    // Publish logic
    console.log('Publishing:', { title, content, tags });
    navigate('/articles');
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering
    return text
      .replace(/# (.*)/g, '<h1 class="text-3xl font-bold text-white mb-4">$1</h1>')
      .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-white mb-3">$1</h2>')
      .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-white mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-2 py-1 rounded text-primary">$1</code>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/articles">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </Button>
              </Link>
              <h1 className="text-lg font-semibold text-white">新建文章</h1>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
                className="border-white/10 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? '编辑' : '预览'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                className="border-white/10 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                保存草稿
              </Button>
              <Button
                size="sm"
                onClick={handlePublish}
                className="bg-primary hover:bg-primary-light text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                发布
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Editor */}
          <div className={isPreview ? 'hidden lg:block' : ''}>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Input
                  placeholder="文章标题"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-bold bg-transparent border-0 border-b border-white/10 rounded-none text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              {/* Tags */}
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <Badge key={tag} className="bg-primary/20 text-primary hover:bg-primary/30">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="添加标签"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  <Button
                    variant="outline"
                    onClick={handleAddTag}
                    className="border-white/10 text-white"
                  >
                    添加
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div>
                <Textarea
                  placeholder="使用 Markdown 格式编写文章内容...\n\n支持：\n# 标题\n## 副标题\n**粗体**\n*斜体*\n`代码`"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[500px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none"
                />
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className={!isPreview ? 'hidden lg:block' : ''}>
            <div className="bg-surface border border-border rounded-xl p-8 min-h-[600px]">
              <h2 className="text-sm text-gray-500 mb-4">预览</h2>
              {title && (
                <h1 className="text-3xl font-bold text-white mb-6">{title}</h1>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map(tag => (
                    <Badge key={tag} className="bg-primary/20 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              {content ? (
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                />
              ) : (
                <p className="text-gray-500">预览将在这里显示...</p>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

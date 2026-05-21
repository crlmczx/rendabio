import { useState } from 'react';
import { ExternalLink, Menu, Bot, Wrench } from 'lucide-react';

const KIMI_AGENT_URL = 'https://vquldoqdcjfe4.ok.kimi.link';

export function HermesAgentPage() {
  const [activeTab, setActiveTab] = useState<'full' | 'tools'>('full');

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* 头部导航 */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-white font-semibold text-xl">RendaBio</span>
            </a>

            {/* 页面切换：Hermes AI Pro / 创作工具 */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('full')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'full'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Bot className="w-4 h-4" />
                Hermes AI Pro
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'tools'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Wrench className="w-4 h-4" />
                创作工具
              </button>
            </nav>

            {/* 右侧 */}
            <div className="flex items-center gap-3">
              {activeTab === 'full' && (
                <a
                  href={KIMI_AGENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  新窗口打开
                </a>
              )}
              <button className="md:hidden text-white p-2">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'full' ? (
          /* Hermes AI Pro - 全屏 iframe */
          <div className="flex-1 relative">
            <iframe
              src={KIMI_AGENT_URL}
              className="absolute inset-0 w-full h-full border-0"
              allow="microphone; camera"
              loading="lazy"
              title="Hermes AI Pro Agent"
            />
          </div>
        ) : (
          /* 创作工具页面 */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">创作工具即将上线</h2>
              <p className="text-gray-400 mb-6">
                我们正在开发 AI 驱动的创作工具集，包括智能文案、多语言语音合成、图表化工作流等功能。敬请期待！
              </p>
              <button
                onClick={() => setActiveTab('full')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-purple-600/20 transition-all"
              >
                返回 Hermes AI Pro
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

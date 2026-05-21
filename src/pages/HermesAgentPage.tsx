import { useState, useRef, useCallback, useEffect } from 'react';
import { ExternalLink, Menu, Bot, Radio, Music, Wrench } from 'lucide-react';

const KIMI_AGENT_URL = 'https://vquldoqdcjfe4.ok.kimi.link';

export function HermesAgentPage() {
  const [activeTab, setActiveTab] = useState<'full' | 'tools'>('full');
  const [activeTool, setActiveTool] = useState('热点抓取');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 点击外部工具按钮 → 尝试通过 postMessage 通知 iframe 内部
  const handleToolClick = useCallback((tool: string) => {
    setActiveTool(tool);

    // 尝试 postMessage 到 iframe
    try {
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'SWITCH_TAB', tool: tool.toLowerCase() },
        '*'
      );
    } catch {}
  }, []);

  // 监听 iframe 内部发来的消息，同步活动标签状态
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'TAB_CHANGED' && typeof e.data?.tool === 'string') {
        setActiveTool(e.data.tool);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

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

            {/* 页面切换：Hermes AI Pro / 创作工具 —— 居中 */}
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
          <div className="flex-1 flex flex-col">
            {/* Hermes AI Pro 中的三个工具图标 - 居中，可点击切换 */}
            <div className="bg-surface/20 border-b border-white/5">
              <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="flex items-center justify-center gap-3">
                  {([
                    { icon: Radio, label: '热点抓取', iconChar: '📡' },
                    { icon: Music, label: '音色工坊', iconChar: '🎙️' },
                    { icon: Wrench, label: '创作工具', iconChar: '🛠️' },
                  ] as const).map((tool) => (
                    <button
                      key={tool.label}
                      onClick={() => handleToolClick(tool.label)}
                      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        activeTool === tool.label
                          ? 'bg-gradient-to-r from-purple-600/25 to-indigo-600/25 text-purple-200 border border-purple-500/40 shadow-sm shadow-purple-600/15 scale-105'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent hover:scale-102'
                      }`}
                    >
                      <span className="text-base">{tool.iconChar}</span>
                      {tool.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Agent iframe - 全屏内容 */}
            <div className="flex-1 relative">
              <iframe
                ref={iframeRef}
                src={KIMI_AGENT_URL}
                className="absolute inset-0 w-full h-full border-0"
                allow="microphone; camera"
                loading="lazy"
                title="Hermes AI Pro Agent"
              />
            </div>
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

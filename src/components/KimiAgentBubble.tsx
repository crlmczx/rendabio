import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Sparkles, ExternalLink, Minimize2, Maximize2 } from 'lucide-react';

const KIMI_AGENT_URL = 'https://vquldoqdcjfe4.ok.kimi.link';

export function KimiAgentBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // 当打开时重置新消息提示
  useEffect(() => {
    if (isOpen) setHasNewMessage(false);
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setIsMinimized(false);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const openInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(KIMI_AGENT_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* 浮动气泡按钮 */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
        {/* 提示标签 */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 text-sm text-white/80 whitespace-nowrap shadow-lg"
            >
              ✨ 试试 Hermes AI 助手
            </motion.div>
          )}
        </AnimatePresence>

        {/* 主按钮 */}
        <motion.button
          onClick={toggleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 text-white shadow-2xl flex items-center justify-center cursor-pointer border-0 outline-none group"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{ boxShadow: '0 8px 32px rgba(109, 72, 195, 0.45)' }}
        >
          {/* 脉冲光环 */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-600/30 animate-ping opacity-30" />
          
          {/* 新消息指示器 */}
          {hasNewMessage && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0a0e1a] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">1</span>
            </span>
          )}

          {/* 图标 */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <div className="relative">
                <MessageSquare size={22} />
                <Sparkles 
                  size={10} 
                  className="absolute -top-1 -right-2 text-yellow-300" 
                />
              </div>
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* 弹出对话框 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : undefined 
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.165, 0.84, 0.44, 1] }}
            className="fixed bottom-24 right-6 z-[9998] w-[400px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{
              background: 'rgba(15, 15, 25, 0.95)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(109, 72, 195, 0.15)',
            }}
          >
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Sparkles size= {16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Hermes AI Pro</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-emerald-400/70">在线</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={openInNewTab}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  title="在新窗口打开"
                >
                  <ExternalLink size={14} />
                </button>
                <button
                  onClick={toggleMinimize}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  title={isMinimized ? '展开' : '最小化'}
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  title="关闭"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* 内容区 */}
            {!isMinimized && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '560px' }}
                exit={{ height: 0 }}
                className="relative"
              >
                <iframe
                  ref={iframeRef}
                  src={KIMI_AGENT_URL}
                  className="w-full h-full border-0"
                  allow="microphone; camera"
                  loading="lazy"
                  title="Hermes AI Pro Agent"
                />
                {/* 底部磨砂渐变 */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgba(15,15,25,0.9)] to-transparent pointer-events-none" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Phone,
  Mic,
  X,
  ArrowLeft,
  Play,
  Trash2,
  ExternalLink,
  Volume2,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Recording {
  id: string;
  date: string;
  duration: string;
  contact: string;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const mockRecordings: Recording[] = [
  { id: '1', date: '2025-05-19', duration: '4:32', contact: '138****5678' },
  { id: '2', date: '2025-05-18', duration: '12:15', contact: '159****2345' },
  { id: '3', date: '2025-05-17', duration: '3:48', contact: '177****8901' },
];

const dialPadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

export function VirtualNumberPanel() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState('');

  const handleKeyPress = useCallback((key: string) => {
    setNumber((prev) => prev + key);
  }, []);

  const handleDelete = useCallback(() => {
    setNumber((prev) => prev.slice(0, -1));
  }, []);

  const handleCall = useCallback(() => {
    if (!number.trim()) return;
    toast.success(t('virtualNumber.dialing').replace('{{number}}', number));
    setTimeout(() => {
      toast.success(t('virtualNumber.callConnected'));
    }, 1500);
  }, [number, t]);

  const handlePlay = useCallback((recording: Recording) => {
    toast.info(`${t('virtualNumber.play')}: ${recording.contact} (${recording.duration})`);
  }, [t]);

  const handleDeleteRecording = useCallback((_id: string) => {
    toast.success(t('virtualNumber.delete') + ' ✓');
  }, [t]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/30 flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <Phone className="w-6 h-6 text-white" />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 bg-surface border-l border-white/10 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Panel Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{t('virtualNumber.title')}</p>
                      <p className="text-gray-500 text-xs">1709-8888-6666</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Panel Content */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                  {/* Quick Dial */}
                  <div>
                    <p className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">
                      {t('virtualNumber.quickDial')}
                    </p>
                    <Input
                      value={number}
                      readOnly
                      placeholder={t('virtualNumber.enterNumber')}
                      className="bg-white/5 border-white/10 text-white text-lg text-center h-11 tracking-widest placeholder:text-gray-600"
                    />
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {dialPadKeys.map((key) => (
                        <motion.button
                          key={key}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleKeyPress(key)}
                          className="h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white text-base font-semibold transition-colors border border-white/5 active:bg-white/15"
                        >
                          {key}
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        className="text-gray-400 hover:text-white h-9 w-9"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={handleCall}
                        disabled={!number.trim()}
                        className="flex-1 bg-gradient-to-r from-primary to-purple-600 text-white h-9 rounded-xl glow-purple text-sm"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {t('virtualNumber.call')}
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-white/5" />

                  {/* Recent Recordings */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                        {t('virtualNumber.recentRecordings')}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {mockRecordings.length === 0 ? (
                        <p className="text-gray-500 text-center py-4 text-sm">
                          {t('virtualNumber.noRecordings')}
                        </p>
                      ) : (
                        mockRecordings.map((rec) => (
                          <div
                            key={rec.id}
                            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                                <Mic className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <div>
                                <p className="text-white text-xs">{rec.contact}</p>
                                <div className="flex items-center gap-1">
                                  <Volume2 className="w-3 h-3 text-gray-500" />
                                  <p className="text-gray-500 text-xs">{rec.duration} · {rec.date}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-primary hover:text-primary-light"
                                onClick={() => handlePlay(rec)}
                              >
                                <Play className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-red-400 hover:text-red-300"
                                onClick={() => handleDeleteRecording(rec.id)}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Panel Footer */}
                <div className="px-5 py-4 border-t border-white/5">
                  <Link to="/virtual-number" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white glow-purple">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('virtualNumber.openFull')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

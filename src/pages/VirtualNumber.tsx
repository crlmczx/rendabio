import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Phone,
  Mic,
  History,
  User,
  Settings2,
  PhoneOutgoing,
  PhoneIncoming,
  Play,
  Trash2,
  ArrowLeft,
  CreditCard,
  Globe,
  Volume2,
  ShieldBan,
  EyeOff,
  Forward,
  Loader2,
} from 'lucide-react';
import { makeCall } from '@/api/ronglian';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Recording {
  id: string;
  date: string;
  duration: string;
  contact: string;
}

interface CallLog {
  id: string;
  date: string;
  contact: string;
  type: 'incoming' | 'outgoing';
  duration: string;
}

// ─── Storage Helpers ─────────────────────────────────────────────────────────

const STORAGE_KEY_CALL_LOGS = 'rendabio_call_logs';

function getCallLogsFromStorage(): CallLog[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CALL_LOGS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function addCallLogToStorage(log: CallLog) {
  const logs = getCallLogsFromStorage();
  logs.unshift(log);
  const trimmed = logs.slice(0, 100);
  localStorage.setItem(STORAGE_KEY_CALL_LOGS, JSON.stringify(trimmed));
}

// ─── Mock Recordings ─────────────────────────────────────────────────────────

const mockRecordings: Recording[] = [
  { id: '1', date: '2025-05-19', duration: '4:32', contact: '138****5678' },
  { id: '2', date: '2025-05-18', duration: '12:15', contact: '159****2345' },
  { id: '3', date: '2025-05-17', duration: '3:48', contact: '177****8901' },
  { id: '4', date: '2025-05-16', duration: '8:21', contact: '136****4321' },
];

const dialPadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

// ─── Sub Components ─────────────────────────────────────────────────────────

function DialPad() {
  const { t } = useTranslation();
  const [number, setNumber] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'success' | 'failed'>('idle');

  const handleKeyPress = useCallback((key: string) => {
    setNumber((prev) => prev + key);
  }, []);

  const handleDelete = useCallback(() => {
    setNumber((prev) => prev.slice(0, -1));
  }, []);

  const handleCall = useCallback(async () => {
    if (!number.trim()) return;
    setCallStatus('calling');

    toast.info(t('virtualNumber.dialing').replace('{{number}}', number));

    const result = await makeCall(number);

    if (result.success) {
      setCallStatus('success');
      toast.success(t('virtualNumber.callConnected'));

      // Save to call log
      addCallLogToStorage({
        id: Date.now().toString(),
        date: new Date().toLocaleString('zh-CN'),
        contact: number,
        type: 'outgoing',
        duration: '--',
      });

      setTimeout(() => setCallStatus('idle'), 1500);
    } else {
      setCallStatus('failed');
      toast.error(result.message || t('virtualNumber.callFailed'));
      setTimeout(() => setCallStatus('idle'), 2000);
    }
  }, [number, t]);

  const getButtonLabel = () => {
    switch (callStatus) {
      case 'calling': return t('virtualNumber.dialing').replace('{{number}}', '');
      case 'success': return t('virtualNumber.callConnected');
      case 'failed': return t('virtualNumber.callFailed');
      default: return t('virtualNumber.call');
    }
  };

  return (
    <Card className="bg-surface border-border h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary" />
          {t('virtualNumber.dialPad')}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {/* Number Display */}
        <div className="w-full text-center">
          <Input
            value={number}
            readOnly
            placeholder={t('virtualNumber.enterNumber')}
            className="bg-white/5 border-white/10 text-white text-2xl text-center h-14 tracking-widest placeholder:text-gray-600"
          />
        </div>

        {/* Dial Pad Grid */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
          {dialPadKeys.map((key) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleKeyPress(key)}
              className="h-14 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xl font-semibold transition-colors border border-white/5 active:bg-white/15"
            >
              {key}
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 w-full max-w-xs mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={callStatus === 'calling'}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleCall}
            disabled={!number.trim() || callStatus === 'calling'}
            className={`flex-1 h-12 rounded-xl font-semibold ${
              callStatus === 'failed'
                ? 'bg-red-600 hover:bg-red-700'
                : callStatus === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary-light hover:to-purple-500 glow-purple'
            } text-white`}
          >
            {callStatus === 'calling' ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t('virtualNumber.dialing').split(' ')[0] || '呼叫中'}
              </>
            ) : (
              <>
                <Phone className="w-5 h-5 mr-2" />
                {getButtonLabel()}
              </>
            )}
          </Button>
          <div className="w-10" /> {/* spacer */}
        </div>
      </CardContent>
    </Card>
  );
}

function CallRecordings() {
  const { t } = useTranslation();
  const [recordings, setRecordings] = useState<Recording[]>(mockRecordings);

  const handleDelete = useCallback((id: string) => {
    setRecordings((prev) => prev.filter((r) => r.id !== id));
    toast.success(t('virtualNumber.delete') + ' ✓');
  }, [t]);

  const handlePlay = useCallback((recording: Recording) => {
    toast.info(`${t('virtualNumber.play')}: ${recording.contact} (${recording.duration})`);
  }, [t]);

  return (
    <Card className="bg-surface border-border h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Mic className="w-4 h-4 text-primary" />
          {t('virtualNumber.callRecording')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recordings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('virtualNumber.noRecordings')}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">{t('virtualNumber.date')}</TableHead>
                <TableHead className="text-gray-400">{t('virtualNumber.duration')}</TableHead>
                <TableHead className="text-gray-400">{t('virtualNumber.contact')}</TableHead>
                <TableHead className="text-gray-400 text-right">{t('virtualNumber.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recordings.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell className="text-white">{rec.date}</TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-primary" />
                      {rec.duration}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{rec.contact}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:text-primary-light"
                        onClick={() => handlePlay(rec)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(rec.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function CallHistory() {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<CallLog[]>(() => getCallLogsFromStorage());

  useEffect(() => {
    const handleStorage = () => setLogs(getCallLogsFromStorage());
    window.addEventListener('storage', handleStorage);
    // Refresh every 3s to catch same-tab updates
    const interval = setInterval(() => setLogs(getCallLogsFromStorage()), 3000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="bg-surface border-border h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <History className="w-4 h-4 text-primary" />
          {t('virtualNumber.callHistory')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('virtualNumber.noHistory')}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">{t('virtualNumber.date')}</TableHead>
                <TableHead className="text-gray-400">{t('virtualNumber.contact')}</TableHead>
                <TableHead className="text-gray-400">{t('virtualNumber.type')}</TableHead>
                <TableHead className="text-gray-400">{t('virtualNumber.duration')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-white text-xs">{log.date}</TableCell>
                  <TableCell className="text-gray-300">{log.contact}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        log.type === 'incoming'
                          ? 'border-green-500/30 text-green-400 bg-green-500/10'
                          : 'border-red-500/30 text-red-400 bg-red-500/10'
                      }
                    >
                      {log.type === 'incoming' ? (
                        <PhoneIncoming className="w-3 h-3 mr-1" />
                      ) : (
                        <PhoneOutgoing className="w-3 h-3 mr-1" />
                      )}
                      {t(log.type === 'incoming' ? 'virtualNumber.incoming' : 'virtualNumber.outgoing')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{log.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function VirtualNumberSettings() {
  const { t } = useTranslation();
  const [autoRecord, setAutoRecord] = useState(true);
  const [spamBlock, setSpamBlock] = useState(true);
  const [hideNumber, setHideNumber] = useState(false);
  const [callForward, setCallForward] = useState(false);

  const settingsItems = [
    { label: t('virtualNumber.autoRecord'), icon: Mic, value: autoRecord, onChange: setAutoRecord },
    { label: t('virtualNumber.spamBlock'), icon: ShieldBan, value: spamBlock, onChange: setSpamBlock },
    { label: t('virtualNumber.hideNumber'), icon: EyeOff, value: hideNumber, onChange: setHideNumber },
    { label: t('virtualNumber.callForward'), icon: Forward, value: callForward, onChange: setCallForward },
  ];

  return (
    <Card className="bg-surface border-border h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-primary" />
          {t('virtualNumber.virtualSettings')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {settingsItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-gray-200 text-sm">{item.label}</span>
            </div>
            <Switch
              checked={item.value}
              onCheckedChange={item.onChange}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ─── Device Tabs Content ────────────────────────────────────────────────────

function TabPhone({ t }: { t: (key: string) => string }) {
  const [number, setNumber] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'success' | 'failed'>('idle');

  const handleKeyPress = useCallback((key: string) => {
    setNumber((prev) => prev + key);
  }, []);

  const handleDelete = useCallback(() => {
    setNumber((prev) => prev.slice(0, -1));
  }, []);

  const handleCall = useCallback(async () => {
    if (!number.trim()) return;
    setCallStatus('calling');
    toast.info(t('virtualNumber.dialing').replace('{{number}}', number));

    const result = await makeCall(number);

    if (result.success) {
      setCallStatus('success');
      toast.success(t('virtualNumber.callConnected'));

      addCallLogToStorage({
        id: Date.now().toString(),
        date: new Date().toLocaleString('zh-CN'),
        contact: number,
        type: 'outgoing',
        duration: '--',
      });

      setTimeout(() => setCallStatus('idle'), 1500);
    } else {
      setCallStatus('failed');
      toast.error(result.message || t('virtualNumber.callFailed'));
      setTimeout(() => setCallStatus('idle'), 2000);
    }
  }, [number, t]);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <Input
        value={number}
        readOnly
        placeholder={t('virtualNumber.enterNumber')}
        className="bg-white/5 border-white/10 text-white text-xl text-center h-12 tracking-widest placeholder:text-gray-600 max-w-xs"
      />
      <div className="grid grid-cols-3 gap-2 w-full max-w-[220px]">
        {dialPadKeys.map((key) => (
          <motion.button
            key={key}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleKeyPress(key)}
            className="h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white text-lg font-semibold transition-colors border border-white/5 active:bg-white/15"
          >
            {key}
          </motion.button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={callStatus === 'calling'}
          className="text-gray-400 hover:text-white h-10 w-10"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleCall}
          disabled={!number.trim() || callStatus === 'calling'}
          className={`h-10 px-6 rounded-xl ${
            callStatus === 'failed'
              ? 'bg-red-600'
              : callStatus === 'success'
              ? 'bg-green-600'
              : 'bg-gradient-to-r from-primary to-purple-600 glow-purple'
          } text-white`}
        >
          {callStatus === 'calling' ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Phone className="w-4 h-4 mr-2" />
          )}
          {callStatus === 'calling' ? '呼叫中' : callStatus === 'success' ? '已接通' : callStatus === 'failed' ? '失败' : t('virtualNumber.call')}
        </Button>
      </div>
    </div>
  );
}

function TabRecordings({ t }: { t: (key: string) => string }) {
  const [recordings, setRecordings] = useState<Recording[]>(mockRecordings.slice(0, 3));

  const handleDelete = useCallback((id: string) => {
    setRecordings((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <div className="space-y-2 py-2">
      {recordings.length === 0 ? (
        <p className="text-gray-500 text-center py-6 text-sm">{t('virtualNumber.noRecordings')}</p>
      ) : (
        recordings.map((rec) => (
          <div key={rec.id} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5">
            <div className="flex items-center gap-3">
              <Mic className="w-4 h-4 text-primary" />
              <div>
                <p className="text-white text-sm">{rec.contact}</p>
                <p className="text-gray-500 text-xs">{rec.date} · {rec.duration}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-400"
              onClick={() => handleDelete(rec.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

function TabHistory({ t }: { t: (key: string) => string }) {
  const [logs, setLogs] = useState<CallLog[]>(() => getCallLogsFromStorage());

  useEffect(() => {
    const interval = setInterval(() => setLogs(getCallLogsFromStorage()), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2 py-2">
      {logs.length === 0 ? (
        <p className="text-gray-500 text-center py-6 text-sm">{t('virtualNumber.noHistory')}</p>
      ) : (
        logs.map((log) => (
          <div key={log.id} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                log.type === 'incoming' ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}>
                {log.type === 'incoming' ? (
                  <PhoneIncoming className="w-4 h-4 text-green-400" />
                ) : (
                  <PhoneOutgoing className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div>
                <p className="text-white text-sm">{log.contact}</p>
                <p className="text-gray-500 text-xs">{log.date} · {log.duration}</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={
                log.type === 'incoming'
                  ? 'border-green-500/30 text-green-400 bg-green-500/10 text-xs'
                  : 'border-red-500/30 text-red-400 bg-red-500/10 text-xs'
              }
            >
              {t(log.type === 'incoming' ? 'virtualNumber.incoming' : 'virtualNumber.outgoing')}
            </Badge>
          </div>
        ))
      )}
    </div>
  );
}

function TabProfile({ t }: { t: (key: string) => string }) {
  const [autoRecord, setAutoRecord] = useState(true);
  const [spamBlock, setSpamBlock] = useState(true);

  return (
    <div className="space-y-4 py-2 px-1">
      <div className="text-center py-3">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-2">
          <User className="w-8 h-8 text-white" />
        </div>
        <p className="text-white font-medium">1709-8888-6666</p>
        <p className="text-gray-500 text-xs">{t('virtualNumber.monthlyPlan')}</p>
      </div>
      <Separator className="bg-white/5" />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">{t('virtualNumber.autoRecord')}</span>
          <Switch checked={autoRecord} onCheckedChange={setAutoRecord} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">{t('virtualNumber.spamBlock')}</span>
          <Switch checked={spamBlock} onCheckedChange={setSpamBlock} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function VirtualNumber() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('phone');

  const tabItems = [
    { value: 'phone', icon: Phone, label: t('virtualNumber.title') },
    { value: 'recordings', icon: Mic, label: t('virtualNumber.callRecording') },
    { value: 'history', icon: History, label: t('virtualNumber.callHistory') },
    { value: 'profile', icon: User, label: t('virtualNumber.settings') },
  ];

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
              <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm">
                {t('nav.dashboard')}
              </Link>
              <Link to="/virtual-number" className="text-white text-sm">
                {t('nav.virtualNumber')}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Top Status Bar */}
      <div className="bg-surface/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              {/* Number Display */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('virtualNumber.currentNumber')}</p>
                  <p className="text-white text-xl font-bold tracking-wider">1709-8888-6666</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Balance */}
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/5">
                <CreditCard className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-gray-500">{t('virtualNumber.balance')}</p>
                  <p className="text-white text-sm font-semibold">{t('virtualNumber.balanceAmount', { amount: '128.50' })}</p>
                </div>
              </div>

              {/* Plan */}
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/5">
                <Globe className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-gray-500">{t('virtualNumber.plan')}</p>
                  <p className="text-white text-sm font-semibold">{t('virtualNumber.monthlyPlan')}</p>
                </div>
              </div>

              {/* Settings Button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Settings2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Desktop view */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:grid md:grid-cols-2 gap-6"
        >
          <DialPad />
          <CallRecordings />
          <CallHistory />
          <VirtualNumberSettings />
        </motion.div>

        {/* Mobile Tab View */}
        <div className="md:hidden">
          <div className="mb-4">
            {activeTab === 'phone' && <TabPhone t={t} />}
            {activeTab === 'recordings' && <TabRecordings t={t} />}
            {activeTab === 'history' && <TabHistory t={t} />}
            {activeTab === 'profile' && <TabProfile t={t} />}
          </div>

          {/* Bottom Tab Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-xl border-t border-white/5 z-50">
            <div className="flex items-center justify-around py-2 max-w-lg mx-auto">
              {tabItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                    activeTab === item.value ? 'text-primary' : 'text-gray-500'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    activeTab === item.value ? 'text-primary' : 'text-gray-500'
                  }`} />
                  <span className="text-[10px] leading-none">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Spacer for bottom nav on mobile */}
      <div className="h-20 md:hidden" />
    </div>
  );
}

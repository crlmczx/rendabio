import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, QrCode, CheckCircle, Loader2 } from 'lucide-react';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  planPrice: string;
}

export function PaymentDialog({ open, onOpenChange, planName, planPrice }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      onOpenChange(false);
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">订阅 {planName}</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">支付成功!</h3>
              <p className="text-gray-400">感谢您的订阅</p>
            </motion.div>
          ) : (
            <motion.div
              key="payment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Plan Info */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">方案</span>
                  <span className="text-white font-medium">{planName}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-400">价格</span>
                  <span className="text-primary text-xl font-bold">{planPrice}</span>
                </div>
              </div>

              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid grid-cols-3 bg-white/5 mb-6">
                  <TabsTrigger value="visa" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    <CreditCard className="w-4 h-4 mr-1" />
                    Visa
                  </TabsTrigger>
                  <TabsTrigger value="alipay" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    <QrCode className="w-4 h-4 mr-1" />
                    支付宝
                  </TabsTrigger>
                  <TabsTrigger value="wechat" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    <QrCode className="w-4 h-4 mr-1" />
                    微信
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="visa" className="space-y-4">
                  <div>
                    <Label className="text-gray-300">持卡人姓名</Label>
                    <Input
                      placeholder="请输入持卡人姓名"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">卡号</Label>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">有效期</Label>
                      <Input
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        maxLength={5}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">CVV</Label>
                      <Input
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        maxLength={3}
                        type="password"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-1"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing || !cardNumber || !cardName || !expiryDate || !cvv}
                    className="w-full bg-primary hover:bg-primary-light text-white mt-4"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        处理中...
                      </>
                    ) : (
                      <>确认支付 {planPrice}</>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="alipay" className="text-center py-4">
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    {/* Simulated QR Code */}
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <QrCode className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-xs">支付宝二维码</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">请使用支付宝扫描二维码完成支付</p>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        等待支付...
                      </>
                    ) : (
                      <>我已完成支付</>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="wechat" className="text-center py-4">
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    {/* Simulated QR Code */}
                    <div className="w-48 h-48 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <QrCode className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-xs">微信二维码</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">请使用微信扫描二维码完成支付</p>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        等待支付...
                      </>
                    ) : (
                      <>我已完成支付</>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>

              <p className="text-gray-500 text-xs text-center mt-4">
                支付即表示您同意我们的服务条款
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

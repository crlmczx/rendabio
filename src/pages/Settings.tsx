import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Palette, 
  Save,
  Camera
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';

export function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState('');
  
  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSaveProfile = () => {
    console.log('Saving profile:', { name, email, bio });
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
              <Link to="/files" className="text-gray-400 hover:text-white text-sm">文件</Link>
              <Link to="/settings" className="text-white text-sm">设置</Link>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">设置</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-surface border border-border">
              <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <User className="w-4 h-4 mr-2" />
                个人资料
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Lock className="w-4 h-4 mr-2" />
                账户安全
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Bell className="w-4 h-4 mr-2" />
                通知
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Palette className="w-4 h-4 mr-2" />
                外观
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="text-white">个人资料</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    {user?.avatar && (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-20 h-20 rounded-full bg-white/10"
                      />
                    )}
                    <Button variant="outline" className="border-white/10 text-white">
                      <Camera className="w-4 h-4 mr-2" />
                      更换头像
                    </Button>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">姓名</Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">邮箱</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">个人简介</Label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="介绍一下自己..."
                        className="w-full min-h-[100px] bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 resize-none"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-primary hover:bg-primary-light text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存更改
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="text-white">账户安全</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-gray-300">当前密码</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">新密码</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">确认新密码</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <Button className="bg-primary hover:bg-primary-light text-white">
                    <Lock className="w-4 h-4 mr-2" />
                    更新密码
                  </Button>

                  <div className="pt-6 border-t border-white/5">
                    <h3 className="text-white font-medium mb-4">危险区域</h3>
                    <Button variant="destructive">
                      删除账户
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="text-white">通知设置</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">邮件通知</p>
                      <p className="text-gray-400 text-sm">接收重要更新的邮件通知</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">推送通知</p>
                      <p className="text-gray-400 text-sm">接收实时推送通知</p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">营销邮件</p>
                      <p className="text-gray-400 text-sm">接收产品更新和优惠信息</p>
                    </div>
                    <Switch
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance">
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="text-white">外观设置</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">深色模式</p>
                      <p className="text-gray-400 text-sm">使用深色主题</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-4">语言</p>
                    <div className="flex items-center gap-4">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <LanguageSwitcher />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}

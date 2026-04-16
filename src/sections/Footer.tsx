import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  产品: [
    { name: '功能特性', href: '#features' },
    { name: '智能体', href: '#agents' },
    { name: '定价方案', href: '#pricing' },
    { name: '更新日志', href: '#' },
  ],
  资源: [
    { name: '文档中心', href: '#' },
    { name: 'API 参考', href: '#' },
    { name: '使用教程', href: '#' },
    { name: '博客', href: '#' },
  ],
  公司: [
    { name: '关于我们', href: '#' },
    { name: '加入我们', href: '#' },
    { name: '联系我们', href: '#' },
    { name: '合作伙伴', href: '#' },
  ],
  法律: [
    { name: '隐私政策', href: '#' },
    { name: '服务条款', href: '#' },
    { name: '安全合规', href: '#' },
  ],
};

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Email', icon: Mail, href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <motion.a 
              href="#" 
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-white font-semibold text-xl">RendaBio</span>
            </motion.a>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              专为知识工作者打造的 AI 多智能体协作平台，让复杂任务变得简单高效。
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-medium mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/5" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} RendaBio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-gray-500 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              系统运行正常
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

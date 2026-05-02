import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();

  const navLinks = [
    { name: t('nav.product'), href: '#features' },
    { name: t('nav.agents'), href: '#agents' },
    { name: t('nav.pricing'), href: '#pricing' },
    { name: t('nav.docs'), href: '#workflow' },
    { name: 'Teamo Agent', href: '/teamoteam.html', external: true },
    { name: '案例研究', href: '/teamoteam-use-cases.html', external: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-semibold text-xl">RendaBio</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.external) {
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-base text-gray-300 hover:text-white transition-colors"
                    whileHover={{ y: -1 }}
                  >
                    {link.name}
                  </motion.a>
                );
              }
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-base text-gray-300 hover:text-white transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <Link to="/dashboard">
                <div className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                  {user?.avatar && (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full bg-white/10"
                    />
                  )}
                    <span className="text-base">{user?.name}</span>
                </div>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-white/5 text-base"
                  >
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className="bg-primary hover:bg-primary-light text-white text-base"
                  >
                    {t('nav.getStarted')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-white py-2 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="py-2 border-t border-white/10">
                <LanguageSwitcher />
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-white">
                      <User className="w-4 h-4 mr-2" />
                      {t('nav.dashboard')}
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-gray-300">
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-primary text-white">
                        {t('nav.getStarted')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

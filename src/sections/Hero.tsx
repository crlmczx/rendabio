import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Users } from 'lucide-react';
import { GradientGlows } from '@/components/GradientGlow';
import { useTranslation } from 'react-i18next';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.165, 0.84, 0.44, 1] as const,
    },
  },
};

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Effects */}
      <GradientGlows />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 text-sm border-primary/30 bg-primary/10 text-primary-light"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {t('hero.badge')}
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('hero.title')}{' '}
          <span className="text-gradient">{t('hero.titleHighlight')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link to="/register">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary-light text-white px-8 py-6 text-lg rounded-xl group"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/about">
            <Button 
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-white/5 px-8 py-6 text-lg rounded-xl"
            >
              {t('hero.ctaSecondary')}
            </Button>
          </Link>
        </motion.div>

        {/* Trust Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2 text-gray-500"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-primary-dark/40 border-2 border-black flex items-center justify-center"
              >
                <Users className="w-4 h-4 text-primary-light" />
              </div>
            ))}
          </div>
          <span className="text-sm">{t('hero.trustedBy', { count: '10,000+' })}</span>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          variants={itemVariants}
          className="mt-16 relative"
        >
          <div className="relative mx-auto max-w-4xl">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-2xl blur-xl opacity-50" />
            
            {/* Card */}
            <div className="relative bg-surface border border-border rounded-2xl p-6 sm:p-8 overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full text-sm text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    RendaBio Agent Platform
                  </div>
                </div>
              </div>

              {/* Agent List Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Teamo', role: 'Commander', color: 'from-primary to-primary-dark' },
                  { name: 'DeepResearch', role: 'Researcher', color: 'from-blue-500 to-blue-700' },
                  { name: 'Craft', role: 'Creator', color: 'from-purple-500 to-purple-700' },
                  { name: 'Analytics', role: 'Analyst', color: 'from-emerald-500 to-emerald-700' },
                ].map((agent, i) => (
                  <motion.div
                    key={agent.name}
                    className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-primary/30 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.color} mb-2 flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{agent.name[0]}</span>
                    </div>
                    <div className="text-white text-sm font-medium">{agent.name}</div>
                    <div className="text-gray-500 text-xs">{agent.role}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

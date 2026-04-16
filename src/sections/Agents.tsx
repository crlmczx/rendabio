import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Crown, 
  Search, 
  PenTool, 
  BarChart3, 
  Lightbulb, 
  Code, 
  Target, 
  Scale 
} from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { useTranslation } from 'react-i18next';

export function Agents() {
  const { t } = useTranslation();

  const agents = [
    {
      name: t('agents.teamo.name'),
      role: t('agents.teamo.role'),
      description: t('agents.teamo.description'),
      icon: Crown,
      color: 'from-primary to-primary-dark',
      featured: true,
    },
    {
      name: t('agents.deepresearch.name'),
      role: t('agents.deepresearch.role'),
      description: t('agents.deepresearch.description'),
      icon: Search,
      color: 'from-blue-500 to-blue-700',
    },
    {
      name: t('agents.craft.name'),
      role: t('agents.craft.role'),
      description: t('agents.craft.description'),
      icon: PenTool,
      color: 'from-purple-500 to-purple-700',
    },
    {
      name: t('agents.analytics.name'),
      role: t('agents.analytics.role'),
      description: t('agents.analytics.description'),
      icon: BarChart3,
      color: 'from-emerald-500 to-emerald-700',
    },
    {
      name: t('agents.brainstorm.name'),
      role: t('agents.brainstorm.role'),
      description: t('agents.brainstorm.description'),
      icon: Lightbulb,
      color: 'from-amber-500 to-amber-700',
    },
    {
      name: t('agents.claudecode.name'),
      role: t('agents.claudecode.role'),
      description: t('agents.claudecode.description'),
      icon: Code,
      color: 'from-rose-500 to-rose-700',
    },
    {
      name: t('agents.strategy.name'),
      role: t('agents.strategy.role'),
      description: t('agents.strategy.description'),
      icon: Target,
      color: 'from-cyan-500 to-cyan-700',
    },
    {
      name: t('agents.decision.name'),
      role: t('agents.decision.role'),
      description: t('agents.decision.description'),
      icon: Scale,
      color: 'from-indigo-500 to-indigo-700',
    },
  ];

  return (
    <section id="agents" className="py-24 bg-black relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="inline-block text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('nav.agents')}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('agents.title')}
            <span className="text-gradient"> {t('agents.titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('agents.subtitle')}
          </p>
        </AnimatedSection>

        {/* Agents Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <StaggerItem key={agent.name}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className={`h-full bg-surface border-border hover:border-primary/50 transition-all duration-300 group ${agent.featured ? 'ring-1 ring-primary/30' : ''}`}>
                  <CardContent className="p-5">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <agent.icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {agent.name}
                      </h3>
                      {agent.featured && (
                        <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                          Core
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-primary-light mb-2">{agent.role}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {agent.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom Note */}
        <AnimatedSection className="text-center mt-12" delay={0.4}>
          <p className="text-gray-500 text-sm">
            {t('agents.more')}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

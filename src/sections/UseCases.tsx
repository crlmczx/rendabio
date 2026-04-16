import { motion } from 'framer-motion';
import { TrendingUp, FileEdit, Target, BarChart2, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useTranslation } from 'react-i18next';

export function UseCases() {
  const { t } = useTranslation();

  const useCases = [
    {
      icon: TrendingUp,
      title: t('usecases.marketResearch.title'),
      description: t('usecases.marketResearch.description'),
      features: t('usecases.marketResearch.features', { returnObjects: true }) as string[],
      color: 'from-primary to-primary-dark',
      stats: { value: '10x', label: t('usecases.marketResearch.stat') },
    },
    {
      icon: FileEdit,
      title: t('usecases.contentCreation.title'),
      description: t('usecases.contentCreation.description'),
      features: t('usecases.contentCreation.features', { returnObjects: true }) as string[],
      color: 'from-blue-500 to-blue-700',
      stats: { value: '75%', label: t('usecases.contentCreation.stat') },
    },
    {
      icon: Target,
      title: t('usecases.strategy.title'),
      description: t('usecases.strategy.description'),
      features: t('usecases.strategy.features', { returnObjects: true }) as string[],
      color: 'from-purple-500 to-purple-700',
      stats: { value: '95%', label: t('usecases.strategy.stat') },
    },
    {
      icon: BarChart2,
      title: t('usecases.dataAnalysis.title'),
      description: t('usecases.dataAnalysis.description'),
      features: t('usecases.dataAnalysis.features', { returnObjects: true }) as string[],
      color: 'from-emerald-500 to-emerald-700',
      stats: { value: '5min', label: t('usecases.dataAnalysis.stat') },
    },
  ];

  return (
    <section className="py-24 bg-black relative">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="inline-block text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Use Cases
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('usecases.title')}
            <span className="text-gradient"> {t('usecases.titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('usecases.subtitle')}
          </p>
        </AnimatedSection>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <AnimatedSection key={useCase.title} delay={index * 0.1}>
              <motion.div
                className="group h-full"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="h-full bg-surface border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <useCase.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient">{useCase.stats.value}</div>
                      <div className="text-xs text-gray-500">{useCase.stats.label}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {useCase.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {useCase.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs bg-white/5 text-gray-400 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="#"
                    className="inline-flex items-center text-primary text-sm font-medium group/link"
                    whileHover={{ x: 4 }}
                  >
                    {t('usecases.learnMore')}
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

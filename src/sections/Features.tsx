import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Search, CheckCircle, GraduationCap, FileText, Award, FlaskConical, ScrollText, Dna } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { useTranslation } from 'react-i18next';

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: t('features.multiAgent.title'),
      description: t('features.multiAgent.description'),
      gradient: 'from-primary/20 to-primary/5',
    },
    {
      icon: Search,
      title: t('features.superSearch.title'),
      description: t('features.superSearch.description'),
      gradient: 'from-blue-500/20 to-blue-500/5',
    },
    {
      icon: CheckCircle,
      title: t('features.verification.title'),
      description: t('features.verification.description'),
      gradient: 'from-emerald-500/20 to-emerald-500/5',
    },
  ];

  const academicFeatures = [
    {
      icon: GraduationCap,
      title: t('features.academic.topicDesign.title'),
      description: t('features.academic.topicDesign.description'),
      gradient: 'from-purple-500/20 to-purple-500/5',
      link: 'https://www.home-for-researchers.com/#/exp_design',
      linkText: t('features.academic.topicDesign.link'),
    },
    {
      icon: FlaskConical,
      title: t('features.academic.researchAssist.title'),
      description: t('features.academic.researchAssist.description'),
      gradient: 'from-amber-500/20 to-amber-500/5',
    },
    {
      icon: Award,
      title: t('features.academic.defensePrep.title'),
      description: t('features.academic.defensePrep.description'),
      gradient: 'from-rose-500/20 to-rose-500/5',
    },
    {
      icon: FileText,
      title: t('features.academic.sciPaper.title'),
      description: t('features.academic.sciPaper.description'),
      gradient: 'from-cyan-500/20 to-cyan-500/5',
    },
    {
      icon: ScrollText,
      title: t('features.academic.grantWriting.title'),
      description: t('features.academic.grantWriting.description'),
      gradient: 'from-indigo-500/20 to-indigo-500/5',
    },
    {
      icon: Search,
      title: t('features.academic.academicSearch.title'),
      description: t('features.academic.academicSearch.description'),
      gradient: 'from-teal-500/20 to-teal-500/5',
    },
    {
      icon: Dna,
      title: t('features.academic.immunotherapy.title'),
      description: t('features.academic.immunotherapy.description'),
      gradient: 'from-green-500/20 to-green-500/5',
    },
  ];

  const stats = [
    { value: '95%', label: t('features.stats.accuracy') },
    { value: '10x', label: t('features.stats.efficiency') },
    { value: '50+', label: t('features.stats.agents') },
    { value: '24/7', label: t('features.stats.support') },
  ];

  return (
    <section id="features" className="py-24 bg-black relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="inline-block text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('nav.product')}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('features.title')}
            <span className="text-gradient"> {t('features.titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </AnimatedSection>

        {/* Core Features Grid */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="h-full bg-surface border-border hover:border-primary/50 transition-colors duration-300 group">
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Academic Features Section */}
        <AnimatedSection className="text-center mb-12">
          <motion.span
            className="inline-block text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('features.academic.badge')}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('features.academic.title')}
            <span className="text-gradient"> {t('features.academic.titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('features.academic.subtitle')}
          </p>
        </AnimatedSection>

        {/* Academic Features Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {academicFeatures.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="h-full bg-surface border-border hover:border-primary/50 transition-colors duration-300 group">
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm mb-4">
                      {feature.description}
                    </p>

                    {/* Link */}
                    {feature.link && (
                      <a
                        href={feature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary-light text-sm font-medium transition-colors"
                      >
                        {feature.linkText}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

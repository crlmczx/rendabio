import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Search, CheckCircle, GraduationCap, FileText, Award, FlaskConical, ScrollText } from 'lucide-react';
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
      title: '课题设计',
      description: '博士、硕士研究生课题设计与开题报告撰写，智能体协助确定研究方向、撰写研究背景和意义。',
      gradient: 'from-purple-500/20 to-purple-500/5',
    },
    {
      icon: FlaskConical,
      title: '研究辅助',
      description: '文献综述、实验设计、数据分析、研究方法选择，全流程科研辅助支持。',
      gradient: 'from-amber-500/20 to-amber-500/5',
    },
    {
      icon: Award,
      title: '答辩准备',
      description: '答辩PPT制作、答辩稿撰写、常见问题预测与回答准备，助力顺利通过答辩。',
      gradient: 'from-rose-500/20 to-rose-500/5',
    },
    {
      icon: FileText,
      title: 'SCI论文撰写',
      description: '从选题到发表，智能体协助完成论文结构规划、内容撰写、语言润色、投稿建议。',
      gradient: 'from-cyan-500/20 to-cyan-500/5',
    },
    {
      icon: ScrollText,
      title: '基金标书撰写',
      description: '国家自然科学基金、省市级基金、企业合作项目等各类科研项目申请书撰写。',
      gradient: 'from-indigo-500/20 to-indigo-500/5',
    },
    {
      icon: Search,
      title: '学术搜索',
      description: '跨数据库文献检索、研究热点分析、竞争对手研究、学术趋势预测。',
      gradient: 'from-teal-500/20 to-teal-500/5',
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
            学术研究
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            为科研工作者
            <span className="text-gradient"> 提供专业支持</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            从课题设计到论文发表，全流程AI智能体辅助，让科研更高效
          </p>
        </AnimatedSection>

        {/* Academic Features Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {feature.description}
                    </p>
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

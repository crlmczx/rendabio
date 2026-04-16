import { motion } from 'framer-motion';
import { TrendingUp, FileEdit, Target, BarChart2, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

const useCases = [
  {
    icon: TrendingUp,
    title: '市场研究与行业分析',
    description: '自动收集数据、交叉验证、生成深度研究报告。支持多源信息整合，提供全面的市场洞察和竞争分析。',
    features: ['实时数据收集', '多源交叉验证', '可视化报告', '趋势预测'],
    color: 'from-primary to-primary-dark',
    stats: { value: '10x', label: '研究效率提升' },
  },
  {
    icon: FileEdit,
    title: '内容创作与写作',
    description: '自动规划、检索、起草专业文案或学术论文。从创意构思到最终成稿，全流程 AI 辅助。',
    features: ['智能大纲生成', '多风格写作', '自动引用标注', '质量评估'],
    color: 'from-blue-500 to-blue-700',
    stats: { value: '75%', label: '创作时间节省' },
  },
  {
    icon: Target,
    title: '商业战略规划',
    description: '协调多个智能体完成 SWOT 分析、商业计划书、市场进入策略等复杂商业文档。',
    features: ['SWOT 分析', '竞争策略', '财务预测', '风险评估'],
    color: 'from-purple-500 to-purple-700',
    stats: { value: '95%', label: '方案通过率' },
  },
  {
    icon: BarChart2,
    title: '数据分析与可视化',
    description: '处理复杂数据集，生成清晰可视化图表。支持多种数据源和自定义分析模型。',
    features: ['多数据源接入', '自动清洗', '智能可视化', '洞察提取'],
    color: 'from-emerald-500 to-emerald-700',
    stats: { value: '5min', label: '生成报告时间' },
  },
];

export function UseCases() {
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
            应用场景
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            适用于各种
            <span className="text-gradient"> 业务场景</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            无论您是咨询顾问、市场分析师还是内容创作者，Tends 都能助您一臂之力
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
                    了解更多
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

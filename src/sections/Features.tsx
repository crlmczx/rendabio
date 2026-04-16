import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Search, CheckCircle } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

const features = [
  {
    icon: Users,
    title: '多智能体协作',
    description: '模拟真实团队分工，多个专业智能体协同工作，自动调度完成复杂任务。基于 A2A 协议，智能体之间高效通信。',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Search,
    title: '超级搜写',
    description: '从任务分解、多源检索到结构化生成，提供全链路的搜索与写作工作流。支持实时信息获取和深度研究。',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    icon: CheckCircle,
    title: '实时验证',
    description: '多智能体交叉验证，事实核查，有效抑制幻觉，确保输出准确可靠。所有结论可追溯来源。',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
];

export function Features() {
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
            核心功能
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            为知识工作者
            <span className="text-gradient"> 打造</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            融合 A2A + MCP 双协议，构建下一代多智能体协作平台
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
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

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: '95%', label: '准确率' },
            { value: '10x', label: '效率提升' },
            { value: '50+', label: '专业智能体' },
            { value: '24/7', label: '全天候服务' },
          ].map((stat) => (
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

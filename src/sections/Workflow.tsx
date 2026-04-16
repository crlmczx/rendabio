import { motion } from 'framer-motion';
import { TextCursor, MessageSquare, Users, CheckCircle, FileText } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

const steps = [
  {
    number: '01',
    title: '输入任务',
    description: '描述您的需求或上传文件，用自然语言告诉 RendaBio 您想要完成什么',
    icon: TextCursor,
    color: 'from-primary to-primary-dark',
  },
  {
    number: '02',
    title: '智能分解',
    description: 'AI 自动分解任务并调度最合适的智能体团队',
    icon: MessageSquare,
    color: 'from-blue-500 to-blue-700',
  },
  {
    number: '03',
    title: '并行执行',
    description: '多个专业智能体协同工作，各自发挥所长',
    icon: Users,
    color: 'from-purple-500 to-purple-700',
  },
  {
    number: '04',
    title: '交叉验证',
    description: '结果互相验证，确保准确性和可靠性',
    icon: CheckCircle,
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    number: '05',
    title: '输出成果',
    description: '获得完整、专业的最终报告，可追溯每个决策过程',
    icon: FileText,
    color: 'from-amber-500 to-amber-700',
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="py-24 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="inline-block text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            工作流程
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            简单五步
            <span className="text-gradient"> 完成复杂任务</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            无需学习成本，像与真人团队协作一样简单
          </p>
        </AnimatedSection>

        {/* Steps */}
        <StaggerContainer className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <StaggerItem key={step.number}>
                <motion.div
                  className="relative"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  {/* Step Card */}
                  <div className="bg-surface border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300 group h-full">
                    {/* Number Badge */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Step Number */}
                    <div className="text-4xl font-bold text-white/10 mb-2">
                      {step.number}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow - Desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-full z-10">
                      <motion.div
                        className="text-primary/50"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Demo Preview */}
        <AnimatedSection className="mt-16" delay={0.4}>
          <div className="relative mx-auto max-w-3xl">
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-2xl blur-xl opacity-50" />
            
            {/* Card */}
            <div className="relative bg-surface border border-border rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">U</span>
                </div>
                <div>
                  <div className="text-white font-medium">用户</div>
                  <div className="text-gray-500 text-sm">刚刚</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <p className="text-gray-300">
                  "帮我分析特斯拉 2025 年 Q2 财报，并与比亚迪进行对比分析"
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                RendaBio 正在调度智能体团队...
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

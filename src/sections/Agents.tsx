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

const agents = [
  {
    name: 'Teamo',
    role: '全能指挥官',
    description: '负责任务调度和团队管理，监控执行状态，及时汇报进度',
    icon: Crown,
    color: 'from-primary to-primary-dark',
    featured: true,
  },
  {
    name: 'DeepResearch',
    role: '深度研究员',
    description: '精准搜索和全球信息整合，提供全面详细的研究报告',
    icon: Search,
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Craft',
    role: '内容创作专家',
    description: '媒体内容、创意策划、学术写作，评估和优化创作成果',
    icon: PenTool,
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Analytics',
    role: '数据分析师',
    description: '数据可视化、代码处理、洞察提取，助力数据驱动决策',
    icon: BarChart3,
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    name: 'Brainstorm',
    role: '头脑风暴组长',
    description: '创意思考、策略规划，组织专家智能体进行头脑风暴',
    icon: Lightbulb,
    color: 'from-amber-500 to-amber-700',
  },
  {
    name: 'Claude Code',
    role: '编程专家',
    description: '代码编辑、执行、调试、优化，端到端云端开发体验',
    icon: Code,
    color: 'from-rose-500 to-rose-700',
  },
  {
    name: 'Strategy',
    role: '战略顾问',
    description: '业务战略、商业咨询，深度认知场景的系统化解决方案',
    icon: Target,
    color: 'from-cyan-500 to-cyan-700',
  },
  {
    name: 'Decision',
    role: '决策顾问',
    description: '复杂决策咨询、麦肯锡分析方法，分解和解决决策难题',
    icon: Scale,
    color: 'from-indigo-500 to-indigo-700',
  },
];

export function Agents() {
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
            智能体团队
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            专业智能体
            <span className="text-gradient"> 随时待命</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            每个智能体都是领域专家，协同工作完成复杂任务
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
                          核心
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
            还有更多专业智能体持续加入中...
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

const plans = [
  {
    name: '免费版',
    price: '0',
    period: '月',
    description: '适合个人用户体验',
    features: [
      '基础智能体访问',
      '每日 10 次调用',
      '社区支持',
      '基础模板',
      '标准响应速度',
    ],
    cta: '免费开始',
    ctaVariant: 'outline' as const,
    popular: false,
  },
  {
    name: '专业版',
    price: '99',
    period: '月',
    description: '适合专业用户和小团队',
    features: [
      '全部智能体访问',
      '每日 100 次调用',
      '优先技术支持',
      '自定义模板',
      '快速响应速度',
      'API 访问',
      '团队协作功能',
    ],
    cta: '立即升级',
    ctaVariant: 'default' as const,
    popular: true,
  },
  {
    name: '企业版',
    price: '定制',
    period: '',
    description: '适合大型团队和企业',
    features: [
      '无限调用次数',
      '私有化部署选项',
      '专属客户经理',
      'SLA 服务保障',
      '定制智能体开发',
      '高级安全合规',
      'SSO 单点登录',
    ],
    cta: '联系销售',
    ctaVariant: 'outline' as const,
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-black relative">
      {/* Background */}
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
            定价方案
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            选择适合您的
            <span className="text-gradient"> 方案</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            灵活的定价方案，满足不同规模团队的需求
          </p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <motion.div
                className="h-full"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Card className={`h-full relative bg-surface border-border ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                        <Sparkles className="w-4 h-4" />
                        推荐
                      </div>
                    </div>
                  )}

                  <CardHeader className="pt-8 pb-4">
                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      {plan.price !== '定制' && <span className="text-gray-400 text-lg">¥</span>}
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.period && <span className="text-gray-400">/{plan.period}</span>}
                    </div>
                    <p className="text-gray-500 text-sm">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="pt-4">
                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-primary hover:bg-primary-light text-white'
                          : 'border-gray-600 text-white hover:bg-white/5'
                      }`}
                      variant={plan.ctaVariant}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Note */}
        <AnimatedSection className="text-center mt-12" delay={0.4}>
          <p className="text-gray-500 text-sm">
            所有方案均支持 14 天免费试用，无需信用卡
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

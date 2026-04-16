import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { useTranslation } from 'react-i18next';

export function Pricing() {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('pricing.free.name'),
      price: t('pricing.free.price'),
      period: t('pricing.free.period'),
      description: t('pricing.free.description'),
      features: t('pricing.free.features', { returnObjects: true }) as string[],
      cta: t('pricing.free.cta'),
      ctaVariant: 'outline' as const,
      popular: false,
    },
    {
      name: t('pricing.pro.name'),
      price: t('pricing.pro.price'),
      period: t('pricing.pro.period'),
      description: t('pricing.pro.description'),
      features: t('pricing.pro.features', { returnObjects: true }) as string[],
      cta: t('pricing.pro.cta'),
      ctaVariant: 'default' as const,
      popular: true,
    },
    {
      name: t('pricing.enterprise.name'),
      price: t('pricing.enterprise.price'),
      period: t('pricing.enterprise.period'),
      description: t('pricing.enterprise.description'),
      features: t('pricing.enterprise.features', { returnObjects: true }) as string[],
      cta: t('pricing.enterprise.cta'),
      ctaVariant: 'outline' as const,
      popular: false,
    },
  ];

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
            {t('nav.pricing')}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('pricing.title')}
            <span className="text-gradient"> {t('pricing.titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('pricing.subtitle')}
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
                        {t('pricing.pro.popular')}
                      </div>
                    </div>
                  )}

                  <CardHeader className="pt-8 pb-4">
                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      {plan.price !== t('pricing.enterprise.price') && <span className="text-gray-400 text-lg">¥</span>}
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
            {t('pricing.note')}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

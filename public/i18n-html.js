// HTML 页面国际化脚本 - 完整版 v2
(function() {
  // 完整的翻译字典
  const translations = {
    en: {
      // 页面信息
      'title': 'Teamo Agent - Enterprise AI Multi-Agent Solution',
      'description': 'Teamo Agent is a leading enterprise-grade AI multi-agent platform providing customized solutions for knowledge workers with over 95% accuracy.',

      // 导航栏
      'nav.home': 'Home',
      'nav.features': 'Features',
      'nav.pricing': 'Pricing',
      'nav.docs': 'Docs',
      'nav.login': 'Login',
      'nav.getStarted': 'Get Started',
      'nav.teamoAgent': 'Teamo Agent',

      // Hero 区域
      'hero.title': 'Teamo Agent',
      'hero.subtitle': 'Enterprise AI Multi-Agent Solution',
      'hero.description': 'A leading enterprise-grade AI multi-agent platform providing customized solutions for knowledge workers',

      // 核心优势
      'advantages.title': 'Core Advantages',
      'advantages.1.title': 'Multi-Agent Collaboration',
      'advantages.1.desc': 'Multiple specialized AI agents work together, simulating real team workflows to make complex tasks simple and efficient',
      'advantages.2.title': 'Industry Customization',
      'advantages.2.desc': 'Deeply customized solutions for different industries, precisely matching your business needs',
      'advantages.3.title': 'High Accuracy',
      'advantages.3.desc': '95%+ analysis accuracy with multi-agent verification ensuring output quality',
      'advantages.4.title': 'Efficiency Boost',
      'advantages.4.desc': 'Average 50%-90% efficiency improvement, allowing your team to focus on core business',

      // 十大行业解决方案
      'solutions.title': 'Top 10 Industry Solutions',
      'solutions.1.title': '1. Private Equity',
      'solutions.1.subtitle': 'AI Due Diligence',
      'solutions.1.desc': 'Streamline complex due diligence from 6 weeks to 6 days',
      'solutions.1.efficiency': 'Efficiency Boost: 85% ↓',
      'solutions.2.title': '2. Academic Research',
      'solutions.2.subtitle': 'AI Literature Review',
      'solutions.2.desc': 'From massive literature to comprehensive analysis, complete 200-paper reviews in 48 hours',
      'solutions.2.efficiency': 'Efficiency Boost: 92% ↓',
      'solutions.3.title': '3. SaaS Startups',
      'solutions.3.subtitle': 'AI Market Research',
      'solutions.3.desc': 'From idea to market validation strategy, complete deep research in 72 hours',
      'solutions.3.efficiency': 'Efficiency Boost: 92% ↓',
      'solutions.4.title': '4. Law Firms',
      'solutions.4.subtitle': 'AI Legal Research',
      'solutions.4.desc': 'Transform 40-hour case studies into 4-hour comprehensive analysis',
      'solutions.4.efficiency': 'Efficiency Boost: 90% ↓',
      'solutions.5.title': '5. Investment Advisors',
      'solutions.5.subtitle': 'AI Financial Analysis',
      'solutions.5.desc': 'From manual spreadsheets to AI-verified investment strategies, completed in minutes',
      'solutions.5.efficiency': 'Efficiency Boost: 95%+ ↓',
      'solutions.6.title': '6. B2B Marketing',
      'solutions.6.subtitle': 'AI Content Strategy',
      'solutions.6.desc': 'From quarterly content planning to weekly strategy optimization, real-time generation and evaluation',
      'solutions.6.efficiency': 'Efficiency Boost: 75% ↓',
      'solutions.7.title': '7. Pharmaceutical',
      'solutions.7.subtitle': 'AI Research Verification',
      'solutions.7.desc': 'Accelerate pharmaceutical research verification from months to weeks with 99.5% accuracy',
      'solutions.7.accuracy': 'Accuracy: 99.5%',
      'solutions.8.title': '8. Management Consulting',
      'solutions.8.subtitle': 'AI Strategic Planning',
      'solutions.8.desc': 'Transform 8-week strategic projects into 2-week AI-accelerated insights',
      'solutions.8.efficiency': 'Efficiency Boost: 75% ↓',
      'solutions.9.title': '9. Product Management',
      'solutions.9.subtitle': 'AI Competitive Intelligence',
      'solutions.9.desc': 'Real-time AI-driven competitive intelligence system, never miss competitive moves',
      'solutions.9.efficiency': 'Real-time Monitoring',
      'solutions.10.title': '10. Developer Relations',
      'solutions.10.subtitle': 'AI Technical Writing',
      'solutions.10.desc': 'From code to comprehensive developer documentation, generate high-quality docs in minutes',
      'solutions.10.efficiency': 'Efficiency Boost: 95%+ ↓',

      // 为什么选择
      'why.title': 'Why Choose Teamo Agent?',
      'why.1': '<strong>🔬 Industry Expertise</strong>: Each solution is verified by industry experts, with deep understanding of specific business scenarios and needs',
      'why.1strong': '🔬 Industry Expertise',
      'why.2': '<strong>🤝 Multi-Agent Verification</strong>: Multiple AI agents cross-verify results, effectively suppressing hallucinations and ensuring output accuracy and reliability',
      'why.2strong': '🤝 Multi-Agent Verification',
      'why.3': '<strong>🚀 Efficiency Boost</strong>: Shorten traditional processes by 50%-90%, allowing your team to focus on core business',
      'why.3strong': '🚀 Efficiency Boost',
      'why.4': '<strong>📊 Traceability</strong>: All conclusions are supported by data sources, with complete decision process records for audit and review',
      'why.4strong': '📊 Traceability',
      'why.5': '<strong>🌍 Global Coverage</strong>: Support multiple languages and regions, meeting global business needs of multinational enterprises',
      'why.5strong': '🌍 Global Coverage',

      // 常见问题
      'faq.title': 'FAQ',
      'faq.1.question': '❓ How does Teamo Agent ensure accuracy?',
      'faq.1.answer': 'We use a multi-agent cross-verification mechanism where multiple specialized agents independently analyze same problem, then cross-compare results. This mechanism boosts accuracy to over 95%, far exceeding single-agent solutions.',
      'faq.2.question': '❓ How is data security ensured?',
      'faq.2.answer': 'We adopt enterprise-grade encryption standards and support private deployment. Your data remains under your control at all times, complying with international compliance standards such as GDPR and HIPAA.',
      'faq.3.question': '❓ How to get started?',
      'faq.3.answer': 'Just three simple steps: 1. Register an account 2. Select the suitable industry solution 3. Describe your needs, and AI agents will start working immediately',

      // 客户评价
      'testimonial.title': 'Customer Testimonials',
      'testimonial.1': '"Teamo Agent reduced our due diligence time from 6 weeks to 6 days, with even higher accuracy. This is crucial for us to quickly seize investment opportunities."',
      'testimonial.1author': '— Partner, Private Equity Fund',

      // CTA 区域
      'cta.title': 'Ready to Transform Your Business?',
      'cta.subtitle': 'Join thousands of teams using Teamo Agent to boost productivity',
      'cta.button': 'Get Started Free',

      // 页脚
      'footer.rights': '© 2025 RendaBio. All rights reserved.',
      'footer.status': 'All systems operational',

      // 案例研究页面
      'useCases.hero': 'Teamo Agent Case Studies',
      'useCases.subtitle': 'Real Cases, Real Efficiency',
      'cases.overview': 'Case Overview',
      'useCases.1.title': '1. Private Equity Due Diligence',
      'useCases.1.desc': 'How a top PE firm reduced due diligence time by 85%',
      'useCases.2.title': '2. Academic Literature Review',
      'useCases.2.desc': 'How a research team completed 200-paper reviews in 48 hours',
      'useCases.3.title': '3. SaaS Market Research',
      'useCases.3.desc': 'How a startup completed comprehensive market analysis in 72 hours',
      'useCases.4.title': '4. Legal Case Research',
      'useCases.4.desc': 'How a law firm improved research efficiency by 90%',
      'useCases.5.title': '5. Financial Analysis',
      'useCases.5.desc': 'How investment advisors improved analysis accuracy by 95%+',
      'useCases.6.title': '6. B2B Content Strategy',
      'useCases.6.desc': 'How a marketing team improved content efficiency by 75%',
      'useCases.7.title': '7. Pharmaceutical Research',
      'useCases.7.desc': 'How a pharma company accelerated research with 99.5% accuracy',
      'useCases.8.title': '8. Management Consulting',
      'useCases.8.desc': 'How a consulting firm accelerated strategic planning by 75%',
      'useCases.9.title': '9. Financial Risk Assessment',
      'useCases.9.desc': 'How a financial services firm improved speed by 100x',
      'useCases.10.title': '10. E-commerce Strategy',
      'useCases.10.desc': 'How an e-commerce company reduced time to market by 85%',

      // 语言
      'language.zh': '中文',
      'language.en': 'English'
    },
    zh: {
      // 页面信息
      'title': 'Teamo Agent - AI多智能体企业级解决方案',
      'description': 'Teamo Agent 是领先的企业级AI多智能体平台，为知识工作者提供行业定制的解决方案，准确率达95%以上。',

      // 导航栏
      'nav.home': '首页',
      'nav.features': '功能',
      'nav.pricing': '定价',
      'nav.docs': '文档',
      'nav.login': '登录',
      'nav.getStarted': '开始使用',
      'nav.teamoAgent': 'Teamo Agent',

      // Hero 区域
      'hero.title': 'Teamo Agent',
      'hero.subtitle': 'AI多智能体企业级解决方案',
      'hero.description': '领先的企业级AI多智能体平台，为知识工作者提供行业定制的解决方案',

      // 核心优势
      'advantages.title': '核心优势',
      'advantages.1.title': '多智能体协同',
      'advantages.1.desc': '多个专业化AI智能体分工协作，模拟真实团队工作模式，让复杂任务变得简单高效',
      'advantages.2.title': '行业定制化',
      'advantages.2.desc': '针对不同行业深度定制的解决方案，精准匹配您的业务需求',
      'advantages.3.title': '高准确率',
      'advantages.3.desc': '95%+ 的分析准确率，多智能体验证确保输出质量',
      'advantages.4.title': '效率飞跃',
      'advantages.4.desc': '平均提升 50%-90% 的工作效率，让您的团队专注于核心业务',

      // 十大行业解决方案
      'solutions.title': '十大行业解决方案',
      'solutions.1.title': '1. 私募股权投资',
      'solutions.1.subtitle': 'AI尽职调查',
      'solutions.1.desc': '将复杂的尽职调查流程从6周缩短至6天',
      'solutions.1.efficiency': '效率提升: 85% ↓',
      'solutions.2.title': '2. 学术研究',
      'solutions.2.subtitle': 'AI文献综述',
      'solutions.2.desc': '从海量文献到综合分析，48小时完成200篇论文综述',
      'solutions.2.efficiency': '效率提升: 92% ↓',
      'solutions.3.title': '3. SaaS初创公司',
      'solutions.3.subtitle': 'AI市场研究',
      'solutions.3.desc': '从创意到市场验证策略，72小时完成深度调研',
      'solutions.3.efficiency': '效率提升: 92% ↓',
      'solutions.4.title': '4. 律师事务所',
      'solutions.4.subtitle': 'AI法律研究',
      'solutions.4.desc': '将40小时的案例研究转化为4小时全面分析',
      'solutions.4.efficiency': '效率提升: 90% ↓',
      'solutions.5.title': '5. 投资顾问',
      'solutions.5.subtitle': 'AI财务分析',
      'solutions.5.desc': '从手工电子表格到AI验证的投资策略，分钟级完成',
      'solutions.5.efficiency': '效率提升: 95%+ ↓',
      'solutions.6.title': '6. B2B营销',
      'solutions.6.subtitle': 'AI内容策略',
      'solutions.6.desc': '从季度内容规划到每周策略优化，实时生成评估',
      'solutions.6.efficiency': '效率提升: 75% ↓',
      'solutions.7.title': '7. 制药公司',
      'solutions.7.subtitle': 'AI研究验证',
      'solutions.7.desc': '将制药研究验证从数月缩短至数周，准确率99.5%',
      'solutions.7.accuracy': '准确率: 99.5%',
      'solutions.8.title': '8. 管理咨询',
      'solutions.8.subtitle': 'AI战略规划',
      'solutions.8.desc': '将8周的战略项目转化为2周的AI加速洞察',
      'solutions.8.efficiency': '效率提升: 75% ↓',
      'solutions.9.title': '9. 产品管理',
      'solutions.9.subtitle': 'AI竞争情报',
      'solutions.9.desc': '实时AI驱动的竞争情报系统，永不错过竞争动向',
      'solutions.9.efficiency': '实时监控',
      'solutions.10.title': '10. 开发者关系',
      'solutions.10.subtitle': 'AI技术写作',
      'solutions.10.desc': '从代码到全面开发者文档，分钟级生成高质量文档',
      'solutions.10.efficiency': '效率提升: 95%+ ↓',

      // 为什么选择
      'why.title': '为什么选择 Teamo Agent？',
      'why.1': '<strong>🔬 行业专精</strong>: 每个解决方案都经过行业专家验证，深度理解特定业务场景和需求',
      'why.1strong': '🔬 行业专精',
      'why.2': '<strong>🤝 多智能体验证</strong>: 多个AI智能体交叉验证，有效抑制幻觉，确保输出的准确性和可靠性',
      'why.2strong': '🤝 多智能体验证',
      'why.3': '<strong>🚀 效率飞跃</strong>: 将传统流程缩短50%-90%，让您的团队专注于核心业务',
      'why.3strong': '🚀 效率飞跃',
      'why.4': '<strong>📊 可追溯性</strong>: 所有结论都有数据来源支撑，完整记录决策过程，支持审计和复盘',
      'why.4strong': '📊 可追溯性',
      'why.5': '<strong>🌍 全球覆盖</strong>: 支持多语言、多地区，满足跨国企业的全球化业务需求',
      'why.5strong': '🌍 全球覆盖',

      // 常见问题
      'faq.title': '常见问题',
      'faq.1.question': '❓ Teamo Agent 如何保证准确性？',
      'faq.1.answer': '我们采用多智能体交叉验证机制，多个专业智能体独立分析同一问题，然后交叉比对结果。这种机制将准确率提升至95%以上，远高于单智能体方案。',
      'faq.2.question': '❓ 数据安全如何保障？',
      'faq.2.answer': '我们采用企业级加密标准，支持私有化部署。您的数据始终在您的控制之下，符合 GDPR、HIPAA 等国际合规标准。',
      'faq.3.question': '❓ 如何开始使用？',
      'faq.3.answer': '只需简单三步：1. 注册账号 2. 选择适合的行业解决方案 3. 描述您的需求，AI智能体即刻开始工作',

      // 客户评价
      'testimonial.title': '客户评价',
      'testimonial.1': '"Teamo Agent 将我们的尽职调查时间从6周缩短到6天，而且准确率反而更高。这对于我们快速抓住投资机会至关重要。"',
      'testimonial.1author': '—— 某私募股权基金合伙人',

      // CTA 区域
      'cta.title': '准备改变您的业务？',
      'cta.subtitle': '加入数千个使用 Teamo Agent 提升生产力的团队',
      'cta.button': '免费开始',

      // 页脚
      'footer.rights': '© 2025 RendaBio. 保留所有权利。',
      'footer.status': '所有系统运行正常',

      // 案例研究页面
      'useCases.hero': 'Teamo Agent 案例研究',
      'useCases.subtitle': '真实案例，真实效率',
      'cases.overview': '案例概览',
      'useCases.1.title': '1. 私募股权尽职调查',
      'useCases.1.desc': '顶级PE公司如何将尽职调查时间缩短85%',
      'useCases.2.title': '2. 学术文献综述',
      'useCases.2.desc': '研究团队如何在48小时内完成200篇论文综述',
      'useCases.3.title': '3. SaaS市场调研',
      'useCases.3.desc': '初创公司如何在72小时内完成全面市场分析',
      'useCases.4.title': '4. 法律案例研究',
      'useCases.4.desc': '律师事务所如何将研究效率提升90%',
      'useCases.5.title': '5. 财务分析',
      'useCases.5.desc': '投资顾问如何将分析准确率提升95%+',
      'useCases.6.title': '6. B2B内容策略',
      'useCases.6.desc': '营销团队如何将内容效率提升75%',
      'useCases.7.title': '7. 制药研究',
      'useCases.7.desc': '制药公司如何以99.5%准确率加速研究',
      'useCases.8.title': '8. 管理咨询',
      'useCases.8.desc': '咨询公司如何将战略规划加速75%',
      'useCases.9.title': '9. 金融风险评估',
      'useCases.9.desc': '金融服务公司如何将速度提升100倍',
      'useCases.10.title': '10. 电商策略',
      'useCases.10.desc': '电商公司如何将上市时间缩短85%',

      // 语言
      'language.zh': '中文',
      'language.en': 'English'
    }
  };

  // 获取当前语言
  function getCurrentLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && (langParam === 'en' || langParam === 'zh')) {
      return langParam;
    }

    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang && (storedLang === 'en' || storedLang === 'zh')) {
      return storedLang;
    }

    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
      return 'en';
    }

    return 'zh';
  }

  // 更新页面内容的函数
  function updateContent() {
    const lang = getCurrentLanguage();
    const t = translations[lang];

    if (t.title) {
      document.title = t.title;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.description) {
      metaDesc.setAttribute('content', t.description);
    }

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (t[key]) {
        element.innerHTML = t[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        element.setAttribute('placeholder', t[key]);
      }
    });

    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
      const zhLink = langSwitcher.querySelector('a[data-i18n="language.zh"]');
      const enLink = langSwitcher.querySelector('a[data-i18n="language.en"]');

      if (zhLink && enLink) {
        zhLink.className = lang === 'zh' ? 'active' : '';
        enLink.className = lang === 'en' ? 'active' : '';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateContent();
    window.addEventListener('popstate', updateContent);
    window.addEventListener('storage', function(e) {
      if (e.key === 'i18nextLng') {
        updateContent();
      }
    });
  });

  window.switchLanguage = function(lang) {
    localStorage.setItem('i18nextLng', lang);
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);
    updateContent();
  };
})();

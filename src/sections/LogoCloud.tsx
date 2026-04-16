import { motion } from 'framer-motion';
import { Building2, Briefcase, GraduationCap, LineChart, Code2, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const brands = [
  { name: 'TechCorp', icon: Building2 },
  { name: 'InnovateLab', icon: Briefcase },
  { name: 'EduTech', icon: GraduationCap },
  { name: 'FinancePro', icon: LineChart },
  { name: 'DevStudio', icon: Code2 },
  { name: 'GlobalNet', icon: Globe },
];

export function LogoCloud() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          className="text-center text-gray-500 text-sm mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('logos.title')}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer group"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <brand.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
              <span className="font-medium">{brand.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

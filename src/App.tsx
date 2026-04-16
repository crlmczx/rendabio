import { Navbar } from '@/components/Navbar';
import { Hero } from '@/sections/Hero';
import { LogoCloud } from '@/sections/LogoCloud';
import { Features } from '@/sections/Features';
import { Agents } from '@/sections/Agents';
import { Workflow } from '@/sections/Workflow';
import { UseCases } from '@/sections/UseCases';
import { Pricing } from '@/sections/Pricing';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <Agents />
        <Workflow />
        <UseCases />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;

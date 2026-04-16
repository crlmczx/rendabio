import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
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
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Dashboard } from '@/pages/Dashboard';
import { Articles } from '@/pages/Articles';
import { CreateArticle } from '@/pages/CreateArticle';
import { Files } from '@/pages/Files';
import { Settings } from '@/pages/Settings';
import { About } from '@/pages/About';
import { SearchPage } from '@/pages/Search';

// 首页组件
function Home() {
  return (
    <>
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
    </>
  );
}

// 受保护的路由组件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// 公开路由（已登录用户重定向到仪表盘）
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<SearchPage />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/articles" 
        element={
          <ProtectedRoute>
            <Articles />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/articles/create" 
        element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/articles/:id/edit" 
        element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/files" 
        element={
          <ProtectedRoute>
            <Files />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Programs from '@/components/Programs';
import Events from '@/components/Events';
import Resources from '@/components/Resources';
import Startups from '@/components/Startups';
import Collaboration from '@/components/Collaboration';
import Impact from '@/components/Impact';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import ProgramDetail from '@/pages/ProgramDetail';
import ResourcesDetail from '@/pages/ResourcesDetail';
import StartupStory from '@/pages/StartupStory';
import EventRegister from '@/pages/EventRegister';
import OurTeam from '@/pages/OurTeam';
import ProjectApplication from '@/pages/ProjectApplication';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingShapes from '@/components/FloatingShapes';
import FeedbackWidget from '@/components/hcd/FeedbackWidget';
import ThemeConfig from '@/components/ThemeConfig';

import { AuthService } from '@/core/services/AuthService';

const MainLayout = ({ onLoginClick, isAuthenticated }) => (
  <>
    <Helmet>
      <title>Y4C Innovation Lab - Empowering Youth for Tomorrow</title>
      <meta name="description" content="Youth For Children Innovation Lab - Empowering young minds through programs, events, resources, and collaboration opportunities." />
    </Helmet>
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={onLoginClick} isAuthenticated={isAuthenticated} />
      <main className="flex-grow">
        <Hero />
        <About />
        <Partners />
        <Programs />
        <Events />
        <Resources />
        <Startups />
        <Collaboration />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </div>
  </>
);

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = AuthService.getCurrentUser();
    return !!user;
  });

  // Sync authentication state
  React.useEffect(() => {
    const checkAuth = () => {
      const user = AuthService.getCurrentUser();
      setIsAuthenticated(!!user);
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await AuthService.login(credentials.email, credentials.password);
      if (user) {
        setIsAuthenticated(true);
        setShowLogin(false);
        // Add a small delay to ensure state propagates before navigation
        return true;
      }
    } catch (error) {
      console.error('Login failed', error);
    }
    return false;
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <HelmetProvider>
      <Router>
        <ThemeConfig />
        <FloatingShapes />
        <ScrollToTop />
        <FeedbackWidget />
        <Routes>
          <Route path="/" element={<MainLayout onLoginClick={() => setShowLogin(true)} isAuthenticated={isAuthenticated} />} />
          <Route path="/program/:id" element={<ProgramDetail />} />
          <Route path="/program" element={<ProgramDetail />} />
          <Route path="/resource/:id" element={<ResourcesDetail />} />
          <Route path="/startup/:id" element={<StartupStory />} />
          <Route path="/register/:eventId" element={<EventRegister />} />
          <Route path="/propose" element={<ProjectApplication />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/dashboard" element={
            isAuthenticated ? (
              <>
                <Helmet>
                  <title>Dashboard - Y4C Innovation Lab</title>
                  <meta name="description" content="Youth For Children Innovation Lab admin dashboard for managing programs, events, and resources." />
                </Helmet>
                <Dashboard onLogout={handleLogout} />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {showLogin && (
          <>
            <Helmet>
              <title>Login - Y4C Innovation Lab</title>
              <meta name="description" content="Login to Youth For Children Innovation Lab admin dashboard." />
            </Helmet>
            <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />
          </>
        )}

        <Toaster />
      </Router>
    </HelmetProvider>
  );
}

export default App;

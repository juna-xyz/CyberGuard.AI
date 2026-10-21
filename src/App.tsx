import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DashboardScreen } from './components/features/dashboard/DashboardScreen';
import { AnalyzerScreen } from './components/features/analyzer/AnalyzerScreen';
import { QuizScreen } from './components/features/quiz/QuizScreen';

export const App: React.FC = () => {
  // Parsing rute awal dari pathname atau hash
  const getInitialTab = (): ActiveTab => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/analyzer' || hash === '#/analyzer') return 'analyzer';
    if (path === '/quiz' || hash === '#/quiz') return 'quiz';
    return 'dashboard';
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab);

  // Sinkronisasi navigasi peramban (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTab());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    const targetPath = tab === 'dashboard' ? '/' : `/${tab}`;
    window.history.pushState(null, '', targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header activeTab={activeTab} onNavigate={handleNavigate} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'dashboard' && <DashboardScreen onNavigate={handleNavigate} />}
        {activeTab === 'analyzer' && <AnalyzerScreen />}
        {activeTab === 'quiz' && <QuizScreen onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
export default App;

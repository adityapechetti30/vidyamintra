
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import LearningRoadmap from './components/LearningRoadmap';
import SkillQuiz from './components/SkillQuiz';
import MockInterview from './components/MockInterview';
import Auth from './components/Auth';
import ChatBot from './components/ChatBot';
import { UserProfile, DashboardStats } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<UserProfile | null>(null);

  const [stats] = useState<DashboardStats>({
    learningProgress: 65,
    interviewScore: 82,
    quizAverage: 78,
    applicationsSent: 12,
  });

  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleUpdateUser = (data: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  if (!isLoggedIn || !user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} stats={stats} />;
      case 'resume':
        return <ResumeAnalyzer user={user} onUpdateUser={handleUpdateUser} />;
      case 'roadmap':
        return <LearningRoadmap user={user} />;
      case 'quiz':
        return <SkillQuiz user={user} />;
      case 'interview':
        return <MockInterview user={user} />;
      default:
        return <Dashboard user={user} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 min-h-screen transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <ChatBot user={user} />
    </div>
  );
};

export default App;

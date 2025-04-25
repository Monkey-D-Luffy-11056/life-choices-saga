
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { User, Building2, Heart, Smartphone, Activity, Wallet } from 'lucide-react';

// Tab type
interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Tab component
const GameTabs = () => {
  const { gameState, setTab } = useGame();
  const { currentTab } = gameState;

  // Tab data
  const tabs: TabData[] = [
    { id: 'self', label: 'Moi', icon: <User size={24} /> },
    { id: 'education-work', label: 'École/Travail', icon: <Building2 size={24} /> },
    { id: 'relationships', label: 'Relations', icon: <Heart size={24} /> },
    { id: 'activities', label: 'Activités', icon: <Smartphone size={24} /> },
    { id: 'health', label: 'Santé', icon: <Activity size={24} /> },
    { id: 'money', label: 'Argent', icon: <Wallet size={24} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-1 z-10">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`game-tab ${currentTab === tab.id ? 'game-tab-active' : ''}`}
            onClick={() => setTab(tab.id as any)}
            aria-label={tab.label}
          >
            <div>{tab.icon}</div>
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameTabs;

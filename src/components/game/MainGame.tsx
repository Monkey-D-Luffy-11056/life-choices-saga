
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import GameTabs from './GameTabs';
import EventPopup from './EventPopup';
import SelfTab from './tabs/SelfTab';
import EducationWorkTab from './tabs/EducationWorkTab';
import RelationshipsTab from './tabs/RelationshipsTab';
import ActivitiesTab from './tabs/ActivitiesTab';
import HealthTab from './tabs/HealthTab';
import MoneyTab from './tabs/MoneyTab';

const MainGame = () => {
  const { gameState } = useGame();
  const { currentTab, character } = gameState;

  if (!character) return null;

  // Render the current tab
  const renderTab = () => {
    switch (currentTab) {
      case 'self':
        return <SelfTab />;
      case 'education-work':
        return <EducationWorkTab />;
      case 'relationships':
        return <RelationshipsTab />;
      case 'activities':
        return <ActivitiesTab />;
      case 'health':
        return <HealthTab />;
      case 'money':
        return <MoneyTab />;
      default:
        return <SelfTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Bar */}
      <div className="bg-game-primary text-white p-3 flex justify-between items-center">
        <div className="font-medium">{character.firstName} {character.lastName}</div>
        <div>{character.age} ans</div>
      </div>
      
      {/* Main Content */}
      <div className="min-h-[calc(100vh-120px)]">
        {renderTab()}
      </div>
      
      {/* Navigation Tabs */}
      <GameTabs />
      
      {/* Event Popup */}
      <EventPopup />
    </div>
  );
};

export default MainGame;

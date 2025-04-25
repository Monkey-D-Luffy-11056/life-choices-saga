
import React from 'react';
import { GameProvider } from '@/contexts/GameContext';
import { useGame } from '@/contexts/GameContext';
import SplashScreen from '@/components/game/SplashScreen';
import CharacterCreation from '@/components/game/CharacterCreation';
import MainGame from '@/components/game/MainGame';

// Game wrapper component
const GameWrapper = () => {
  const { gameState } = useGame();
  const { currentScreen } = gameState;

  // Render based on current screen
  switch (currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'create-character':
      return <CharacterCreation />;
    case 'main-game':
      return <MainGame />;
    default:
      return <SplashScreen />;
  }
};

// Main index component
const Index = () => {
  return (
    <GameProvider>
      <GameWrapper />
    </GameProvider>
  );
};

export default Index;

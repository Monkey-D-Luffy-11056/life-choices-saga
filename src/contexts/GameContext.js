import React, { createContext, useContext, useState, useCallback } from 'react';

const DEFAULT_STATS = {
  happiness: 50,
  health: 50,
  intelligence: 50,
  popularity: 50,
  wealth: 0,
};

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    character: null,
    currentScreen: 'splash',
    currentTab: 'self',
    currentEvent: null,
    gameYear: new Date().getFullYear(),
  });

  const createCharacter = useCallback((
    firstName,
    lastName,
    gender,
    birthDate,
    traits
  ) => {
    const newCharacter = {
      firstName,
      lastName,
      gender,
      birthDate,
      traits,
      stats: DEFAULT_STATS,
      age: 13,
      money: 0,
      education: {
        level: 'middle',
        grades: 75,
      },
      job: null,
      relationships: [
        {
          id: '1',
          name: 'Mom',
          type: 'parent',
          level: 75,
        },
        {
          id: '2',
          name: 'Dad',
          type: 'parent',
          level: 75,
        },
      ],
    };

    setGameState(prev => ({
      ...prev,
      character: newCharacter,
      currentScreen: 'main-game',
    }));
  }, []);

  const setScreen = useCallback((screen) => {
    setGameState(prev => ({
      ...prev,
      currentScreen: screen,
    }));
  }, []);

  const setTab = useCallback((tab) => {
    setGameState(prev => ({
      ...prev,
      currentTab: tab,
    }));
  }, []);

  const triggerEvent = useCallback((event) => {
    setGameState(prev => ({
      ...prev,
      currentEvent: event,
    }));
  }, []);

  const dismissEvent = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentEvent: null,
    }));
  }, []);

  const updateStat = useCallback((stat, value) => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;

      const newValue = Math.max(0, Math.min(100, prev.character.stats[stat] + value));

      return {
        ...prev,
        character: {
          ...prev.character,
          stats: {
            ...prev.character.stats,
            [stat]: newValue,
          },
        },
      };
    });
  }, [gameState.character]);

  const addMoney = useCallback((amount) => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;

      return {
        ...prev,
        character: {
          ...prev.character,
          money: prev.character.money + amount,
        },
      };
    });
  }, [gameState.character]);

  const ageUp = useCallback(() => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;

      return {
        ...prev,
        character: {
          ...prev.character,
          age: prev.character.age + 1,
        },
        gameYear: prev.gameYear + 1,
      };
    });
  }, [gameState.character]);

  const value = {
    gameState,
    createCharacter,
    setScreen: screen => setGameState(prev => ({ ...prev, currentScreen: screen })),
    setTab: tab => setGameState(prev => ({ ...prev, currentTab: tab })),
    triggerEvent: event => setGameState(prev => ({ ...prev, currentEvent: event })),
    dismissEvent: () => setGameState(prev => ({ ...prev, currentEvent: null })),
    updateStat,
    addMoney,
    ageUp,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

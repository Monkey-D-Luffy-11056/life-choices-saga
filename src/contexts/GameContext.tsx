
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// Character types
type Gender = 'male' | 'female' | 'non-binary';
type Trait = 'intelligent' | 'athletic' | 'charismatic' | 'rebellious' | 'kind' | 'creative' | 'ambitious';

// Character stats
interface Stats {
  happiness: number;
  health: number;
  intelligence: number;
  popularity: number;
  wealth: number;
}

// Relationship
interface Relationship {
  id: string;
  name: string;
  type: 'parent' | 'sibling' | 'friend' | 'romantic' | 'teacher' | 'colleague';
  level: number; // 0-100
}

// Character
interface Character {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  traits: Trait[];
  stats: Stats;
  age: number;
  money: number;
  education: {
    level: 'primary' | 'middle' | 'high' | 'university' | 'none';
    grades: number; // 0-100
  };
  job: {
    title: string;
    company: string;
    salary: number;
    satisfaction: number; // 0-100
  } | null;
  relationships: Relationship[];
}

// Event choice
interface EventChoice {
  id: string;
  text: string;
  emoji: string;
  action: () => void;
}

// Event
interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
}

// Game state
interface GameState {
  character: Character | null;
  currentScreen: 'splash' | 'create-character' | 'main-game';
  currentTab: 'self' | 'education-work' | 'relationships' | 'activities' | 'health' | 'money';
  currentEvent: GameEvent | null;
  gameYear: number;
}

// Context value
interface GameContextValue {
  gameState: GameState;
  createCharacter: (firstName: string, lastName: string, gender: Gender, birthDate: Date, traits: Trait[]) => void;
  setScreen: (screen: GameState['currentScreen']) => void;
  setTab: (tab: GameState['currentTab']) => void;
  triggerEvent: (event: GameEvent) => void;
  dismissEvent: () => void;
  updateStat: (stat: keyof Stats, value: number) => void;
  addMoney: (amount: number) => void;
  ageUp: () => void;
}

// Default stats
const DEFAULT_STATS: Stats = {
  happiness: 50,
  health: 50,
  intelligence: 50,
  popularity: 50,
  wealth: 0,
};

// Create context
const GameContext = createContext<GameContextValue | undefined>(undefined);

// Provider component
export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    character: null,
    currentScreen: 'splash',
    currentTab: 'self',
    currentEvent: null,
    gameYear: new Date().getFullYear(),
  });

  // Create a new character
  const createCharacter = useCallback((
    firstName: string,
    lastName: string,
    gender: Gender,
    birthDate: Date,
    traits: Trait[]
  ) => {
    const newCharacter: Character = {
      firstName,
      lastName,
      gender,
      birthDate,
      traits,
      stats: DEFAULT_STATS,
      age: 13, // Start as teenager
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

  // Set screen
  const setScreen = useCallback((screen: GameState['currentScreen']) => {
    setGameState(prev => ({
      ...prev,
      currentScreen: screen,
    }));
  }, []);

  // Set tab
  const setTab = useCallback((tab: GameState['currentTab']) => {
    setGameState(prev => ({
      ...prev,
      currentTab: tab,
    }));
  }, []);

  // Trigger event
  const triggerEvent = useCallback((event: GameEvent) => {
    setGameState(prev => ({
      ...prev,
      currentEvent: event,
    }));
  }, []);

  // Dismiss event
  const dismissEvent = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentEvent: null,
    }));
  }, []);

  // Update stat
  const updateStat = useCallback((stat: keyof Stats, value: number) => {
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

  // Add money
  const addMoney = useCallback((amount: number) => {
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

  // Age up
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

  // Context value
  const value = {
    gameState,
    createCharacter,
    setScreen,
    setTab,
    triggerEvent,
    dismissEvent,
    updateStat,
    addMoney,
    ageUp,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Hook for using the context
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

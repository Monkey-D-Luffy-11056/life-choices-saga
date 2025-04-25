
import React, { createContext, useContext, useState, useCallback } from 'react';

const DEFAULT_STATS = {
  happiness: 50,
  health: 50,
  intelligence: 50,
  popularity: 50,
  wealth: 0,
};

const DEFAULT_EVENTS = [
  {
    id: 'school-exam',
    title: 'Examen Scolaire',
    description: 'Un examen important approche. Comment veux-tu te préparer?',
    triggers: ['education'],
    minAge: 13,
    maxAge: 22,
    choices: [
      {
        id: 'study-hard',
        text: 'Étudier intensément',
        emoji: '📚',
        results: {
          stats: { intelligence: 5, happiness: -2, health: -1 },
          probability: { grades: { high: 80, medium: 15, low: 5 } }
        },
      },
      {
        id: 'balanced',
        text: 'Préparation équilibrée',
        emoji: '⚖️',
        results: {
          stats: { intelligence: 3, health: 0, happiness: 0 },
          probability: { grades: { high: 60, medium: 30, low: 10 } }
        },
      },
      {
        id: 'cram',
        text: 'Réviser à la dernière minute',
        emoji: '⏰',
        results: {
          stats: { intelligence: 1, happiness: 0, health: 0 },
          probability: { grades: { high: 30, medium: 40, low: 30 } }
        },
      },
    ],
  },
  {
    id: 'friend-party',
    title: 'Invitation à une Fête',
    description: 'Un ami t\'invite à une fête ce weekend. Que fais-tu?',
    triggers: ['social', 'weekend'],
    minAge: 13,
    maxAge: 30,
    choices: [
      {
        id: 'go-party',
        text: 'Y aller et faire la fête',
        emoji: '🎉',
        results: {
          stats: { happiness: 5, popularity: 3, health: -1 },
          probability: { 
            makeFriends: 70,
            troubleEvent: 20
          }
        },
      },
      {
        id: 'go-moderate',
        text: 'Y aller mais rester raisonnable',
        emoji: '😎',
        results: {
          stats: { happiness: 3, popularity: 2, health: 0 },
          probability: { 
            makeFriends: 50,
            troubleEvent: 5
          }
        },
      },
      {
        id: 'stay-home',
        text: 'Rester à la maison',
        emoji: '🏠',
        results: {
          stats: { happiness: -1, popularity: -1, health: 1, intelligence: 1 },
          probability: { 
            makeFriends: 0,
            troubleEvent: 0
          }
        },
      },
    ],
  },
  {
    id: 'job-offer',
    title: 'Offre d\'emploi',
    description: 'Tu as reçu une offre d\'emploi. Que décides-tu?',
    triggers: ['career', 'yearly'],
    minAge: 18,
    maxAge: 65,
    choices: [
      {
        id: 'accept-job',
        text: 'Accepter l\'offre',
        emoji: '💼',
        results: {
          stats: { wealth: 5, happiness: 2 },
          job: true
        },
      },
      {
        id: 'negotiate',
        text: 'Négocier un meilleur salaire',
        emoji: '💰',
        results: {
          stats: { wealth: 7, happiness: 3 },
          probability: { jobSuccess: 50 }
        },
      },
      {
        id: 'decline',
        text: 'Décliner l\'offre',
        emoji: '❌',
        results: {
          stats: { wealth: -1, happiness: -1 },
          job: false
        },
      },
    ],
  }
];

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    character: null,
    currentScreen: 'splash',
    currentTab: 'self',
    currentEvent: null,
    gameYear: new Date().getFullYear(),
    eventHistory: [],
    availableEvents: [...DEFAULT_EVENTS],
    relationships: [],
    achievements: [],
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
      inventory: [],
      skills: [
        { name: 'cooking', level: 10 },
        { name: 'sports', level: 20 },
        { name: 'art', level: 15 },
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

  const updateRelationship = useCallback((relationshipId, changeValue) => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;
      
      const updatedRelationships = prev.character.relationships.map(rel => {
        if (rel.id === relationshipId) {
          const newLevel = Math.max(0, Math.min(100, rel.level + changeValue));
          return { ...rel, level: newLevel };
        }
        return rel;
      });

      return {
        ...prev,
        character: {
          ...prev.character,
          relationships: updatedRelationships
        }
      };
    });
  }, [gameState.character]);

  const addRelationship = useCallback((newRelation) => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;

      return {
        ...prev,
        character: {
          ...prev.character,
          relationships: [...prev.character.relationships, newRelation]
        }
      };
    });
  }, [gameState.character]);

  const updateSkill = useCallback((skillName, amount) => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;
      
      const existingSkillIndex = prev.character.skills.findIndex(s => s.name === skillName);
      
      let updatedSkills;
      if (existingSkillIndex >= 0) {
        updatedSkills = [...prev.character.skills];
        updatedSkills[existingSkillIndex] = {
          ...updatedSkills[existingSkillIndex],
          level: Math.min(100, Math.max(0, updatedSkills[existingSkillIndex].level + amount))
        };
      } else {
        updatedSkills = [
          ...prev.character.skills,
          { name: skillName, level: Math.min(100, Math.max(0, amount)) }
        ];
      }
      
      return {
        ...prev,
        character: {
          ...prev.character,
          skills: updatedSkills
        }
      };
    });
  }, [gameState.character]);

  const updateEducation = useCallback((changes) => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;

      return {
        ...prev,
        character: {
          ...prev.character,
          education: {
            ...prev.character.education,
            ...changes
          }
        }
      };
    });
  }, [gameState.character]);

  const setJob = useCallback((job) => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;

      return {
        ...prev,
        character: {
          ...prev.character,
          job
        }
      };
    });
  }, [gameState.character]);

  const addToInventory = useCallback((item) => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;

      return {
        ...prev,
        character: {
          ...prev.character,
          inventory: [...prev.character.inventory, item]
        }
      };
    });
  }, [gameState.character]);

  const removeFromInventory = useCallback((itemId) => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;

      return {
        ...prev,
        character: {
          ...prev.character,
          inventory: prev.character.inventory.filter(item => item.id !== itemId)
        }
      };
    });
  }, [gameState.character]);

  const addAchievement = useCallback((achievement) => {
    setGameState(prev => ({
      ...prev,
      achievements: [...prev.achievements, {
        ...achievement,
        dateUnlocked: new Date()
      }]
    }));
  }, []);

  const ageUp = useCallback(() => {
    if (!gameState.character) return;

    setGameState(prev => {
      if (!prev.character) return prev;

      const newAge = prev.character.age + 1;
      let newEducationLevel = prev.character.education.level;
      
      // Update education level based on age
      if (newAge === 15 && newEducationLevel === 'middle') {
        newEducationLevel = 'high';
      } else if (newAge === 18 && newEducationLevel === 'high') {
        newEducationLevel = 'university';
      } else if (newAge === 22 && newEducationLevel === 'university') {
        newEducationLevel = 'graduate';
      }
      
      // Random event on birthday
      const randomEvent = prev.availableEvents.find(event => 
        event.minAge <= newAge && event.maxAge >= newAge && 
        Math.random() > 0.5
      );

      return {
        ...prev,
        character: {
          ...prev.character,
          age: newAge,
          education: {
            ...prev.character.education,
            level: newEducationLevel
          }
        },
        gameYear: prev.gameYear + 1,
        currentEvent: randomEvent || null
      };
    });
  }, [gameState.character]);

  const value = {
    gameState,
    createCharacter,
    setScreen,
    setTab,
    triggerEvent,
    dismissEvent,
    updateStat,
    addMoney,
    updateRelationship,
    addRelationship,
    updateSkill,
    updateEducation,
    setJob,
    addToInventory,
    removeFromInventory,
    addAchievement,
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

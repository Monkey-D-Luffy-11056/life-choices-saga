
import React from 'react';
import { useGame } from '../../../contexts/GameContext';
import StatusBar from '../StatusBar';
import { Activity, Heart, Brain, Dumbbell, Utensils, Moon, Cigarette, Wine, Pills } from 'lucide-react';

const HealthTab = () => {
  const { gameState, updateStat, triggerEvent } = useGame();
  const { character } = gameState;

  if (!character) return null;

  // Health conditions (would be tracked in character state in a full implementation)
  const healthConditions = [];
  
  // Check for potential health conditions based on stats
  React.useEffect(() => {
    if (character && character.stats) {
      // We would track health conditions here in a full implementation
    }
  }, [character]);

  // Health event handlers
  const handleExerciseEvent = () => {
    triggerEvent({
      id: 'exercise-event',
      title: 'Faire du Sport',
      description: 'Quel type d\'exercice veux-tu faire?',
      choices: [
        {
          id: 'cardio',
          text: 'Cardio (Courir, Vélo)',
          emoji: '🏃',
          action: () => {
            updateStat('health', 5);
            updateStat('happiness', 2);
            
            // Special outcome for low health
            if (character.stats.health < 30) {
              triggerEvent({
                id: 'exercise-strain',
                title: 'Effort Trop Important',
                description: 'Tu n\'étais pas en assez bonne forme pour cet exercice intense. Tu te sens épuisé(e).',
                choices: [
                  {
                    id: 'rest',
                    text: 'Se reposer',
                    emoji: '😓',
                    action: () => {
                      updateStat('health', -1);
                    },
                  }
                ],
              });
            }
          },
        },
        {
          id: 'strength',
          text: 'Musculation',
          emoji: '💪',
          action: () => {
            updateStat('health', 4);
            updateStat('happiness', 1);
          },
        },
        {
          id: 'team-sport',
          text: 'Sport d\'équipe',
          emoji: '⚽',
          action: () => {
            updateStat('health', 3);
            updateStat('happiness', 4);
            updateStat('popularity', 2);
            
            // Chance of making a new friend
            if (Math.random() < 0.3) {
              triggerEvent({
                id: 'sports-friend',
                title: 'Nouvelle Connaissance',
                description: 'Tu t\'es bien entendu(e) avec quelqu\'un de ton équipe et vous avez échangé vos contacts.',
                choices: [
                  {
                    id: 'great',
                    text: 'Super!',
                    emoji: '😊',
                    action: () => {
                      updateStat('happiness', 2);
                    },
                  }
                ],
              });
            }
          },
        },
        {
          id: 'yoga',
          text: 'Yoga / Étirements',
          emoji: '🧘',
          action: () => {
            updateStat('health', 3);
            updateStat('happiness', 3);
            updateStat('intelligence', 1);
          },
        },
      ],
    });
  };

  const handleMeditateEvent = () => {
    triggerEvent({
      id: 'meditate-event',
      title: 'Méditer',
      description: 'Comment veux-tu méditer?',
      choices: [
        {
          id: 'guided',
          text: 'Méditation guidée',
          emoji: '🧘',
          action: () => {
            updateStat('health', 2);
            updateStat('happiness', 3);
            updateStat('intelligence', 1);
          },
        },
        {
          id: 'silent',
          text: 'Méditation silencieuse',
          emoji: '😌',
          action: () => {
            updateStat('health', 1);
            updateStat('happiness', 4);
            
            // Special outcome for high intelligence
            if (character.stats.intelligence > 70) {
              updateStat('intelligence', 2);
              triggerEvent({
                id: 'deep-insight',
                title: 'Réflexion Profonde',
                description: 'Ta méditation t\'a conduit à des réflexions profondes sur ta vie et tes objectifs.',
                choices: [
                  {
                    id: 'journal',
                    text: 'Noter ces réflexions',
                    emoji: '📝',
                    action: () => {
                      updateStat('intelligence', 1);
                    },
                  }
                ],
              });
            }
          },
        },
        {
          id: 'yoga',
          text: 'Yoga',
          emoji: '🧘‍♀️',
          action: () => {
            updateStat('health', 3);
            updateStat('happiness', 2);
          },
        },
      ],
    });
  };

  const handleDoctorEvent = () => {
    triggerEvent({
      id: 'doctor-event',
      title: 'Aller chez le Médecin',
      description: 'Pour quelle raison vas-tu chez le médecin?',
      choices: [
        {
          id: 'check-up',
          text: 'Check-up de routine',
          emoji: '🩺',
          action: () => {
            updateStat('health', 3);
            
            // Potential health discovery
            if (character.stats.health < 40 && Math.random() < 0.5) {
              triggerEvent({
                id: 'health-issue',
                title: 'Problème de Santé Détecté',
                description: 'Le médecin a détecté un problème de santé qui nécessite attention. Il te prescrit un traitement.',
                choices: [
                  {
                    id: 'follow-treatment',
                    text: 'Suivre le traitement',
                    emoji: '💊',
                    action: () => {
                      updateStat('health', 10);
                    },
                  },
                  {
                    id: 'ignore-treatment',
                    text: 'Ignorer le traitement',
                    emoji: '🙄',
                    action: () => {
                      updateStat('health', -5);
                    },
                  }
                ],
              });
            }
          },
        },
        {
          id: 'sick',
          text: 'Je ne me sens pas bien',
          emoji: '🤒',
          action: () => {
            updateStat('health', 5);
            updateStat('happiness', 1);
            
            triggerEvent({
              id: 'doctor-diagnosis',
              title: 'Diagnostic du Médecin',
              description: 'Le médecin t\'examine et te prescrit des médicaments pour te soigner.',
              choices: [
                {
                  id: 'take-meds',
                  text: 'Prendre les médicaments',
                  emoji: '💊',
                  action: () => {
                    updateStat('health', 5);
                  },
                },
                {
                  id: 'natural-healing',
                  text: 'Se soigner naturellement',
                  emoji: '🌿',
                  action: () => {
                    updateStat('health', 2);
                  },
                }
              ],
            });
          },
        },
        {
          id: 'mental',
          text: 'Problèmes de santé mentale',
          emoji: '🧠',
          action: () => {
            updateStat('health', 2);
            updateStat('happiness', 4);
            
            triggerEvent({
              id: 'therapy-recommendation',
              title: 'Recommandation du Médecin',
              description: 'Le médecin te recommande de voir un thérapeute pour discuter de tes problèmes.',
              choices: [
                {
                  id: 'therapy',
                  text: 'Prendre rendez-vous',
                  emoji: '🗓️',
                  action: () => {
                    updateStat('happiness', 5);
                    updateStat('intelligence', 1);
                  },
                },
                {
                  id: 'think-about-it',
                  text: 'Y réfléchir',
                  emoji: '🤔',
                  action: () => {
                    // No immediate effect
                  },
                }
              ],
            });
          },
        },
      ],
    });
  };

  const handleDietEvent = () => {
    triggerEvent({
      id: 'diet-event',
      title: 'Alimentation',
      description: 'Quel changement veux-tu apporter à ton alimentation?',
      choices: [
        {
          id: 'balanced-diet',
          text: 'Alimentation équilibrée',
          emoji: '🥗',
          action: () => {
            updateStat('health', 4);
            updateStat('happiness', 1);
            
            // Long term effect would be tracked in a full implementation
          },
        },
        {
          id: 'vegetarian',
          text: 'Devenir végétarien',
          emoji: '🥦',
          action: () => {
            updateStat('health', 3);
            updateStat('intelligence', 1);
            
            triggerEvent({
              id: 'vegetarian-choice',
              title: 'Nouveau Régime Alimentaire',
              description: 'Tu as décidé d\'adopter un régime végétarien. Il faudra un peu de temps pour s\'y habituer.',
              choices: [
                {
                  id: 'learn-recipes',
                  text: 'Apprendre des recettes',
                  emoji: '📚',
                  action: () => {
                    updateStat('intelligence', 2);
                  },
                },
                {
                  id: 'just-wing-it',
                  text: 'Improviser',
                  emoji: '🤷',
                  action: () => {
                    // No immediate effect
                  },
                }
              ],
            });
          },
        },
        {
          id: 'junk-food',
          text: 'Manger ce que tu veux',
          emoji: '🍔',
          action: () => {
            updateStat('happiness', 3);
            updateStat('health', -2);
            
            // Long term effect would be tracked in a full implementation
          },
        },
      ],
    });
  };

  const handleSleepEvent = () => {
    triggerEvent({
      id: 'sleep-event',
      title: 'Sommeil',
      description: 'Comment veux-tu améliorer ton sommeil?',
      choices: [
        {
          id: 'early-sleep',
          text: 'Se coucher plus tôt',
          emoji: '🌙',
          action: () => {
            updateStat('health', 4);
            updateStat('intelligence', 2);
            updateStat('happiness', -1);
            
            triggerEvent({
              id: 'better-sleep',
              title: 'Meilleur Sommeil',
              description: 'Tu te sens plus reposé(e) et énergique grâce à ton nouveau rythme de sommeil.',
              choices: [
                {
                  id: 'great',
                  text: 'Super!',
                  emoji: '😊',
                  action: () => {},
                }
              ],
            });
          },
        },
        {
          id: 'meditation',
          text: 'Méditation avant de dormir',
          emoji: '🧘',
          action: () => {
            updateStat('health', 3);
            updateStat('happiness', 2);
          },
        },
        {
          id: 'no-screens',
          text: 'Éviter les écrans le soir',
          emoji: '📵',
          action: () => {
            updateStat('health', 3);
            updateStat('intelligence', 1);
          },
        },
      ],
    });
  };
  
  const handleAddictionEvent = () => {
    triggerEvent({
      id: 'addiction-event',
      title: 'Mauvaises Habitudes',
      description: 'Tu as développé une mauvaise habitude. Que veux-tu faire?',
      choices: [
        {
          id: 'quit-cold-turkey',
          text: 'Arrêter net',
          emoji: '✋',
          action: () => {
            updateStat('health', 3);
            updateStat('happiness', -2);
            
            // Success chance
            if (Math.random() < 0.6) {
              triggerEvent({
                id: 'quit-success',
                title: 'Sevrage Réussi',
                description: 'Tu as réussi à arrêter ta mauvaise habitude! Tu te sens en meilleure santé.',
                choices: [
                  {
                    id: 'celebrate',
                    text: 'Se féliciter',
                    emoji: '🎉',
                    action: () => {
                      updateStat('happiness', 5);
                    },
                  }
                ],
              });
            } else {
              triggerEvent({
                id: 'quit-failed',
                title: 'Rechute',
                description: 'Tu as rechuté. Ne te décourage pas, c\'est normal dans le processus.',
                choices: [
                  {
                    id: 'try-again',
                    text: 'Réessayer',
                    emoji: '💪',
                    action: () => {},
                  }
                ],
              });
            }
          },
        },
        {
          id: 'seek-help',
          text: 'Chercher de l\'aide',
          emoji: '🤝',
          action: () => {
            updateStat('health', 5);
            updateStat('happiness', 1);
            
            triggerEvent({
              id: 'support-found',
              title: 'Soutien Trouvé',
              description: 'Tu as trouvé un groupe de soutien qui t\'aide à surmonter ta dépendance.',
              choices: [
                {
                  id: 'continue',
                  text: 'Continuer le programme',
                  emoji: '👍',
                  action: () => {},
                }
              ],
            });
          },
        },
        {
          id: 'moderation',
          text: 'Réduire progressivement',
          emoji: '📉',
          action: () => {
            updateStat('health', 2);
            updateStat('happiness', 0);
            
            // Success chance
            if (Math.random() < 0.7) {
              triggerEvent({
                id: 'moderation-success',
                title: 'Réduction Réussie',
                description: 'Tu as réussi à réduire significativement ta mauvaise habitude!',
                choices: [
                  {
                    id: 'continue',
                    text: 'Continuer les efforts',
                    emoji: '👍',
                    action: () => {},
                  }
                ],
              });
            }
          },
        },
        {
          id: 'continue-habit',
          text: 'Continuer l\'habitude',
          emoji: '🙄',
          action: () => {
            updateStat('health', -3);
            updateStat('happiness', 1);
            
            // Long term effect would be tracked in a full implementation
          },
        },
      ],
    });
  };
  
  const handleMentalHealthEvent = () => {
    triggerEvent({
      id: 'mental-health-event',
      title: 'Santé Mentale',
      description: 'Comment veux-tu prendre soin de ta santé mentale?',
      choices: [
        {
          id: 'therapy',
          text: 'Consulter un thérapeute',
          emoji: '🧠',
          action: () => {
            updateStat('happiness', 5);
            updateStat('health', 2);
            
            triggerEvent({
              id: 'therapy-session',
              title: 'Séance de Thérapie',
              description: 'Tu as eu une séance productive avec ton thérapeute. Tu te sens mieux et plus en contrôle de tes émotions.',
              choices: [
                {
                  id: 'continue',
                  text: 'Continuer les séances',
                  emoji: '👍',
                  action: () => {},
                }
              ],
            });
          },
        },
        {
          id: 'mindfulness',
          text: 'Pratiquer la pleine conscience',
          emoji: '🧘',
          action: () => {
            updateStat('happiness', 3);
            updateStat('intelligence', 1);
            updateStat('health', 1);
          },
        },
        {
          id: 'hobby',
          text: 'Développer un hobby relaxant',
          emoji: '🎨',
          action: () => {
            updateStat('happiness', 4);
            updateStat('health', 1);
            
            triggerEvent({
              id: 'new-hobby',
              title: 'Nouveau Hobby',
              description: 'Tu as commencé un nouveau hobby qui te permet de te détendre et d\'exprimer ta créativité.',
              choices: [
                {
                  id: 'continue',
                  text: 'En profiter',
                  emoji: '😊',
                  action: () => {},
                }
              ],
            });
          },
        },
        {
          id: 'social-support',
          text: 'Passer du temps avec des proches',
          emoji: '👥',
          action: () => {
            updateStat('happiness', 4);
            updateStat('popularity', 2);
          },
        },
      ],
    });
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Overall Health Card */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-xl flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Santé
            </h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <StatusBar
                value={character.stats.health}
                color="bg-red-400"
                icon={<Heart className="h-4 w-4 text-red-500" />}
                label="Santé Physique"
                showValue
              />
              
              <StatusBar
                value={character.stats.happiness}
                color="bg-yellow-400"
                icon={<Brain className="h-4 w-4 text-yellow-500" />}
                label="Santé Mentale"
                showValue
              />
            </div>
            
            {/* Health conditions */}
            {healthConditions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Conditions de santé:</h4>
                <div className="flex flex-wrap gap-2">
                  {healthConditions.map((condition, index) => (
                    <div 
                      key={index}
                      className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                    >
                      {condition}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Health Actions */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">Actions de Santé</h3>
          </div>
          <div className="card-content">
            <div className="space-y-2">
              <button
                className="button button-outline w-full justify-start"
                onClick={handleExerciseEvent}
              >
                <Dumbbell className="mr-2 h-4 w-4" />
                Faire du Sport
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleMeditateEvent}
              >
                <Brain className="mr-2 h-4 w-4" />
                Méditer
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleDoctorEvent}
              >
                <Heart className="mr-2 h-4 w-4" />
                Aller chez le Médecin
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleDietEvent}
              >
                <Utensils className="mr-2 h-4 w-4" />
                Manger Sainement
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleSleepEvent}
              >
                <Moon className="mr-2 h-4 w-4" />
                Améliorer le Sommeil
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleAddictionEvent}
              >
                <Cigarette className="mr-2 h-4 w-4" />
                Gérer les Dépendances
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleMentalHealthEvent}
              >
                <Brain className="mr-2 h-4 w-4" />
                Santé Mentale
              </button>
            </div>
          </div>
        </div>
        
        {/* Health Lifestyle */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">Style de Vie</h3>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-1">
                  <Dumbbell className="h-4 w-4 mr-1.5 text-blue-500" />
                  <span className="font-medium text-sm">Exercice</span>
                </div>
                <StatusBar 
                  value={character.stats.health > 70 ? 80 : character.stats.health > 50 ? 60 : 30} 
                  color="bg-blue-400"
                  className="h-1 mt-1"
                />
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center mb-1">
                  <Utensils className="h-4 w-4 mr-1.5 text-green-500" />
                  <span className="font-medium text-sm">Alimentation</span>
                </div>
                <StatusBar 
                  value={character.stats.health > 70 ? 80 : character.stats.health > 50 ? 60 : 40} 
                  color="bg-green-400"
                  className="h-1 mt-1"
                />
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center mb-1">
                  <Moon className="h-4 w-4 mr-1.5 text-purple-500" />
                  <span className="font-medium text-sm">Sommeil</span>
                </div>
                <StatusBar 
                  value={character.stats.health > 60 ?  75 : character.stats.health > 40 ? 55 : 35} 
                  color="bg-purple-400"
                  className="h-1 mt-1"
                />
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center mb-1">
                  <Wine className="h-4 w-4 mr-1.5 text-yellow-500" />
                  <span className="font-medium text-sm">Sobriété</span>
                </div>
                <StatusBar 
                  value={70} 
                  color="bg-yellow-400"
                  className="h-1 mt-1"
                />
              </div>
              
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center mb-1">
                  <Cigarette className="h-4 w-4 mr-1.5 text-red-500" />
                  <span className="font-medium text-sm">Sans Tabac</span>
                </div>
                <StatusBar 
                  value={90} 
                  color="bg-red-400"
                  className="h-1 mt-1"
                />
              </div>
              
              <div className="p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-center mb-1">
                  <Pills className="h-4 w-4 mr-1.5 text-indigo-500" />
                  <span className="font-medium text-sm">Médication</span>
                </div>
                <StatusBar 
                  value={60} 
                  color="bg-indigo-400"
                  className="h-1 mt-1"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Health Tips */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">Conseils Santé</h3>
          </div>
          <div className="card-content">
            <div className="space-y-2 text-sm">
              <p className="flex items-start">
                <span className="mr-2 text-lg">💪</span>
                <span>Faire de l'exercice régulièrement améliore ta santé physique et ton humeur.</span>
              </p>
              
              <p className="flex items-start">
                <span className="mr-2 text-lg">🧠</span>
                <span>Méditer et prendre du temps pour toi-même est essentiel pour ta santé mentale.</span>
              </p>
              
              <p className="flex items-start">
                <span className="mr-2 text-lg">😴</span>
                <span>Un bon sommeil est crucial pour maintenir une bonne santé et des performances intellectuelles.</span>
              </p>
              
              <p className="flex items-start">
                <span className="mr-2 text-lg">🍎</span>
                <span>Une alimentation équilibrée est la base d'une bonne santé générale.</span>
              </p>
              
              <p className="flex items-start">
                <span className="mr-2 text-lg">🩺</span>
                <span>Des visites régulières chez le médecin permettent de prévenir les problèmes de santé.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTab;


import React from 'react';
import { useGame } from '../../../contexts/GameContext';
import { Gamepad, Music, Film, BookOpen, PartyPopper, ShoppingBag, Coffee, Briefcase, Globe, Bicycle, Utensils, PenTool } from 'lucide-react';

const ActivitiesTab = () => {
  const { gameState, triggerEvent, updateStat, updateSkill, addMoney } = useGame();
  const { character } = gameState;

  if (!character) return null;

  // Activities based on age
  const isTeenager = character.age >= 13 && character.age <= 19;
  const isYoungAdult = character.age >= 20;

  // Example activity event
  const handleActivityEvent = (activity) => {
    let eventData;
    
    switch (activity) {
      case 'party':
        eventData = {
          id: 'party-event',
          title: 'Faire la fête',
          description: 'Tu es invité à une fête ce weekend. Que fais-tu?',
          choices: [
            {
              id: 'go-party',
              text: 'Y aller et s\'amuser',
              emoji: '🎉',
              action: () => {
                updateStat('happiness', 5);
                updateStat('popularity', 3);
                updateStat('health', -1);
              },
            },
            {
              id: 'go-moderate',
              text: 'Y aller mais rester raisonnable',
              emoji: '😎',
              action: () => {
                updateStat('happiness', 3);
                updateStat('popularity', 2);
                updateStat('health', 0);
              },
            },
            {
              id: 'stay-home',
              text: 'Rester à la maison',
              emoji: '🏠',
              action: () => {
                updateStat('happiness', -1);
                updateStat('popularity', -1);
                updateStat('health', 1);
                updateStat('intelligence', 1);
              },
            },
          ],
        };
        break;
      
      case 'games':
        eventData = {
          id: 'games-event',
          title: 'Jeux Vidéo',
          description: 'Tu as quelques heures de libre. Quel type de jeu veux-tu jouer?',
          choices: [
            {
              id: 'action-games',
              text: 'Jeux d\'action',
              emoji: '🎮',
              action: () => {
                updateStat('happiness', 4);
                updateStat('intelligence', -1);
              },
            },
            {
              id: 'strategy-games',
              text: 'Jeux de stratégie',
              emoji: '🧩',
              action: () => {
                updateStat('happiness', 3);
                updateStat('intelligence', 2);
              },
            },
            {
              id: 'social-games',
              text: 'Jeux multijoueur avec des amis',
              emoji: '👥',
              action: () => {
                updateStat('happiness', 5);
                updateStat('popularity', 2);
              },
            },
          ],
        };
        break;
      
      case 'music':
        eventData = {
          id: 'music-event',
          title: 'Écouter de la musique',
          description: 'Quel genre de musique veux-tu écouter?',
          choices: [
            {
              id: 'pop-music',
              text: 'Pop',
              emoji: '🎵',
              action: () => {
                updateStat('happiness', 2);
                updateStat('popularity', 1);
              },
            },
            {
              id: 'rock-music',
              text: 'Rock',
              emoji: '🎸',
              action: () => {
                updateStat('happiness', 2);
              },
            },
            {
              id: 'rap-music',
              text: 'Rap',
              emoji: '🎤',
              action: () => {
                updateStat('happiness', 2);
                updateStat('popularity', 1);
              },
            },
          ],
        };
        break;
        
      case 'read':
        eventData = {
          id: 'reading-event',
          title: 'Lire un livre',
          description: 'Quel type de livre veux-tu lire?',
          choices: [
            {
              id: 'fiction',
              text: 'Fiction / Roman',
              emoji: '📚',
              action: () => {
                updateStat('happiness', 2);
                updateStat('intelligence', 2);
              },
            },
            {
              id: 'nonfiction',
              text: 'Non-fiction / Documentaire',
              emoji: '📘',
              action: () => {
                updateStat('intelligence', 3);
                updateStat('happiness', 1);
              },
            },
            {
              id: 'comic',
              text: 'BD / Manga',
              emoji: '📔',
              action: () => {
                updateStat('happiness', 3);
                updateStat('intelligence', 1);
              },
            },
          ],
        };
        break;
        
      case 'cook':
        eventData = {
          id: 'cooking-event',
          title: 'Cuisiner',
          description: 'Que veux-tu cuisiner?',
          choices: [
            {
              id: 'simple',
              text: 'Repas simple',
              emoji: '🍳',
              action: () => {
                updateSkill('cooking', 1);
                updateStat('health', 1);
              },
            },
            {
              id: 'elaborate',
              text: 'Recette élaborée',
              emoji: '👨‍🍳',
              action: () => {
                updateSkill('cooking', 3);
                updateStat('health', 2);
                updateStat('happiness', 2);
              },
            },
            {
              id: 'dessert',
              text: 'Pâtisserie',
              emoji: '🧁',
              action: () => {
                updateSkill('cooking', 2);
                updateStat('happiness', 3);
                updateStat('health', -1);
              },
            },
          ],
        };
        break;
        
      case 'sport':
        eventData = {
          id: 'sport-event',
          title: 'Faire du sport',
          description: 'Quel sport veux-tu pratiquer?',
          choices: [
            {
              id: 'running',
              text: 'Courir',
              emoji: '🏃',
              action: () => {
                updateSkill('sports', 2);
                updateStat('health', 3);
                updateStat('happiness', 1);
              },
            },
            {
              id: 'team-sport',
              text: 'Sport d\'équipe',
              emoji: '⚽',
              action: () => {
                updateSkill('sports', 2);
                updateStat('health', 2);
                updateStat('happiness', 2);
                updateStat('popularity', 1);
              },
            },
            {
              id: 'gym',
              text: 'Musculation',
              emoji: '💪',
              action: () => {
                updateSkill('sports', 3);
                updateStat('health', 2);
                updateStat('happiness', 1);
              },
            },
          ],
        };
        break;
        
      case 'art':
        eventData = {
          id: 'art-event',
          title: 'Activité artistique',
          description: 'Quelle activité artistique veux-tu pratiquer?',
          choices: [
            {
              id: 'drawing',
              text: 'Dessin / Peinture',
              emoji: '🎨',
              action: () => {
                updateSkill('art', 2);
                updateStat('happiness', 3);
              },
            },
            {
              id: 'music',
              text: 'Jouer d\'un instrument',
              emoji: '🎸',
              action: () => {
                updateSkill('art', 2);
                updateStat('happiness', 2);
                updateStat('intelligence', 1);
              },
            },
            {
              id: 'writing',
              text: 'Écriture',
              emoji: '✍️',
              action: () => {
                updateSkill('art', 2);
                updateStat('intelligence', 2);
                updateStat('happiness', 1);
              },
            },
          ],
        };
        break;
        
      case 'shop':
        eventData = {
          id: 'shopping-event',
          title: 'Faire du shopping',
          description: 'Que veux-tu acheter?',
          choices: [
            {
              id: 'clothes',
              text: 'Vêtements',
              emoji: '👕',
              action: () => {
                updateStat('happiness', 3);
                updateStat('popularity', 2);
                addMoney(-50);
              },
            },
            {
              id: 'electronics',
              text: 'Électronique',
              emoji: '📱',
              action: () => {
                updateStat('happiness', 4);
                updateStat('intelligence', 1);
                addMoney(-200);
              },
            },
            {
              id: 'books',
              text: 'Livres',
              emoji: '📚',
              action: () => {
                updateStat('intelligence', 3);
                updateStat('happiness', 2);
                addMoney(-30);
              },
            },
          ],
        };
        break;
        
      case 'travel':
        eventData = {
          id: 'travel-event',
          title: 'Voyager',
          description: 'Où veux-tu voyager?',
          choices: [
            {
              id: 'beach',
              text: 'Plage / Station balnéaire',
              emoji: '🏖️',
              action: () => {
                updateStat('happiness', 5);
                updateStat('health', 2);
                addMoney(-300);
              },
            },
            {
              id: 'city',
              text: 'Découvrir une ville culturelle',
              emoji: '🏙️',
              action: () => {
                updateStat('happiness', 4);
                updateStat('intelligence', 3);
                addMoney(-250);
              },
            },
            {
              id: 'mountains',
              text: 'Montagne / Nature',
              emoji: '🏔️',
              action: () => {
                updateStat('happiness', 4);
                updateStat('health', 3);
                addMoney(-200);
              },
            },
          ],
        };
        break;
        
      case 'work-extra':
        eventData = {
          id: 'extra-work',
          title: 'Travail supplémentaire',
          description: 'Comment veux-tu gagner un peu d\'argent supplémentaire?',
          choices: [
            {
              id: 'overtime',
              text: 'Heures supplémentaires',
              emoji: '⏰',
              action: () => {
                addMoney(100);
                updateStat('happiness', -2);
                updateStat('health', -1);
              },
            },
            {
              id: 'freelance',
              text: 'Projet freelance',
              emoji: '💻',
              action: () => {
                addMoney(150);
                updateStat('intelligence', 2);
                updateStat('happiness', -1);
              },
            },
            {
              id: 'part-time',
              text: 'Petit job à temps partiel',
              emoji: '🛍️',
              action: () => {
                addMoney(80);
                updateStat('happiness', -1);
              },
            },
          ],
        };
        break;
      
      default:
        eventData = {
          id: 'generic-activity',
          title: 'Activité',
          description: 'Que veux-tu faire?',
          choices: [
            {
              id: 'do-it',
              text: 'Faire l\'activité',
              emoji: '👍',
              action: () => {
                updateStat('happiness', 2);
              },
            },
            {
              id: 'skip-it',
              text: 'Faire autre chose',
              emoji: '👎',
              action: () => {
                // No effect
              },
            },
          ],
        };
    }
    
    triggerEvent(eventData);
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Teenager Activities */}
        {isTeenager && (
          <div className="card">
            <div className="card-header pb-2">
              <h3 className="text-lg">Activités d'Adolescent</h3>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('games')}
                >
                  <Gamepad className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Jeux Vidéo</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('music')}
                >
                  <Music className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Écouter Musique</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('read')}
                >
                  <BookOpen className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Lire</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('sport')}
                >
                  <Bicycle className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Sport</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('party')}
                >
                  <PartyPopper className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Faire la Fête</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('shop')}
                >
                  <ShoppingBag className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Shopping</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('cook')}
                >
                  <Utensils className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Cuisiner</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('art')}
                >
                  <PenTool className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Art</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Young Adult Activities */}
        {isYoungAdult && (
          <div className="card">
            <div className="card-header pb-2">
              <h3 className="text-lg">Activités de Jeune Adulte</h3>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('work-extra')}
                >
                  <Briefcase className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Travail supplémentaire</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('travel')}
                >
                  <Globe className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Voyager</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('party')}
                >
                  <PartyPopper className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Sortir</span>
                </button>
                
                <button
                  className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                  onClick={() => handleActivityEvent('coffee')}
                >
                  <Coffee className="h-6 w-6 mb-1 text-game-primary" />
                  <span className="text-sm">Café avec des amis</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Hobbies & Entertainment */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">Loisirs & Divertissements</h3>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-2 gap-2">
              <button
                className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                onClick={() => handleActivityEvent('games')}
              >
                <Gamepad className="h-6 w-6 mb-1 text-game-primary" />
                <span className="text-sm">Jeux Vidéo</span>
              </button>
              
              <button
                className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                onClick={() => handleActivityEvent('movies')}
              >
                <Film className="h-6 w-6 mb-1 text-game-primary" />
                <span className="text-sm">Films</span>
              </button>
              
              <button
                className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                onClick={() => handleActivityEvent('read')}
              >
                <BookOpen className="h-6 w-6 mb-1 text-game-primary" />
                <span className="text-sm">Lecture</span>
              </button>
              
              <button
                className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                onClick={() => handleActivityEvent('music')}
              >
                <Music className="h-6 w-6 mb-1 text-game-primary" />
                <span className="text-sm">Musique</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Self-Improvement */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">Développement Personnel</h3>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-2 gap-2">
              <button
                className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                onClick={() => handleActivityEvent('sport')}
              >
                <Bicycle className="h-6 w-6 mb-1 text-game-primary" />
                <span className="text-sm">Sport</span>
              </button>
              
              <button
                className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                onClick={() => handleActivityEvent('cook')}
              >
                <Utensils className="h-6 w-6 mb-1 text-game-primary" />
                <span className="text-sm">Cuisine</span>
              </button>
              
              <button
                className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                onClick={() => handleActivityEvent('art')}
              >
                <PenTool className="h-6 w-6 mb-1 text-game-primary" />
                <span className="text-sm">Art</span>
              </button>
              
              <button
                className="p-3 bg-gray-50 rounded-lg flex flex-col items-center justify-center h-auto"
                onClick={() => handleActivityEvent('learning')}
              >
                <BookOpen className="h-6 w-6 mb-1 text-game-primary" />
                <span className="text-sm">Apprendre</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesTab;

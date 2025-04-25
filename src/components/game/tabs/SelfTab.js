
import React from 'react';
import { useGame } from '../../../contexts/GameContext';
import StatusBar from '../StatusBar';
import { Heart, Brain, Smile, UserCircle, Calendar, Award, Code } from 'lucide-react';

const SelfTab = () => {
  const { gameState, ageUp, triggerEvent, updateStat, addAchievement } = useGame();
  const { character, achievements } = gameState;

  if (!character) return null;

  const handleRandomEvent = () => {
    // Generate a random event based on character's current situation
    const possibleEvents = [
      {
        id: 'random-event-1',
        title: 'Une Journée à l\'École',
        description: 'Tu as un examen important aujourd\'hui. Comment veux-tu te préparer ?',
        choices: [
          {
            id: 'study-hard',
            text: 'Étudier toute la nuit',
            emoji: '📚',
            action: () => {
              updateStat('intelligence', 5);
              updateStat('happiness', -3);
              updateStat('health', -2);
              if (character.stats.intelligence >= 80) {
                addAchievement({
                  id: 'genius',
                  title: 'Génie',
                  description: 'Atteindre un niveau d\'intelligence exceptionnel',
                  icon: '🧠'
                });
              }
            },
          },
          {
            id: 'balanced-approach',
            text: 'Réviser et se reposer',
            emoji: '😌',
            action: () => {
              updateStat('intelligence', 3);
              updateStat('happiness', 2);
              updateStat('health', 1);
            },
          },
          {
            id: 'play-games',
            text: 'Jouer aux jeux vidéo',
            emoji: '🎮',
            action: () => {
              updateStat('intelligence', -2);
              updateStat('happiness', 5);
              updateStat('health', 0);
            },
          },
        ],
      },
      {
        id: 'random-event-2',
        title: 'Opportunité de Stage',
        description: 'Une entreprise locale propose des stages d\'été. Es-tu intéressé?',
        choices: [
          {
            id: 'apply',
            text: 'Postuler au stage',
            emoji: '💼',
            action: () => {
              updateStat('intelligence', 3);
              updateStat('wealth', 2);
              updateStat('happiness', 1);
            },
          },
          {
            id: 'ignore',
            text: 'Ignorer l\'opportunité',
            emoji: '🏖️',
            action: () => {
              updateStat('happiness', 3);
              updateStat('intelligence', -1);
            },
          },
        ],
      },
      {
        id: 'random-event-3',
        title: 'Décision de Santé',
        description: 'Tu te sens un peu malade ces derniers jours. Que fais-tu?',
        choices: [
          {
            id: 'go-doctor',
            text: 'Consulter un médecin',
            emoji: '🩺',
            action: () => {
              updateStat('health', 5);
              updateStat('wealth', -1);
            },
          },
          {
            id: 'self-medicate',
            text: 'Prendre des médicaments sans ordonnance',
            emoji: '💊',
            action: () => {
              updateStat('health', 2);
              updateStat('wealth', -0.5);
            },
          },
          {
            id: 'ignore-illness',
            text: 'Ignorer les symptômes',
            emoji: '🙄',
            action: () => {
              updateStat('health', -3);
              updateStat('happiness', -2);
            },
          },
        ],
      },
    ];

    // Choose a random event
    const randomEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
    triggerEvent(randomEvent);
  };

  // Calculate an overall life score based on stats
  const calculateLifeScore = () => {
    const { happiness, health, intelligence, popularity, wealth } = character.stats;
    return Math.floor((happiness + health + intelligence + popularity + (wealth * 2)) / 6);
  };

  // Get skill level description
  const getSkillLevel = (level) => {
    if (level < 20) return 'Débutant';
    if (level < 40) return 'Apprenti';
    if (level < 60) return 'Intermédiaire';
    if (level < 80) return 'Avancé';
    return 'Expert';
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Character basic info */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-xl flex items-center">
              <UserCircle className="mr-2 h-5 w-5" />
              {character.firstName} {character.lastName}
            </h3>
          </div>
          <div className="card-content">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {character.age} ans
                </span>
              </div>
              <button 
                className="button button-outline button-sm text-xs"
                onClick={ageUp}
              >
                Vieillir d'un an
              </button>
            </div>
            
            {/* Life Score */}
            <div className="bg-game-primary/10 p-3 rounded-lg mb-4 text-center">
              <span className="text-sm text-gray-600">Niveau de vie</span>
              <div className="text-2xl font-bold">{calculateLifeScore()}/100</div>
            </div>
            
            <div className="space-y-3">
              <StatusBar
                value={character.stats.happiness}
                color="bg-yellow-400"
                icon={<Smile className="h-4 w-4 text-yellow-500" />}
                label="Bonheur"
                showValue
              />
              
              <StatusBar
                value={character.stats.health}
                color="bg-red-400"
                icon={<Heart className="h-4 w-4 text-red-500" />}
                label="Santé"
                showValue
              />
              
              <StatusBar
                value={character.stats.intelligence}
                color="bg-blue-400"
                icon={<Brain className="h-4 w-4 text-blue-500" />}
                label="Intelligence"
                showValue
              />
              
              <StatusBar
                value={character.stats.popularity}
                color="bg-green-400"
                label="Popularité"
                showValue
              />
              
              <StatusBar
                value={character.stats.wealth}
                color="bg-amber-400"
                label="Richesse"
                showValue
              />
            </div>
          </div>
        </div>
        
        {/* Traits */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">Traits de caractère</h3>
          </div>
          <div className="card-content">
            <div className="flex flex-wrap gap-2">
              {character.traits.map((trait) => (
                <div 
                  key={trait}
                  className="px-3 py-1.5 rounded-full bg-game-primary/10 text-game-primary text-sm"
                >
                  {trait === 'intelligent' && '📚 '}
                  {trait === 'athletic' && '💪 '}
                  {trait === 'charismatic' && '🎭 '}
                  {trait === 'rebellious' && '🤪 '}
                  {trait === 'kind' && '😇 '}
                  {trait === 'creative' && '🎨 '}
                  {trait === 'ambitious' && '🚀 '}
                  {trait.charAt(0).toUpperCase() + trait.slice(1)}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Skills */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg flex items-center">
              <Code className="mr-2 h-5 w-5" />
              Compétences
            </h3>
          </div>
          <div className="card-content">
            <div className="space-y-2">
              {character.skills && character.skills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">
                      {skill.name === 'cooking' && '🍳 Cuisine'}
                      {skill.name === 'sports' && '⚽ Sports'}
                      {skill.name === 'art' && '🎨 Art'}
                    </span>
                    <div className="text-xs text-gray-500">
                      {getSkillLevel(skill.level)}
                    </div>
                  </div>
                  <StatusBar
                    value={skill.level}
                    color="bg-indigo-400"
                    showValue
                    className="w-32"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <div className="card">
            <div className="card-header pb-2">
              <h3 className="text-lg flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Succès débloqués
              </h3>
            </div>
            <div className="card-content">
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="flex items-center p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl mr-3">{achievement.icon}</div>
                    <div>
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-xs text-gray-500">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Education/Job */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">
              {character.job ? 'Emploi' : 'Éducation'}
            </h3>
          </div>
          <div className="card-content">
            {character.job ? (
              <div>
                <p className="font-medium">{character.job.title}</p>
                <p className="text-sm text-gray-500">{character.job.company}</p>
                <p className="text-sm mt-1">Salaire: {character.job.salary.toLocaleString('fr-FR')} €/an</p>
                <StatusBar
                  value={character.job.satisfaction}
                  color="bg-purple-400"
                  label="Satisfaction"
                  showValue
                  className="mt-2"
                />
              </div>
            ) : (
              <div>
                <p className="font-medium">
                  {character.education.level === 'primary' && 'École Primaire'}
                  {character.education.level === 'middle' && 'Collège'}
                  {character.education.level === 'high' && 'Lycée'}
                  {character.education.level === 'university' && 'Université'}
                  {character.education.level === 'graduate' && 'Diplômé'}
                </p>
                <StatusBar
                  value={character.education.grades}
                  color="bg-blue-400"
                  label="Notes"
                  showValue
                  className="mt-2"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Random event button */}
        <button
          className="bg-game-primary hover:bg-game-secondary text-white p-2 rounded"
          onClick={handleRandomEvent}
        >
          Événement aléatoire
        </button>
      </div>
    </div>
  );
};

export default SelfTab;

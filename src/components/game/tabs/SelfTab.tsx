
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import StatusBar from '../StatusBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Smile, UserCircle, Calendar } from 'lucide-react';

const SelfTab = () => {
  const { gameState, ageUp, triggerEvent } = useGame();
  const { character } = gameState;

  if (!character) return null;

  const handleRandomEvent = () => {
    // Simple random event example
    triggerEvent({
      id: 'random-event-1',
      title: 'Une Journée à l\'École',
      description: 'Tu as un examen important aujourd\'hui. Comment veux-tu te préparer ?',
      choices: [
        {
          id: 'study-hard',
          text: 'Étudier toute la nuit',
          emoji: '📚',
          action: () => {
            // Update stats based on choice
            updateStat('intelligence', 5);
            updateStat('happiness', -3);
            updateStat('health', -2);
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
    });
  };

  const { updateStat } = useGame();

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Character basic info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <UserCircle className="mr-2 h-5 w-5" />
              {character.firstName} {character.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {character.age} ans
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={ageUp}
                className="text-xs"
              >
                Vieillir d'un an
              </Button>
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
          </CardContent>
        </Card>
        
        {/* Traits */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Traits de caractère</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        {/* Education/Job */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {character.job ? 'Emploi' : 'Éducation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        {/* Random event button (for demo purposes) */}
        <Button
          className="bg-game-primary hover:bg-game-secondary"
          onClick={handleRandomEvent}
        >
          Événement aléatoire
        </Button>
      </div>
    </div>
  );
};

export default SelfTab;

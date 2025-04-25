
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBar from '../StatusBar';
import { Activity, Heart, Brain, Dumbbell, Utensils, Moon } from 'lucide-react';

const HealthTab = () => {
  const { gameState, updateStat, triggerEvent } = useGame();
  const { character } = gameState;

  if (!character) return null;

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
          },
        },
        {
          id: 'sick',
          text: 'Je ne me sens pas bien',
          emoji: '🤒',
          action: () => {
            updateStat('health', 5);
            updateStat('happiness', 1);
          },
        },
        {
          id: 'mental',
          text: 'Problèmes de santé mentale',
          emoji: '🧠',
          action: () => {
            updateStat('health', 2);
            updateStat('happiness', 4);
          },
        },
      ],
    });
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Overall Health Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Santé
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        {/* Health Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Actions de Santé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleExerciseEvent}
              >
                <Dumbbell className="mr-2 h-4 w-4" />
                Faire du Sport
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleMeditateEvent}
              >
                <Brain className="mr-2 h-4 w-4" />
                Méditer
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleDoctorEvent}
              >
                <Heart className="mr-2 h-4 w-4" />
                Aller chez le Médecin
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  // Trigger healthy diet event
                }}
              >
                <Utensils className="mr-2 h-4 w-4" />
                Manger Sainement
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  // Trigger sleep event
                }}
              >
                <Moon className="mr-2 h-4 w-4" />
                Bien Dormir
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Health Tips */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conseils Santé</CardTitle>
          </CardHeader>
          <CardContent>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthTab;

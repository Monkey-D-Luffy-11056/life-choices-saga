
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBar from '../StatusBar';
import { BookOpen, GraduationCap, School, BriefcaseBusiness, Trophy } from 'lucide-react';

const EducationWorkTab = () => {
  const { gameState, updateStat, triggerEvent } = useGame();
  const { character } = gameState;

  if (!character) return null;

  const isStudent = !character.job;
  const educationLevel = character.education.level;

  // Example study event
  const handleStudyEvent = () => {
    triggerEvent({
      id: 'study-event',
      title: 'Étudier',
      description: 'Comment veux-tu organiser tes études aujourd\'hui?',
      choices: [
        {
          id: 'study-hard',
          text: 'Étudier intensément',
          emoji: '📚',
          action: () => {
            // Update stats
            updateStat('intelligence', 5);
            updateStat('happiness', -2);
          },
        },
        {
          id: 'study-moderate',
          text: 'Étudier modérément',
          emoji: '📖',
          action: () => {
            updateStat('intelligence', 2);
            updateStat('happiness', 0);
          },
        },
        {
          id: 'skip-study',
          text: 'Sécher les cours',
          emoji: '🎮',
          action: () => {
            updateStat('intelligence', -1);
            updateStat('happiness', 3);
          },
        },
      ],
    });
  };

  // Example work event
  const handleWorkEvent = () => {
    triggerEvent({
      id: 'work-event',
      title: 'Au travail',
      description: 'Ton patron te demande de faire des heures supplémentaires.',
      choices: [
        {
          id: 'work-extra',
          text: 'Accepter les heures supplémentaires',
          emoji: '💼',
          action: () => {
            // Update stats
            updateStat('wealth', 3);
            updateStat('happiness', -2);
          },
        },
        {
          id: 'work-normal',
          text: 'Refuser poliment',
          emoji: '🙂',
          action: () => {
            updateStat('wealth', 0);
            updateStat('happiness', 1);
          },
        },
        {
          id: 'work-quit',
          text: 'Menacer de démissionner',
          emoji: '😤',
          action: () => {
            updateStat('wealth', -1);
            updateStat('happiness', 0);
          },
        },
      ],
    });
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              {isStudent ? (
                <>
                  <School className="mr-2 h-5 w-5" />
                  Éducation
                </>
              ) : (
                <>
                  <BriefcaseBusiness className="mr-2 h-5 w-5" />
                  Travail
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isStudent ? (
              <div>
                <div className="flex items-center mb-3">
                  <GraduationCap className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {educationLevel === 'primary' && 'École Primaire'}
                      {educationLevel === 'middle' && 'Collège'}
                      {educationLevel === 'high' && 'Lycée'}
                      {educationLevel === 'university' && 'Université'}
                    </p>
                    <p className="text-sm text-gray-500">Année {character.age - 12}</p>
                  </div>
                </div>
                
                <StatusBar
                  value={character.education.grades}
                  color="bg-blue-400"
                  label="Notes"
                  showValue
                  className="mt-2"
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-3">
                  <BriefcaseBusiness className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <p className="font-medium">{character.job?.title}</p>
                    <p className="text-sm text-gray-500">{character.job?.company}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Salaire annuel</span>
                  <span className="font-medium">{character.job?.salary.toLocaleString('fr-FR')} €</span>
                </div>
                
                <StatusBar
                  value={character.job?.satisfaction || 0}
                  color="bg-purple-400"
                  label="Satisfaction"
                  showValue
                />
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {isStudent ? (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleStudyEvent}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Étudier
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      // Trigger an event about joining a club
                    }}
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Rejoindre un club
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      // Trigger an event about talking to a teacher
                    }}
                  >
                    <School className="mr-2 h-4 w-4" />
                    Parler à un professeur
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleWorkEvent}
                  >
                    <BriefcaseBusiness className="mr-2 h-4 w-4" />
                    Travailler dur
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      // Trigger an event about networking
                    }}
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Réseauter
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      // Trigger an event about asking for a raise
                    }}
                  >
                    <School className="mr-2 h-4 w-4" />
                    Demander une augmentation
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducationWorkTab;

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, UserCircle } from 'lucide-react';

const RelationshipsTab = () => {
  const { gameState, triggerEvent } = useGame();
  const { character } = gameState;

  if (!character) return null;

  const handleRelationshipInteraction = (relationship: any) => {
    triggerEvent({
      id: `relationship-${relationship.id}`,
      title: `Interagir avec ${relationship.name}`,
      description: `Que veux-tu faire avec ${relationship.name}?`,
      choices: [
        {
          id: 'talk',
          text: 'Discuter',
          emoji: '💬',
          action: () => {
            // Handle talking
          },
        },
        {
          id: 'hangout',
          text: 'Sortir ensemble',
          emoji: '🎬',
          action: () => {
            // Handle hanging out
          },
        },
        {
          id: 'gift',
          text: 'Offrir un cadeau',
          emoji: '🎁',
          action: () => {
            // Handle giving a gift
          },
        },
      ],
    });
  };

  // Group relationships by type
  const family = character.relationships.filter(r => ['parent', 'sibling'].includes(r.type));
  const friends = character.relationships.filter(r => r.type === 'friend');
  const romantic = character.relationships.filter(r => r.type === 'romantic');
  const others = character.relationships.filter(r => !['parent', 'sibling', 'friend', 'romantic'].includes(r.type));

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Family */}
        {family.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Famille
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {family.map((relationship) => (
                  <div 
                    key={relationship.id}
                    className="flex items-center p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleRelationshipInteraction(relationship)}
                  >
                    <div className="w-10 h-10 rounded-full bg-game-primary/20 flex items-center justify-center mr-3">
                      <UserCircle className="h-6 w-6 text-game-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{relationship.name}</p>
                      <p className="text-xs text-gray-500">
                        {relationship.type === 'parent' && 'Parent'}
                        {relationship.type === 'sibling' && 'Frère/Sœur'}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <Heart
                        className={`h-4 w-4 ${
                          relationship.level > 70 ? 'text-red-500' : 'text-gray-300'
                        } mr-1`}
                        fill={relationship.level > 70 ? 'currentColor' : 'none'}
                      />
                      <span className="text-xs">{relationship.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Friends */}
        {friends.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Amis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {friends.map((relationship) => (
                  <div 
                    key={relationship.id}
                    className="flex items-center p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleRelationshipInteraction(relationship)}
                  >
                    <div className="w-10 h-10 rounded-full bg-game-primary/20 flex items-center justify-center mr-3">
                      <UserCircle className="h-6 w-6 text-game-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{relationship.name}</p>
                      <p className="text-xs text-gray-500">Ami(e)</p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <Heart
                        className={`h-4 w-4 ${
                          relationship.level > 70 ? 'text-red-500' : 'text-gray-300'
                        } mr-1`}
                        fill={relationship.level > 70 ? 'currentColor' : 'none'}
                      />
                      <span className="text-xs">{relationship.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Romantic */}
        {romantic.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Relations Amoureuses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {romantic.map((relationship) => (
                  <div 
                    key={relationship.id}
                    className="flex items-center p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleRelationshipInteraction(relationship)}
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                      <UserCircle className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-medium">{relationship.name}</p>
                      <p className="text-xs text-gray-500">Partenaire</p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <Heart
                        className="h-4 w-4 text-red-500 mr-1"
                        fill="currentColor"
                      />
                      <span className="text-xs">{relationship.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Others */}
        {others.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Autres Relations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {others.map((relationship) => (
                  <div 
                    key={relationship.id}
                    className="flex items-center p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleRelationshipInteraction(relationship)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <UserCircle className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">{relationship.name}</p>
                      <p className="text-xs text-gray-500">
                        {relationship.type === 'teacher' && 'Professeur'}
                        {relationship.type === 'colleague' && 'Collègue'}
                        {!['teacher', 'colleague'].includes(relationship.type) && 'Connaissance'}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <Heart
                        className={`h-4 w-4 ${
                          relationship.level > 70 ? 'text-red-500' : 'text-gray-300'
                        } mr-1`}
                        fill={relationship.level > 70 ? 'currentColor' : 'none'}
                      />
                      <span className="text-xs">{relationship.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* If no relationships */}
        {character.relationships.length === 0 && (
          <div className="text-center py-10">
            <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Tu n'as pas encore de relations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelationshipsTab;

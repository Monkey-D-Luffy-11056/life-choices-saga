import React from 'react';
import { useGame } from '../../../contexts/GameContext';
import { Heart, Users, UserCircle, UserPlus, Mail } from 'lucide-react';

const RelationshipsTab = () => {
  const { gameState, triggerEvent, updateRelationship, addRelationship } = useGame();
  const { character } = gameState;

  if (!character) return null;

  const handleRelationshipInteraction = (relationship) => {
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
            // Boost relationship a bit
            updateRelationship(relationship.id, 3);
          },
        },
        {
          id: 'hangout',
          text: 'Sortir ensemble',
          emoji: '🎬',
          action: () => {
            // Boost relationship more but costs money
            updateRelationship(relationship.id, 6);
            // Would deduct money in a full implementation
          },
        },
        {
          id: 'gift',
          text: 'Offrir un cadeau',
          emoji: '🎁',
          action: () => {
            // Significant relationship boost but costs more money
            updateRelationship(relationship.id, 10);
            // Would deduct money in a full implementation
          },
        },
        {
          id: 'argue',
          text: 'Se disputer',
          emoji: '😠',
          action: () => {
            // Damage relationship
            updateRelationship(relationship.id, -5);
          },
        },
      ],
    });
  };

  const handleMakeNewFriend = () => {
    // Generate a random name
    const firstNames = ['Alex', 'Jordan', 'Casey', 'Taylor', 'Morgan', 'Sam', 'Jamie'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Create event to meet new person
    triggerEvent({
      id: 'make-friend',
      title: 'Nouvelle Rencontre',
      description: `Tu as rencontré ${randomFirstName} ${randomLastName}. Veux-tu devenir ami(e) avec cette personne?`,
      choices: [
        {
          id: 'befriend',
          text: 'Devenir ami(e)',
          emoji: '👋',
          action: () => {
            // Add new relationship
            const newRelationshipId = `friend-${Date.now()}`;
            addRelationship({
              id: newRelationshipId,
              name: `${randomFirstName} ${randomLastName}`,
              type: 'friend',
              level: 50,
            });
          },
        },
        {
          id: 'ignore',
          text: 'Pas intéressé(e)',
          emoji: '🚶',
          action: () => {
            // Nothing happens
          },
        },
      ],
    });
  };

  const handleStartDating = () => {
    // Check if already in a relationship
    const existingRomantic = character.relationships.find(r => r.type === 'romantic');
    
    if (existingRomantic) {
      triggerEvent({
        id: 'already-dating',
        title: 'Déjà en Couple',
        description: `Tu es déjà en couple avec ${existingRomantic.name}. Que veux-tu faire?`,
        choices: [
          {
            id: 'stay-loyal',
            text: 'Rester fidèle',
            emoji: '❤️',
            action: () => {
              updateRelationship(existingRomantic.id, 5);
            },
          },
          {
            id: 'break-up',
            text: 'Rompre',
            emoji: '💔',
            action: () => {
              // Implement actual breakup
              updateRelationship(existingRomantic.id, -20);
            },
          },
        ],
      });
      return;
    }
    
    // Generate a romantic interest
    const firstNames = ['Alex', 'Jordan', 'Casey', 'Taylor', 'Morgan', 'Sam', 'Jamie'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    triggerEvent({
      id: 'dating-opportunity',
      title: 'Rencontre Romantique',
      description: `Tu as rencontré ${randomFirstName} ${randomLastName} et il semble y avoir une connexion spéciale. Que fais-tu?`,
      choices: [
        {
          id: 'flirt',
          text: 'Flirter',
          emoji: '😊',
          action: () => {
            // Add new romantic relationship
            const newRelationshipId = `romantic-${Date.now()}`;
            addRelationship({
              id: newRelationshipId,
              name: `${randomFirstName} ${randomLastName}`,
              type: 'romantic',
              level: 65,
            });
          },
        },
        {
          id: 'just-friends',
          text: 'Rester ami(e)s',
          emoji: '👥',
          action: () => {
            // Add as a regular friend instead
            const newRelationshipId = `friend-${Date.now()}`;
            addRelationship({
              id: newRelationshipId,
              name: `${randomFirstName} ${randomLastName}`,
              type: 'friend',
              level: 50,
            });
          },
        },
        {
          id: 'not-interested',
          text: 'Pas intéressé(e)',
          emoji: '🚶',
          action: () => {
            // Nothing happens
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
        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            className="p-3 bg-blue-100 rounded-lg flex flex-col items-center justify-center"
            onClick={handleMakeNewFriend}
          >
            <UserPlus className="h-6 w-6 mb-1 text-blue-500" />
            <span className="text-sm">Se faire un ami</span>
          </button>
          
          <button
            className="p-3 bg-pink-100 rounded-lg flex flex-col items-center justify-center"
            onClick={handleStartDating}
          >
            <Heart className="h-6 w-6 mb-1 text-pink-500" />
            <span className="text-sm">Rencontres</span>
          </button>
          
          <button
            className="p-3 bg-green-100 rounded-lg flex flex-col items-center justify-center"
          >
            <Users className="h-6 w-6 mb-1 text-green-500" />
            <span className="text-sm">Événement social</span>
          </button>
          
          <button
            className="p-3 bg-purple-100 rounded-lg flex flex-col items-center justify-center"
          >
            <Mail className="h-6 w-6 mb-1 text-purple-500" />
            <span className="text-sm">Contacter</span>
          </button>
        </div>
        
        {/* Family */}
        {family.length > 0 && (
          <div className="card">
            <div className="card-header pb-2">
              <h3 className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Famille
              </h3>
            </div>
            <div className="card-content">
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
            </div>
          </div>
        )}
        
        {/* Friends */}
        {friends.length > 0 && (
          <div className="card">
            <div className="card-header pb-2">
              <h3 className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Amis
              </h3>
            </div>
            <div className="card-content">
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
            </div>
          </div>
        )}
        
        {/* Romantic */}
        {romantic.length > 0 && (
          <div className="card">
            <div className="card-header pb-2">
              <h3 className="text-lg flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Relations Amoureuses
              </h3>
            </div>
            <div className="card-content">
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
            </div>
          </div>
        )}
        
        {/* Others */}
        {others.length > 0 && (
          <div className="card">
            <div className="card-header pb-2">
              <h3 className="text-lg">Autres Relations</h3>
            </div>
            <div className="card-content">
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
            </div>
          </div>
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

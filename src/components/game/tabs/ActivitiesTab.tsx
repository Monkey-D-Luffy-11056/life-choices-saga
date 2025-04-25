
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad, Music, Film, BookOpen, PartyPopper, ShoppingBag } from 'lucide-react';

const ActivitiesTab = () => {
  const { gameState, triggerEvent } = useGame();
  const { character } = gameState;

  if (!character) return null;

  // Activities based on age
  const isTeenager = character.age >= 13 && character.age <= 19;
  const isYoungAdult = character.age >= 20;

  // Example activity event
  const handleActivityEvent = (activity: string) => {
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
                // Update stats
              },
            },
            {
              id: 'go-moderate',
              text: 'Y aller mais rester raisonnable',
              emoji: '😎',
              action: () => {
                // Update stats
              },
            },
            {
              id: 'stay-home',
              text: 'Rester à la maison',
              emoji: '🏠',
              action: () => {
                // Update stats
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
                // Update stats
              },
            },
            {
              id: 'strategy-games',
              text: 'Jeux de stratégie',
              emoji: '🧩',
              action: () => {
                // Update stats
              },
            },
            {
              id: 'social-games',
              text: 'Jeux multijoueur avec des amis',
              emoji: '👥',
              action: () => {
                // Update stats
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
                // Update stats
              },
            },
            {
              id: 'rock-music',
              text: 'Rock',
              emoji: '🎸',
              action: () => {
                // Update stats
              },
            },
            {
              id: 'rap-music',
              text: 'Rap',
              emoji: '🎤',
              action: () => {
                // Update stats
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
                // Update stats
              },
            },
            {
              id: 'skip-it',
              text: 'Faire autre chose',
              emoji: '👎',
              action: () => {
                // Update stats
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activités d'Adolescent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('games')}
                >
                  <Gamepad className="mr-2 h-4 w-4" />
                  Jeux Vidéo
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('music')}
                >
                  <Music className="mr-2 h-4 w-4" />
                  Écouter de la Musique
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('movies')}
                >
                  <Film className="mr-2 h-4 w-4" />
                  Regarder des Films
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('read')}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Lire
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('party')}
                >
                  <PartyPopper className="mr-2 h-4 w-4" />
                  Faire la Fête
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('shop')}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Young Adult Activities */}
        {isYoungAdult && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activités de Jeune Adulte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('apartment')}
                >
                  <Gamepad className="mr-2 h-4 w-4" />
                  Chercher un Appartement
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('driving')}
                >
                  <Music className="mr-2 h-4 w-4" />
                  Passer le Permis
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('travel')}
                >
                  <Film className="mr-2 h-4 w-4" />
                  Voyager
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('invest')}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Investir
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Social Activities */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activités Sociales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-auto py-3 justify-start"
                onClick={() => handleActivityEvent('friends')}
              >
                <Gamepad className="mr-2 h-4 w-4" />
                Sortir avec des Amis
              </Button>
              
              {character.age >= 15 && (
                <Button
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleActivityEvent('date')}
                >
                  <Music className="mr-2 h-4 w-4" />
                  Rendez-vous Amoureux
                </Button>
              )}
              
              <Button
                variant="outline"
                className="h-auto py-3 justify-start"
                onClick={() => handleActivityEvent('family')}
              >
                <Film className="mr-2 h-4 w-4" />
                Temps en Famille
              </Button>
              
              <Button
                variant="outline"
                className="h-auto py-3 justify-start"
                onClick={() => handleActivityEvent('social-media')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Réseaux Sociaux
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivitiesTab;

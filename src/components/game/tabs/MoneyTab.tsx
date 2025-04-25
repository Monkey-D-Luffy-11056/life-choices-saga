
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, CreditCard, ShoppingBag, BanknoteIcon, TrendingUp, Home } from 'lucide-react';

const MoneyTab = () => {
  const { gameState, triggerEvent, addMoney } = useGame();
  const { character } = gameState;

  if (!character) return null;

  // Money event handlers
  const handleWorkEvent = () => {
    if (character.job) {
      // If already has a job
      triggerEvent({
        id: 'work-extra-event',
        title: 'Travailler plus',
        description: 'Tu peux faire des heures supplémentaires pour gagner plus d\'argent.',
        choices: [
          {
            id: 'work-extra',
            text: 'Travailler plus',
            emoji: '💼',
            action: () => {
              addMoney(character.job?.salary ? character.job.salary * 0.1 : 0);
            },
          },
          {
            id: 'no-extra',
            text: 'Maintenir l\'équilibre travail-vie',
            emoji: '⚖️',
            action: () => {
              // No extra money but better happiness
            },
          },
        ],
      });
    } else {
      // If doesn't have a job
      triggerEvent({
        id: 'find-job-event',
        title: 'Chercher un Emploi',
        description: 'Tu as besoin d\'un emploi pour gagner de l\'argent.',
        choices: [
          {
            id: 'job-search',
            text: 'Chercher un emploi',
            emoji: '🔍',
            action: () => {
              // Logic to find a job
            },
          },
          {
            id: 'part-time',
            text: 'Trouver un job étudiant',
            emoji: '🍔',
            action: () => {
              // Logic for part-time job
            },
          },
        ],
      });
    }
  };

  const handleShopEvent = () => {
    triggerEvent({
      id: 'shopping-event',
      title: 'Faire du Shopping',
      description: 'Que veux-tu acheter?',
      choices: [
        {
          id: 'buy-clothes',
          text: 'Vêtements',
          emoji: '👕',
          action: () => {
            addMoney(-50);
          },
        },
        {
          id: 'buy-electronics',
          text: 'Électronique',
          emoji: '📱',
          action: () => {
            addMoney(-200);
          },
        },
        {
          id: 'buy-food',
          text: 'Nourriture',
          emoji: '🍕',
          action: () => {
            addMoney(-30);
          },
        },
      ],
    });
  };

  const handleInvestEvent = () => {
    triggerEvent({
      id: 'invest-event',
      title: 'Investir',
      description: 'Où veux-tu investir ton argent?',
      choices: [
        {
          id: 'invest-stocks',
          text: 'Actions',
          emoji: '📈',
          action: () => {
            // Investment logic
          },
        },
        {
          id: 'invest-savings',
          text: 'Compte Épargne',
          emoji: '🏦',
          action: () => {
            // Savings logic
          },
        },
        {
          id: 'invest-education',
          text: 'Éducation',
          emoji: '🎓',
          action: () => {
            // Education investment logic
          },
        },
      ],
    });
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Balance Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Finances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-game-primary/10 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-500 mb-1">Solde actuel</div>
              <div className="text-2xl font-bold">{character.money.toLocaleString('fr-FR')} €</div>
            </div>
            
            {character.job && (
              <div className="flex justify-between items-center text-sm">
                <span>Revenu mensuel</span>
                <span className="font-medium text-green-600">{(character.job.salary / 12).toLocaleString('fr-FR')} €</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Money Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Actions Financières</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleWorkEvent}
              >
                <BanknoteIcon className="mr-2 h-4 w-4" />
                {character.job ? 'Travailler plus' : 'Chercher un emploi'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleShopEvent}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Faire du Shopping
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleInvestEvent}
                disabled={character.money < 100}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Investir
              </Button>
              
              {character.age >= 18 && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    // Housing event
                  }}
                  disabled={character.money < 1000}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Logement
                </Button>
              )}
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  // Bank account event
                }}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Compte Bancaire
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Financial Tips */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conseils Financiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="flex items-start">
                <span className="mr-2 text-lg">💰</span>
                <span>Économise régulièrement pour atteindre tes objectifs financiers.</span>
              </p>
              
              <p className="flex items-start">
                <span className="mr-2 text-lg">📊</span>
                <span>Investir tôt peut t'aider à faire fructifier ton argent sur le long terme.</span>
              </p>
              
              <p className="flex items-start">
                <span className="mr-2 text-lg">💳</span>
                <span>Évite les dettes inutiles et apprends à gérer ton budget.</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoneyTab;

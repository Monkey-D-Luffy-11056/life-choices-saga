
import React, { useState } from 'react';
import { useGame } from '../../../contexts/GameContext';
import { Wallet, CreditCard, ShoppingBag, BanknoteIcon, TrendingUp, Home, PiggyBank, Landmark, Slash, DollarSign } from 'lucide-react';

const MoneyTab = () => {
  const { gameState, triggerEvent, addMoney } = useGame();
  const { character } = gameState;
  const [investments, setInvestments] = useState([]);
  
  if (!character) return null;

  // Add basic investments if none exist yet
  React.useEffect(() => {
    if (investments.length === 0) {
      setInvestments([
        {
          id: 'savings',
          name: 'Compte Épargne',
          amount: 0,
          interest: 0.01,
          risk: 'Faible',
          icon: '🏦'
        },
        {
          id: 'stocks',
          name: 'Actions',
          amount: 0,
          interest: 0.05,
          risk: 'Moyen',
          icon: '📈'
        },
        {
          id: 'crypto',
          name: 'Crypto-monnaies',
          amount: 0,
          interest: 0.10,
          risk: 'Élevé',
          icon: '💰'
        }
      ]);
    }
  }, [investments.length]);

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
              addMoney(character.job?.salary ? Math.floor(character.job.salary * 0.05) : 0);
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
              // We'll add a simple temporary job
              addMoney(50);
              triggerEvent({
                id: 'part-time-result',
                title: 'Job Étudiant',
                description: 'Tu as travaillé quelques heures dans un magasin local et gagné 50 €.',
                choices: [
                  {
                    id: 'ok',
                    text: 'Super',
                    emoji: '👍',
                    action: () => {},
                  }
                ],
              });
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
            if (character.money < 50) {
              triggerEvent({
                id: 'not-enough-money',
                title: 'Pas assez d\'argent',
                description: 'Tu n\'as pas assez d\'argent pour acheter ces vêtements.',
                choices: [
                  {
                    id: 'ok',
                    text: 'D\'accord',
                    emoji: '😔',
                    action: () => {},
                  }
                ],
              });
            } else {
              addMoney(-50);
            }
          },
        },
        {
          id: 'buy-electronics',
          text: 'Électronique',
          emoji: '📱',
          action: () => {
            if (character.money < 200) {
              triggerEvent({
                id: 'not-enough-money',
                title: 'Pas assez d\'argent',
                description: 'Tu n\'as pas assez d\'argent pour acheter cet appareil électronique.',
                choices: [
                  {
                    id: 'ok',
                    text: 'D\'accord',
                    emoji: '😔',
                    action: () => {},
                  }
                ],
              });
            } else {
              addMoney(-200);
            }
          },
        },
        {
          id: 'buy-food',
          text: 'Nourriture',
          emoji: '🍕',
          action: () => {
            if (character.money < 30) {
              triggerEvent({
                id: 'not-enough-money',
                title: 'Pas assez d\'argent',
                description: 'Tu n\'as pas assez d\'argent pour acheter cette nourriture.',
                choices: [
                  {
                    id: 'ok',
                    text: 'D\'accord',
                    emoji: '😔',
                    action: () => {},
                  }
                ],
              });
            } else {
              addMoney(-30);
            }
          },
        },
      ],
    });
  };

  const handleInvestEvent = () => {
    if (character.money < 100) {
      triggerEvent({
        id: 'not-enough-money',
        title: 'Pas assez d\'argent',
        description: 'Tu as besoin d\'au moins 100 € pour commencer à investir.',
        choices: [
          {
            id: 'ok',
            text: 'D\'accord',
            emoji: '💸',
            action: () => {},
          }
        ],
      });
      return;
    }
    
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
            const investAmount = Math.min(character.money, 500);
            addMoney(-investAmount);
            
            // Update investments
            setInvestments(prev => prev.map(inv => 
              inv.id === 'stocks' 
                ? {...inv, amount: inv.amount + investAmount} 
                : inv
            ));
            
            triggerEvent({
              id: 'investment-made',
              title: 'Investissement Réalisé',
              description: `Tu as investi ${investAmount} € en actions. Cet investissement pourrait croître avec le temps.`,
              choices: [
                {
                  id: 'ok',
                  text: 'Excellent',
                  emoji: '👍',
                  action: () => {},
                }
              ],
            });
          },
        },
        {
          id: 'invest-savings',
          text: 'Compte Épargne',
          emoji: '🏦',
          action: () => {
            const investAmount = Math.min(character.money, 300);
            addMoney(-investAmount);
            
            // Update investments
            setInvestments(prev => prev.map(inv => 
              inv.id === 'savings' 
                ? {...inv, amount: inv.amount + investAmount} 
                : inv
            ));
            
            triggerEvent({
              id: 'savings-made',
              title: 'Épargne Réalisée',
              description: `Tu as déposé ${investAmount} € sur ton compte épargne. Cet argent est en sécurité et rapporte un petit intérêt.`,
              choices: [
                {
                  id: 'ok',
                  text: 'Super',
                  emoji: '👍',
                  action: () => {},
                }
              ],
            });
          },
        },
        {
          id: 'invest-crypto',
          text: 'Crypto-monnaies',
          emoji: '💰',
          action: () => {
            const investAmount = Math.min(character.money, 200);
            addMoney(-investAmount);
            
            // Update investments
            setInvestments(prev => prev.map(inv => 
              inv.id === 'crypto' 
                ? {...inv, amount: inv.amount + investAmount} 
                : inv
            ));
            
            triggerEvent({
              id: 'crypto-made',
              title: 'Investissement en Crypto',
              description: `Tu as investi ${investAmount} € en crypto-monnaies. C'est risqué mais potentiellement très lucratif.`,
              choices: [
                {
                  id: 'ok',
                  text: 'Croisons les doigts',
                  emoji: '🤞',
                  action: () => {},
                }
              ],
            });
          },
        },
      ],
    });
  };
  
  const handleBankAccountEvent = () => {
    triggerEvent({
      id: 'bank-account',
      title: 'Compte Bancaire',
      description: 'Que veux-tu faire avec ton compte bancaire?',
      choices: [
        {
          id: 'view-balance',
          text: 'Consulter le solde',
          emoji: '🔍',
          action: () => {
            triggerEvent({
              id: 'account-balance',
              title: 'Solde du Compte',
              description: `Tu as actuellement ${character.money.toLocaleString('fr-FR')} € sur ton compte.`,
              choices: [
                {
                  id: 'ok',
                  text: 'OK',
                  emoji: '👍',
                  action: () => {},
                }
              ],
            });
          },
        },
        {
          id: 'open-savings',
          text: 'Ouvrir un compte épargne',
          emoji: '🏦',
          action: () => {
            // Check if already has savings
            const hasSavings = investments.find(inv => inv.id === 'savings')?.amount > 0;
            
            if (hasSavings) {
              triggerEvent({
                id: 'already-has-savings',
                title: 'Compte d\'épargne existant',
                description: 'Tu as déjà un compte d\'épargne. Tu peux y ajouter de l\'argent en choisissant \"Investir\" puis \"Compte Épargne\".',
                choices: [
                  {
                    id: 'ok',
                    text: 'D\'accord',
                    emoji: '👍',
                    action: () => {},
                  }
                ],
              });
            } else {
              const initialDeposit = Math.min(character.money, 100);
              if (character.money < initialDeposit) {
                triggerEvent({
                  id: 'not-enough-money',
                  title: 'Pas assez d\'argent',
                  description: `Tu as besoin d'au moins ${initialDeposit} € pour ouvrir un compte d'épargne.`,
                  choices: [
                    {
                      id: 'ok',
                      text: 'D\'accord',
                      emoji: '😔',
                      action: () => {},
                    }
                  ],
                });
              } else {
                addMoney(-initialDeposit);
                
                // Update investments
                setInvestments(prev => prev.map(inv => 
                  inv.id === 'savings' 
                    ? {...inv, amount: inv.amount + initialDeposit} 
                    : inv
                ));
                
                triggerEvent({
                  id: 'savings-account-opened',
                  title: 'Compte d\'Épargne Ouvert',
                  description: `Tu as ouvert un compte d'épargne avec un dépôt initial de ${initialDeposit} €. Félicitations pour cette décision financière responsable!`,
                  choices: [
                    {
                      id: 'ok',
                      text: 'Super',
                      emoji: '👍',
                      action: () => {},
                    }
                  ],
                });
              }
            }
          },
        },
        {
          id: 'loan',
          text: 'Demander un prêt',
          emoji: '💳',
          action: () => {
            if (character.age < 18) {
              triggerEvent({
                id: 'too-young-for-loan',
                title: 'Trop Jeune',
                description: 'Tu dois avoir au moins 18 ans pour demander un prêt.',
                choices: [
                  {
                    id: 'ok',
                    text: 'D\'accord',
                    emoji: '😔',
                    action: () => {},
                  }
                ],
              });
            } else {
              triggerEvent({
                id: 'loan-options',
                title: 'Options de Prêt',
                description: 'Quel type de prêt souhaites-tu demander?',
                choices: [
                  {
                    id: 'small-loan',
                    text: 'Petit prêt (500 €)',
                    emoji: '💵',
                    action: () => {
                      addMoney(500);
                      // In a full implementation, we'd track the loan and interest
                    },
                  },
                  {
                    id: 'medium-loan',
                    text: 'Prêt moyen (2000 €)',
                    emoji: '💶',
                    action: () => {
                      addMoney(2000);
                      // In a full implementation, we'd track the loan and interest
                    },
                  },
                  {
                    id: 'no-loan',
                    text: 'Finalement, non',
                    emoji: '🚶',
                    action: () => {},
                  },
                ],
              });
            }
          },
        },
      ],
    });
  };
  
  // Housing event - for adult characters
  const handleHousingEvent = () => {
    if (character.age < 18) {
      triggerEvent({
        id: 'too-young-for-housing',
        title: 'Trop Jeune',
        description: 'Tu dois avoir au moins 18 ans pour chercher ton propre logement.',
        choices: [
          {
            id: 'ok',
            text: 'D\'accord',
            emoji: '😔',
            action: () => {},
          }
        ],
      });
      return;
    }
    
    triggerEvent({
      id: 'housing-options',
      title: 'Options de Logement',
      description: 'Quel type de logement cherches-tu?',
      choices: [
        {
          id: 'rent',
          text: 'Louer un appartement',
          emoji: '🏢',
          action: () => {
            if (character.money < 1000) {
              triggerEvent({
                id: 'not-enough-money',
                title: 'Pas assez d\'argent',
                description: 'Tu as besoin d\'au moins 1000 € pour la caution et le premier loyer.',
                choices: [
                  {
                    id: 'ok',
                    text: 'D\'accord',
                    emoji: '😔',
                    action: () => {},
                  }
                ],
              });
            } else {
              addMoney(-1000);
              triggerEvent({
                id: 'apartment-rented',
                title: 'Appartement Loué',
                description: 'Tu as loué un petit appartement. Tu devras payer un loyer tous les mois, mais tu as maintenant ton propre espace!',
                choices: [
                  {
                    id: 'ok',
                    text: 'Emménager',
                    emoji: '🎉',
                    action: () => {},
                  }
                ],
              });
            }
          },
        },
        {
          id: 'buy',
          text: 'Acheter une maison',
          emoji: '🏠',
          action: () => {
            if (character.money < 10000) {
              triggerEvent({
                id: 'not-enough-money',
                title: 'Pas assez d\'argent',
                description: 'Tu as besoin d\'au moins 10000 € pour l\'apport initial d\'une maison.',
                choices: [
                  {
                    id: 'ok',
                    text: 'D\'accord',
                    emoji: '😔',
                    action: () => {},
                  }
                ],
              });
            } else {
              addMoney(-10000);
              triggerEvent({
                id: 'house-bought',
                title: 'Maison Achetée',
                description: 'Tu as acheté une petite maison! Tu devras payer des mensualités de prêt, mais c\'est un bon investissement à long terme.',
                choices: [
                  {
                    id: 'ok',
                    text: 'Emménager',
                    emoji: '🎉',
                    action: () => {},
                  }
                ],
              });
            }
          },
        },
        {
          id: 'roommate',
          text: 'Colocation',
          emoji: '👥',
          action: () => {
            if (character.money < 500) {
              triggerEvent({
                id: 'not-enough-money',
                title: 'Pas assez d\'argent',
                description: 'Tu as besoin d\'au moins 500 € pour la caution et le premier loyer en colocation.',
                choices: [
                  {
                    id: 'ok',
                    text: 'D\'accord',
                    emoji: '😔',
                    action: () => {},
                  }
                ],
              });
            } else {
              addMoney(-500);
              triggerEvent({
                id: 'roommate-found',
                title: 'Colocation Trouvée',
                description: 'Tu as trouvé une colocation! Le loyer est moins cher, mais tu devras partager ton espace.',
                choices: [
                  {
                    id: 'ok',
                    text: 'Emménager',
                    emoji: '🎉',
                    action: () => {},
                  }
                ],
              });
            }
          },
        },
      ],
    });
  };
  
  // Check investments return
  const handleCheckInvestments = () => {
    if (investments.every(inv => inv.amount === 0)) {
      triggerEvent({
        id: 'no-investments',
        title: 'Pas d\'Investissements',
        description: 'Tu n\'as pas encore d\'investissements. Utilise l\'option "Investir" pour commencer.',
        choices: [
          {
            id: 'ok',
            text: 'D\'accord',
            emoji: '👍',
            action: () => {},
          }
        ],
      });
      return;
    }
    
    // Calculate returns on investments
    let totalReturn = 0;
    const updatedInvestments = investments.map(inv => {
      if (inv.amount > 0) {
        const returnAmount = Math.floor(inv.amount * inv.interest);
        totalReturn += returnAmount;
        return {...inv, amount: inv.amount + returnAmount};
      }
      return inv;
    });
    
    setInvestments(updatedInvestments);
    
    triggerEvent({
      id: 'investment-returns',
      title: 'Rendement des Investissements',
      description: `Tes investissements ont généré un rendement de ${totalReturn} €.`,
      choices: [
        {
          id: 'ok',
          text: 'Excellent',
          emoji: '💰',
          action: () => {},
        }
      ],
    });
  };
  
  // Withdraw from investments
  const handleWithdrawInvestments = () => {
    if (investments.every(inv => inv.amount === 0)) {
      triggerEvent({
        id: 'no-investments',
        title: 'Pas d\'Investissements',
        description: 'Tu n\'as pas encore d\'investissements. Utilise l\'option "Investir" pour commencer.',
        choices: [
          {
            id: 'ok',
            text: 'D\'accord',
            emoji: '👍',
            action: () => {},
          }
        ],
      });
      return;
    }
    
    triggerEvent({
      id: 'withdraw-options',
      title: 'Retirer des Investissements',
      description: 'De quel investissement veux-tu retirer des fonds?',
      choices: investments.filter(inv => inv.amount > 0).map(inv => ({
        id: `withdraw-${inv.id}`,
        text: `${inv.name} (${inv.amount} €)`,
        emoji: inv.icon,
        action: () => {
          addMoney(inv.amount);
          
          // Update investments
          setInvestments(prev => prev.map(i => 
            i.id === inv.id ? {...i, amount: 0} : i
          ));
          
          triggerEvent({
            id: 'withdraw-complete',
            title: 'Retrait Effectué',
            description: `Tu as retiré ${inv.amount} € de ton investissement en ${inv.name}.`,
            choices: [
              {
                id: 'ok',
                text: 'OK',
                emoji: '💰',
                action: () => {},
              }
            ],
          });
        },
      })).concat([{
        id: 'cancel-withdraw',
        text: 'Annuler',
        emoji: '❌',
        action: () => {},
      }]),
    });
  };

  // Calculate total investments
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const netWorth = character.money + totalInvestments;

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Balance Card */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-xl flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Finances
            </h3>
          </div>
          <div className="card-content">
            <div className="bg-game-primary/10 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-500 mb-1">Solde actuel</div>
              <div className="text-2xl font-bold">{character.money.toLocaleString('fr-FR')} €</div>
            </div>
            
            {/* Net worth */}
            <div className="flex justify-between items-center text-sm mb-3">
              <span>Patrimoine total</span>
              <span className="font-medium">{netWorth.toLocaleString('fr-FR')} €</span>
            </div>
            
            {/* Income */}
            {character.job && (
              <div className="flex justify-between items-center text-sm">
                <span>Revenu mensuel</span>
                <span className="font-medium text-green-600">{(character.job.salary / 12).toLocaleString('fr-FR')} €</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Investments Card */}
        {investments.length > 0 && (
          <div className="card">
            <div className="card-header pb-2">
              <h3 className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Investissements
              </h3>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                {investments.map(investment => (
                  <div key={investment.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{investment.icon}</span>
                      <div>
                        <p className="font-medium">{investment.name}</p>
                        <p className="text-xs text-gray-500">Risque {investment.risk}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{investment.amount.toLocaleString('fr-FR')} €</p>
                      <p className="text-xs text-green-600">+{(investment.interest * 100).toFixed(1)}% / an</p>
                    </div>
                  </div>
                ))}
                
                <div className="flex space-x-2 mt-3">
                  <button 
                    className="button button-sm button-outline flex-1"
                    onClick={handleCheckInvestments}
                  >
                    Vérifier rendements
                  </button>
                  <button 
                    className="button button-sm button-outline flex-1"
                    onClick={handleWithdrawInvestments}
                  >
                    Retirer fonds
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Money Actions */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">Actions Financières</h3>
          </div>
          <div className="card-content">
            <div className="space-y-2">
              <button
                className="button button-outline w-full justify-start"
                onClick={handleWorkEvent}
              >
                <BanknoteIcon className="mr-2 h-4 w-4" />
                {character.job ? 'Travailler plus' : 'Chercher un emploi'}
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleShopEvent}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Faire du Shopping
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleInvestEvent}
                disabled={character.money < 100}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Investir
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleHousingEvent}
              >
                <Home className="mr-2 h-4 w-4" />
                Logement
              </button>
              
              <button
                className="button button-outline w-full justify-start"
                onClick={handleBankAccountEvent}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Compte Bancaire
              </button>
              
              {character.age >= 18 && (
                <button
                  className="button button-outline w-full justify-start"
                  onClick={() => {
                    // Tax event
                    triggerEvent({
                      id: 'taxes',
                      title: 'Impôts',
                      description: 'C\'est la période de déclaration d\'impôts.',
                      choices: [
                        {
                          id: 'pay-taxes',
                          text: 'Payer honnêtement',
                          emoji: '📝',
                          action: () => {
                            // In a full implementation, would calculate based on income
                            const taxAmount = Math.floor(character.money * 0.1);
                            addMoney(-taxAmount);
                          },
                        },
                        {
                          id: 'evade-taxes',
                          text: 'Essayer d\'éviter des impôts',
                          emoji: '🕵️',
                          action: () => {
                            // Risk of getting caught
                            if (Math.random() < 0.3) {
                              const penalty = Math.floor(character.money * 0.2);
                              addMoney(-penalty);
                              triggerEvent({
                                id: 'caught-tax-evasion',
                                title: 'Fraude Fiscale Détectée',
                                description: `Tu as été pris(e) en train d'éviter des impôts et tu dois payer une amende de ${penalty.toLocaleString('fr-FR')} €!`,
                                choices: [
                                  {
                                    id: 'pay-penalty',
                                    text: 'Payer l\'amende',
                                    emoji: '😓',
                                    action: () => {},
                                  }
                                ],
                              });
                            }
                          },
                        },
                      ],
                    });
                  }}
                >
                  <Landmark className="mr-2 h-4 w-4" />
                  Impôts
                </button>
              )}
              
              {character.age >= 25 && (
                <button
                  className="button button-outline w-full justify-start"
                  onClick={() => {
                    // Budget planning
                    triggerEvent({
                      id: 'budget-planning',
                      title: 'Planning Budgétaire',
                      description: 'Veux-tu établir un budget mensuel?',
                      choices: [
                        {
                          id: 'make-budget',
                          text: 'Créer un budget',
                          emoji: '📊',
                          action: () => {
                            // In a full implementation, would create a budget system
                          },
                        },
                        {
                          id: 'no-budget',
                          text: 'Pas maintenant',
                          emoji: '👋',
                          action: () => {},
                        },
                      ],
                    });
                  }}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Planifier Budget
                </button>
              )}
              
              {character.job && (
                <button
                  className="button button-outline w-full justify-start"
                  onClick={() => {
                    // Expenses
                    const monthlyExpenses = Math.floor((character.job.salary / 12) * 0.7);
                    triggerEvent({
                      id: 'monthly-expenses',
                      title: 'Dépenses Mensuelles',
                      description: `Tes dépenses mensuelles (loyer, nourriture, factures, etc.) s'élèvent à environ ${monthlyExpenses.toLocaleString('fr-FR')} €.`,
                      choices: [
                        {
                          id: 'reduce-expenses',
                          text: 'Essayer de réduire',
                          emoji: '✂️',
                          action: () => {
                            // In a full implementation, would affect lifestyle and happiness
                          },
                        },
                        {
                          id: 'accept-expenses',
                          text: 'Accepter ces dépenses',
                          emoji: '👍',
                          action: () => {},
                        },
                      ],
                    });
                  }}
                >
                  <Slash className="mr-2 h-4 w-4" />
                  Gérer Dépenses
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Financial Tips */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">Conseils Financiers</h3>
          </div>
          <div className="card-content">
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
              
              <p className="flex items-start">
                <span className="mr-2 text-lg">🏠</span>
                <span>Un logement est une dépense importante mais nécessaire - compare les options.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyTab;

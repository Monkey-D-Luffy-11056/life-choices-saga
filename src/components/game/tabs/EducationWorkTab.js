
import React from 'react';
import { useGame } from '../../../contexts/GameContext';
import StatusBar from '../StatusBar';
import { BookOpen, GraduationCap, School, Briefcase, Trophy, Laptop, Building, ChevronUp, Pencil, Book } from 'lucide-react';

const EducationWorkTab = () => {
  const { gameState, updateStat, triggerEvent, updateEducation, setJob } = useGame();
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
            updateStat('intelligence', 5);
            updateStat('happiness', -2);
            updateEducation({ grades: Math.min(100, character.education.grades + 3) });
          },
        },
        {
          id: 'study-moderate',
          text: 'Étudier modérément',
          emoji: '📖',
          action: () => {
            updateStat('intelligence', 2);
            updateStat('happiness', 0);
            updateEducation({ grades: Math.min(100, character.education.grades + 1) });
          },
        },
        {
          id: 'skip-study',
          text: 'Sécher les cours',
          emoji: '🎮',
          action: () => {
            updateStat('intelligence', -1);
            updateStat('happiness', 3);
            updateEducation({ grades: Math.max(0, character.education.grades - 2) });
          },
        },
      ],
    });
  };
  
  // Take exam event
  const handleExamEvent = () => {
    triggerEvent({
      id: 'exam-event',
      title: 'Examen Important',
      description: 'Tu as un examen important. Comment te prépares-tu?',
      choices: [
        {
          id: 'cram',
          text: 'Réviser toute la nuit',
          emoji: '🌙',
          action: () => {
            const success = Math.random() < (character.stats.intelligence / 100) * 0.8;
            if (success) {
              updateStat('intelligence', 3);
              updateEducation({ grades: Math.min(100, character.education.grades + 5) });
              triggerEvent({
                id: 'exam-result-good',
                title: 'Résultat d\'examen',
                description: 'Malgré ta fatigue, tu as réussi l\'examen avec une bonne note!',
                choices: [
                  {
                    id: 'celebrate',
                    text: 'Célébrer',
                    emoji: '🎉',
                    action: () => {
                      updateStat('happiness', 5);
                    },
                  }
                ],
              });
            } else {
              updateStat('intelligence', 1);
              updateEducation({ grades: Math.max(0, character.education.grades - 2) });
              triggerEvent({
                id: 'exam-result-bad',
                title: 'Résultat d\'examen',
                description: 'Tu étais trop fatigué(e) pour te concentrer et tu as raté l\'examen.',
                choices: [
                  {
                    id: 'accept',
                    text: 'Accepter la défaite',
                    emoji: '😔',
                    action: () => {
                      updateStat('happiness', -3);
                    },
                  }
                ],
              });
            }
          },
        },
        {
          id: 'balance',
          text: 'Réviser et bien dormir',
          emoji: '⚖️',
          action: () => {
            const success = Math.random() < (character.stats.intelligence / 100) * 0.9;
            if (success) {
              updateStat('intelligence', 2);
              updateEducation({ grades: Math.min(100, character.education.grades + 4) });
              triggerEvent({
                id: 'exam-result-good',
                title: 'Résultat d\'examen',
                description: 'Ton approche équilibrée a payé! Tu as réussi l\'examen avec une bonne note!',
                choices: [
                  {
                    id: 'celebrate',
                    text: 'Célébrer',
                    emoji: '🎉',
                    action: () => {
                      updateStat('happiness', 4);
                    },
                  }
                ],
              });
            } else {
              updateEducation({ grades: Math.min(100, character.education.grades + 1) });
              triggerEvent({
                id: 'exam-result-average',
                title: 'Résultat d\'examen',
                description: 'Tu as obtenu une note moyenne à l\'examen.',
                choices: [
                  {
                    id: 'accept',
                    text: 'C\'est mieux que rien',
                    emoji: '🤷',
                    action: () => {},
                  }
                ],
              });
            }
          },
        },
        {
          id: 'cheat',
          text: 'Essayer de tricher',
          emoji: '👀',
          action: () => {
            const caught = Math.random() < 0.3;
            if (caught) {
              updateStat('popularity', -5);
              updateEducation({ grades: Math.max(0, character.education.grades - 15) });
              triggerEvent({
                id: 'caught-cheating',
                title: 'Pris(e) en train de tricher',
                description: 'Tu as été surpris(e) en train de tricher! Tes professeurs sont très déçus.',
                choices: [
                  {
                    id: 'apologize',
                    text: 'S\'excuser',
                    emoji: '😢',
                    action: () => {
                      updateStat('happiness', -5);
                    },
                  }
                ],
              });
            } else {
              updateEducation({ grades: Math.min(100, character.education.grades + 5) });
              triggerEvent({
                id: 'cheating-success',
                title: 'Résultat d\'examen',
                description: 'Tu as réussi à tricher sans te faire prendre et as eu une bonne note... mais tu te sens un peu coupable.',
                choices: [
                  {
                    id: 'guilt',
                    text: 'Accepter la culpabilité',
                    emoji: '😬',
                    action: () => {
                      updateStat('happiness', -1);
                    },
                  }
                ],
              });
            }
          },
        },
      ],
    });
  };

  // Example work event
  const handleWorkEvent = () => {
    if (character.job) {
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
              updateStat('wealth', 3);
              updateStat('happiness', -2);
              // Chance for promotion
              if (Math.random() < 0.1) {
                promotionEvent();
              }
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
              // Risk getting fired
              if (Math.random() < 0.3) {
                setJob(null);
                triggerEvent({
                  id: 'fired',
                  title: 'Licencié(e)!',
                  description: 'Ton patron n\'a pas apprécié ton attitude et t\'a licencié(e)!',
                  choices: [
                    {
                      id: 'accept-firing',
                      text: 'Chercher un nouvel emploi',
                      emoji: '🔍',
                      action: () => {
                        updateStat('happiness', -5);
                      },
                    }
                  ],
                });
              }
            },
          },
        ],
      });
    } else {
      // Looking for a job
      handleJobSearchEvent();
    }
  };
  
  // Job search event
  const handleJobSearchEvent = () => {
    // Different jobs based on education level
    let availableJobs = [];
    
    if (character.education.level === 'high' || character.education.level === 'university') {
      availableJobs = [
        {
          title: 'Serveur/Serveuse',
          company: 'Restaurant Le Bon Plat',
          salary: 18000,
          satisfaction: 60
        },
        {
          title: 'Vendeur/Vendeuse',
          company: 'Magasin Tendance',
          salary: 19000,
          satisfaction: 65
        },
        {
          title: 'Assistant(e) administratif/ve',
          company: 'Bureau Local',
          salary: 22000,
          satisfaction: 70
        }
      ];
    }
    
    if (character.education.level === 'university' || character.education.level === 'graduate') {
      availableJobs = [
        {
          title: 'Développeur Web Junior',
          company: 'Tech Solutions',
          salary: 28000,
          satisfaction: 75
        },
        {
          title: 'Assistant(e) Marketing',
          company: 'Agence Créative',
          salary: 26000,
          satisfaction: 80
        },
        {
          title: 'Chef de Projet Junior',
          company: 'Innovations Inc.',
          salary: 30000,
          satisfaction: 70
        }
      ];
    }
    
    if (character.education.level === 'graduate') {
      availableJobs = [
        {
          title: 'Analyste Financier',
          company: 'BanqueVest',
          salary: 45000,
          satisfaction: 75
        },
        {
          title: 'Ingénieur Logiciel',
          company: 'Software Express',
          salary: 48000,
          satisfaction: 85
        },
        {
          title: 'Consultant en Management',
          company: 'ConsultGroup',
          salary: 50000,
          satisfaction: 70
        }
      ];
    }
    
    // No jobs available with too low education
    if (availableJobs.length === 0) {
      triggerEvent({
        id: 'no-jobs',
        title: 'Recherche d\'emploi',
        description: 'Tu n\'as pas assez d\'éducation pour postuler à des emplois intéressants. Continue tes études!',
        choices: [
          {
            id: 'ok',
            text: 'D\'accord',
            emoji: '📚',
            action: () => {},
          }
        ],
      });
      return;
    }
    
    // Randomly select job offers
    const job1 = availableJobs[Math.floor(Math.random() * availableJobs.length)];
    let job2;
    do {
      job2 = availableJobs[Math.floor(Math.random() * availableJobs.length)];
    } while (job2.title === job1.title);
    
    // Present job choices
    triggerEvent({
      id: 'job-search',
      title: 'Offres d\'emploi',
      description: 'Tu as reçu deux offres d\'emploi. Laquelle choisis-tu?',
      choices: [
        {
          id: 'job1',
          text: `${job1.title} - ${job1.company} (${job1.salary.toLocaleString('fr-FR')} €)`,
          emoji: '💼',
          action: () => {
            setJob(job1);
            updateStat('happiness', 5);
            updateStat('wealth', 3);
          },
        },
        {
          id: 'job2',
          text: `${job2.title} - ${job2.company} (${job2.salary.toLocaleString('fr-FR')} €)`,
          emoji: '💼',
          action: () => {
            setJob(job2);
            updateStat('happiness', 5);
            updateStat('wealth', 3);
          },
        },
        {
          id: 'reject-both',
          text: 'Continuer à chercher',
          emoji: '🔍',
          action: () => {
            // Nothing happens, continue searching
          },
        },
      ],
    });
  };
  
  // Promotion event
  const promotionEvent = () => {
    if (!character.job) return;
    
    const currentSalary = character.job.salary;
    const newSalary = Math.floor(currentSalary * 1.15);
    
    triggerEvent({
      id: 'promotion',
      title: 'Promotion!',
      description: 'Ton patron est impressionné par ton travail et te propose une promotion!',
      choices: [
        {
          id: 'accept-promotion',
          text: 'Accepter la promotion',
          emoji: '🎉',
          action: () => {
            setJob({
              ...character.job,
              title: 'Senior ' + character.job.title,
              salary: newSalary,
              satisfaction: Math.min(100, character.job.satisfaction + 10)
            });
            updateStat('happiness', 8);
            updateStat('wealth', 5);
          },
        }
      ],
    });
  };
  
  // Join club event
  const handleJoinClubEvent = () => {
    triggerEvent({
      id: 'join-club',
      title: 'Rejoindre un Club',
      description: 'Plusieurs clubs étudiants recrutent. Lequel veux-tu rejoindre?',
      choices: [
        {
          id: 'science-club',
          text: 'Club de Sciences',
          emoji: '🔬',
          action: () => {
            updateStat('intelligence', 3);
            updateStat('popularity', 1);
          },
        },
        {
          id: 'sports-club',
          text: 'Club de Sports',
          emoji: '⚽',
          action: () => {
            updateStat('health', 3);
            updateStat('popularity', 2);
          },
        },
        {
          id: 'art-club',
          text: 'Club d\'Art',
          emoji: '🎨',
          action: () => {
            updateStat('happiness', 3);
            updateStat('intelligence', 1);
            updateStat('popularity', 1);
          },
        },
        {
          id: 'debate-club',
          text: 'Club de Débat',
          emoji: '🎭',
          action: () => {
            updateStat('intelligence', 2);
            updateStat('popularity', 2);
          },
        },
      ],
    });
  };

  // Talk to teacher event
  const handleTalkToTeacherEvent = () => {
    triggerEvent({
      id: 'talk-teacher',
      title: 'Parler à un Professeur',
      description: 'Tu veux parler à un de tes professeurs. Quel est le but de cette conversation?',
      choices: [
        {
          id: 'grade-help',
          text: 'Demander de l\'aide pour tes notes',
          emoji: '📝',
          action: () => {
            updateStat('intelligence', 2);
            updateEducation({ grades: Math.min(100, character.education.grades + 2) });
          },
        },
        {
          id: 'career-advice',
          text: 'Demander des conseils de carrière',
          emoji: '💼',
          action: () => {
            updateStat('intelligence', 1);
            // Add future bonus to job searches
          },
        },
        {
          id: 'personal-chat',
          text: 'Discussion personnelle',
          emoji: '💬',
          action: () => {
            updateStat('happiness', 2);
            // Add a new relationship with the teacher
          },
        },
      ],
    });
  };

  // Ask for raise event
  const handleAskForRaiseEvent = () => {
    if (!character.job) return;
    
    const currentSalary = character.job.salary;
    const newSalary = Math.floor(currentSalary * 1.1);
    const successChance = character.stats.intelligence > 70 ? 0.7 : 0.4;
    
    triggerEvent({
      id: 'ask-for-raise',
      title: 'Demander une Augmentation',
      description: 'Tu veux demander une augmentation à ton patron. Comment approches-tu la situation?',
      choices: [
        {
          id: 'professional',
          text: 'Approche professionnelle',
          emoji: '👔',
          action: () => {
            if (Math.random() < successChance) {
              setJob({
                ...character.job,
                salary: newSalary,
              });
              updateStat('wealth', 3);
              updateStat('happiness', 5);
              triggerEvent({
                id: 'raise-success',
                title: 'Augmentation Accordée!',
                description: 'Ton patron a accepté de t\'accorder une augmentation!',
                choices: [
                  {
                    id: 'thank',
                    text: 'Remercier ton patron',
                    emoji: '😊',
                    action: () => {},
                  }
                ],
              });
            } else {
              triggerEvent({
                id: 'raise-rejected',
                title: 'Augmentation Refusée',
                description: 'Ton patron a refusé ta demande d\'augmentation pour le moment.',
                choices: [
                  {
                    id: 'understand',
                    text: 'Comprendre',
                    emoji: '😔',
                    action: () => {
                      updateStat('happiness', -2);
                    },
                  }
                ],
              });
            }
          },
        },
        {
          id: 'aggressive',
          text: 'Être plus exigeant(e)',
          emoji: '😤',
          action: () => {
            if (Math.random() < (successChance * 0.5)) {
              setJob({
                ...character.job,
                salary: newSalary,
                satisfaction: Math.max(0, character.job.satisfaction - 5),
              });
              updateStat('wealth', 3);
              updateStat('happiness', 3);
              triggerEvent({
                id: 'raise-success-tension',
                title: 'Augmentation Accordée... mais',
                description: 'Tu as obtenu ton augmentation, mais ton attitude a créé des tensions.',
                choices: [
                  {
                    id: 'ok',
                    text: 'Ça valait le coup',
                    emoji: '💰',
                    action: () => {},
                  }
                ],
              });
            } else {
              // High risk of getting in trouble
              updateStat('happiness', -5);
              triggerEvent({
                id: 'raise-big-rejection',
                title: 'Demande Mal Reçue',
                description: 'Ton patron n\'a pas du tout apprécié ton approche et ta demande a été catégoriquement rejetée.',
                choices: [
                  {
                    id: 'apologize',
                    text: 'S\'excuser',
                    emoji: '😓',
                    action: () => {},
                  }
                ],
              });
            }
          },
        },
        {
          id: 'cancel',
          text: 'Finalement, non',
          emoji: '🚶',
          action: () => {
            // Nothing happens
          },
        },
      ],
    });
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-xl flex items-center">
              {isStudent ? (
                <>
                  <School className="mr-2 h-5 w-5" />
                  Éducation
                </>
              ) : (
                <>
                  <Briefcase className="mr-2 h-5 w-5" />
                  Travail
                </>
              )}
            </h3>
          </div>
          <div className="card-content">
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
                      {educationLevel === 'graduate' && 'Diplômé'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {educationLevel === 'primary' && `Année ${character.age - 6}`}
                      {educationLevel === 'middle' && `Année ${character.age - 12}`}
                      {educationLevel === 'high' && `Année ${character.age - 15}`}
                      {educationLevel === 'university' && `Année ${character.age - 18}`}
                    </p>
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
                  <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
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
          </div>
        </div>
        
        {/* Actions */}
        <div className="card">
          <div className="card-header pb-2">
            <h3 className="text-lg">Actions</h3>
          </div>
          <div className="card-content">
            <div className="space-y-2">
              {isStudent ? (
                <>
                  <button
                    className="button button-outline w-full justify-start"
                    onClick={handleStudyEvent}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Étudier
                  </button>
                  
                  <button
                    className="button button-outline w-full justify-start"
                    onClick={handleExamEvent}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Passer un examen
                  </button>
                  
                  <button
                    className="button button-outline w-full justify-start"
                    onClick={handleJoinClubEvent}
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Rejoindre un club
                  </button>
                  
                  <button
                    className="button button-outline w-full justify-start"
                    onClick={handleTalkToTeacherEvent}
                  >
                    <School className="mr-2 h-4 w-4" />
                    Parler à un professeur
                  </button>
                  
                  {character.age >= 16 && (
                    <button
                      className="button button-outline w-full justify-start"
                      onClick={handleJobSearchEvent}
                    >
                      <Laptop className="mr-2 h-4 w-4" />
                      Chercher un emploi à temps partiel
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="button button-outline w-full justify-start"
                    onClick={handleWorkEvent}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Travailler dur
                  </button>
                  
                  <button
                    className="button button-outline w-full justify-start"
                    onClick={() => {
                      // Networking event
                    }}
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Réseauter
                  </button>
                  
                  <button
                    className="button button-outline w-full justify-start"
                    onClick={handleAskForRaiseEvent}
                  >
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Demander une augmentation
                  </button>
                  
                  <button
                    className="button button-outline w-full justify-start"
                    onClick={() => {
                      // Job search for a better position
                      handleJobSearchEvent();
                    }}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Chercher un meilleur emploi
                  </button>
                  
                  {character.education.level !== 'graduate' && (
                    <button
                      className="button button-outline w-full justify-start"
                      onClick={() => {
                        // Back to education
                        setJob(null);
                        triggerEvent({
                          id: 'back-to-school',
                          title: 'Retour aux Études',
                          description: 'Tu as décidé de quitter ton emploi pour reprendre tes études.',
                          choices: [
                            {
                              id: 'ok',
                              text: 'C\'est un nouveau départ',
                              emoji: '📚',
                              action: () => {
                                updateStat('intelligence', 2);
                              },
                            }
                          ],
                        });
                      }}
                    >
                      <Book className="mr-2 h-4 w-4" />
                      Reprendre les études
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationWorkTab;

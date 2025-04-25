
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

const EventPopup = () => {
  const { gameState, dismissEvent } = useGame();
  const { currentEvent } = gameState;

  if (!currentEvent) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="event-popup">
        <h2 className="text-xl font-bold mb-2">{currentEvent.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{currentEvent.description}</p>
        
        <div className="space-y-3">
          {currentEvent.choices.map((choice) => (
            <Button
              key={choice.id}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 px-4"
              onClick={() => {
                choice.action();
                dismissEvent();
              }}
            >
              <span className="mr-2">{choice.emoji}</span>
              <span>{choice.text}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPopup;

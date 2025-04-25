
import React, { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

const SplashScreen = () => {
  const { setScreen } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-primary to-game-secondary flex flex-col items-center justify-center p-6 text-white">
      <div className="animate-pop flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center">
          <div className="relative">
            <Brain size={80} strokeWidth={1.5} className="text-white" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-game-soft-yellow rounded-full opacity-60 animate-pulse-light"></div>
            </div>
          </div>
        </div>
        
        {/* Game Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-center">
          Adolescence & Au-delà
        </h1>
        <p className="text-xl opacity-80 mb-12 text-center">
          Façonne ton destin, vis ta vie
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col w-full max-w-xs gap-3">
          <Button 
            onClick={() => setScreen('create-character')}
            className="bg-white text-game-primary hover:bg-white/90 hover:text-game-secondary transition-all py-6"
            size="lg"
          >
            Nouvelle Vie
          </Button>
          
          <Button 
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 transition-all py-6"
            size="lg"
            disabled
          >
            Continuer
          </Button>
          
          <Button 
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 mt-2"
          >
            Options
          </Button>
        </div>
      </div>
      
      {/* Version */}
      <div className="absolute bottom-4 opacity-60 text-sm">
        Version 1.0.0
      </div>
    </div>
  );
};

export default SplashScreen;

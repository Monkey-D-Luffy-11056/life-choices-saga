
import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart, Dumbbell, Music, Smile, Zap, BookOpen, Male, Female } from 'lucide-react';

// Define traits
const traits = [
  { id: 'intelligent', name: 'Intelligent', emoji: <Brain className="h-5 w-5" />, color: 'bg-game-soft-blue' },
  { id: 'athletic', name: 'Athlétique', emoji: <Dumbbell className="h-5 w-5" />, color: 'bg-game-soft-green' },
  { id: 'charismatic', name: 'Charismatique', emoji: <Smile className="h-5 w-5" />, color: 'bg-game-soft-yellow' },
  { id: 'rebellious', name: 'Rebelle', emoji: <Zap className="h-5 w-5" />, color: 'bg-game-soft-orange' },
  { id: 'kind', name: 'Aimable', emoji: <Heart className="h-5 w-5" />, color: 'bg-game-soft-pink' },
  { id: 'creative', name: 'Créatif', emoji: <Music className="h-5 w-5" />, color: 'bg-game-light-purple' },
  { id: 'ambitious', name: 'Ambitieux', emoji: <BookOpen className="h-5 w-5" />, color: 'bg-game-sky-blue' },
];

const CharacterCreation = () => {
  const { createCharacter } = useGame();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'non-binary'>('male');
  const [birthYear, setBirthYear] = useState(new Date().getFullYear() - 13); // Default to 13 years old
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const handleTraitToggle = (traitId: string) => {
    if (selectedTraits.includes(traitId)) {
      setSelectedTraits(selectedTraits.filter(t => t !== traitId));
    } else {
      if (selectedTraits.length < 3) {
        setSelectedTraits([...selectedTraits, traitId]);
      }
    }
  };

  const handleSubmit = () => {
    if (!firstName || !lastName) return;
    
    createCharacter(
      firstName,
      lastName,
      gender,
      new Date(birthYear, 0, 1), // January 1st of birth year
      selectedTraits as any[]
    );
  };

  const canContinue = () => {
    if (step === 1) return firstName.trim() !== '' && lastName.trim() !== '';
    if (step === 2) return gender !== undefined;
    if (step === 3) return selectedTraits.length > 0 && selectedTraits.length <= 3;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-primary/80 to-game-secondary p-6 flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 text-center">Crée ton personnage</h1>
        
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-medium mb-4">Comment t'appelles-tu?</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="text-white/90">Prénom</Label>
                <Input 
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  placeholder="Prénom"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName" className="text-white/90">Nom</Label>
                <Input 
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  placeholder="Nom"
                />
              </div>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-medium mb-4">Qui es-tu?</h2>
            
            <div className="mb-4">
              <Label className="text-white/90 mb-2 block">Genre</Label>
              <RadioGroup value={gender} onValueChange={(value) => setGender(value as any)} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`p-4 rounded-xl ${gender === 'male' ? 'bg-white/30' : 'bg-white/10'} cursor-pointer`} onClick={() => setGender('male')}>
                    <Male className="h-10 w-10" />
                  </div>
                  <RadioGroupItem value="male" id="male" className="sr-only" />
                  <Label htmlFor="male" className="mt-2">Masculin</Label>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`p-4 rounded-xl ${gender === 'female' ? 'bg-white/30' : 'bg-white/10'} cursor-pointer`} onClick={() => setGender('female')}>
                    <Female className="h-10 w-10" />
                  </div>
                  <RadioGroupItem value="female" id="female" className="sr-only" />
                  <Label htmlFor="female" className="mt-2">Féminin</Label>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`p-4 rounded-xl ${gender === 'non-binary' ? 'bg-white/30' : 'bg-white/10'} cursor-pointer`} onClick={() => setGender('non-binary')}>
                    <div className="h-10 w-10 flex items-center justify-center font-bold text-2xl">⚧️</div>
                  </div>
                  <RadioGroupItem value="non-binary" id="non-binary" className="sr-only" />
                  <Label htmlFor="non-binary" className="mt-2">Non-binaire</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="birthYear" className="text-white/90">Année de naissance</Label>
              <Input 
                id="birthYear"
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(parseInt(e.target.value))}
                className="bg-white/20 border-white/30 text-white"
                min={new Date().getFullYear() - 18}
                max={new Date().getFullYear() - 13}
              />
              <p className="text-sm text-white/70 mt-1">Tu commenceras le jeu à l'âge de {new Date().getFullYear() - birthYear} ans</p>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-medium mb-4">Quels sont tes traits de caractère?</h2>
            <p className="text-sm text-white/70 mb-4">Choisis jusqu'à 3 traits qui définiront ta personnalité</p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {traits.map((trait) => (
                <div 
                  key={trait.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                    selectedTraits.includes(trait.id) 
                      ? `${trait.color} text-gray-800` 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  onClick={() => handleTraitToggle(trait.id)}
                >
                  <div className="mr-2">{trait.emoji}</div>
                  <span>{trait.name}</span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-white/70">
              {selectedTraits.length}/3 traits sélectionnés
            </p>
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="text-white hover:bg-white/10"
            >
              Retour
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canContinue()}
              className="bg-white text-game-primary hover:bg-white/90"
            >
              Suivant
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canContinue()}
              className="bg-white text-game-primary hover:bg-white/90"
            >
              Commencer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;

import { useState, useEffect } from 'react';

export interface Character {
  Name: string;
  Image: string;
  Gender: string;
  Affiliation: string;
  Titan: string;
  Status: string;
  Grade: string;
  "Residence/Birthplace": string;
  "First Arc": string;
}

interface GameState {
  lastPlayedDate: string;
  guesses: Character[];
  hasWon: boolean;
  streak: number;
}

const DEFAULT_STATE: GameState = {
  lastPlayedDate: new Date().toISOString().split('T')[0],
  guesses: [],
  hasWon: false,
  streak: 0,
};

export function useGameState(currentDate: string) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('aotdle_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If it's a new day, reset daily states but keep streak
        if (parsed.lastPlayedDate !== currentDate) {
          return {
            ...DEFAULT_STATE,
            lastPlayedDate: currentDate,
            streak: parsed.hasWon ? parsed.streak : 0, 
          };
        }
        return parsed;
      } catch (e) {
        return DEFAULT_STATE;
      }
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    if (gameState.lastPlayedDate !== currentDate) {
      setGameState(prev => ({
        ...DEFAULT_STATE,
        lastPlayedDate: currentDate,
        streak: prev.hasWon ? prev.streak : 0,
      }));
    }
  }, [currentDate, gameState.lastPlayedDate]);

  useEffect(() => {
    localStorage.setItem('aotdle_state', JSON.stringify(gameState));
  }, [gameState]);

  const addGuess = (char: Character, isWinner: boolean) => {
    setGameState(prev => ({
      ...prev,
      guesses: [char, ...prev.guesses],
      hasWon: prev.hasWon || isWinner,
      streak: (prev.hasWon || isWinner) ? (prev.hasWon ? prev.streak : prev.streak + 1) : prev.streak
    }));
  };

  return { gameState, addGuess };
}

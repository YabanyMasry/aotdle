import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { GuessRow } from './GuessRow';
import { useGameState } from '../hooks/useGameState';
import type { Character } from '../hooks/useGameState';
import { getDailyTargetIndex } from '../utils/prng';

export const GameBoard: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const [activeDate, setActiveDate] = useState<string>(today);
  const { gameState, addGuess } = useGameState(activeDate);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [targetCharacter, setTargetCharacter] = useState<Character | null>(null);

  const shiftDateString = (base: string, delta: number) => {
    const d = new Date(base);
    d.setDate(d.getDate() + delta);
    return d.toISOString().split('T')[0];
  };

  useEffect(() => {
    // In a real app this would be imported from a local JSON or fetched from a public folder
    fetch('/characters.json')
      .then(res => res.json())
      .then((data: Character[]) => {
        setCharacters(data);
        if (data.length > 0) {
          const targetIdx = getDailyTargetIndex(activeDate, data.length);
          setTargetCharacter(data[targetIdx]);
        }
      });
  }, [activeDate]);

  const handleGuess = (char: Character) => {
    if (!targetCharacter) return;
    const isWinner = char.Name === targetCharacter.Name;
    addGuess(char, isWinner);
  };

  if (!targetCharacter) return <div className="page-shell"><div className="board">Loading Game...</div></div>;

  return (
    <div className="page-shell">
      <div className="board">
        <h1 className="title">
          Aotdle <span className="title-badge">Demo</span>
        </h1>
        <p className="subtitle">Guess today&apos;s Attack on Titan character.</p>

        <div className="streak-card">Streak: {gameState.streak}</div>

        <div className="search-card">
          <SearchBar 
            characters={characters} 
            guessedCharacters={gameState.guesses} 
            onGuess={handleGuess} 
            disabled={gameState.hasWon}
          />
        </div>
        
        {gameState.hasWon && (
          <div className="notice">
            Congratulations! You found {targetCharacter.Name}!
          </div>
        )}

        <div className="guesses-grid">
          {gameState.guesses.map((guess, idx) => (
            <GuessRow key={`${guess.Name}-${idx}`} guess={guess} target={targetCharacter} />
          ))}
        </div>
      </div>

      <div className="floating-date-card">
        <div className="floating-date-header">Test Another Day</div>
        <div className="floating-date-body">
          <label className="floating-date-label" htmlFor="active-date">Date</label>
          <input
            id="active-date"
            type="date"
            value={activeDate}
            max={today}
            onChange={e => setActiveDate(e.target.value || today)}
            className="floating-date-input"
          />
          <div className="floating-date-buttons">
            <button type="button" onClick={() => setActiveDate(shiftDateString(activeDate, -1))}>-1 day</button>
            <button type="button" onClick={() => setActiveDate(today)}>Today</button>
            <button type="button" onClick={() => setActiveDate(shiftDateString(activeDate, 1))}>+1 day</button>
          </div>
        </div>
      </div>
    </div>
  );
};

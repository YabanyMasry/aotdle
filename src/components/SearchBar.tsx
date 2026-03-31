import React, { useState } from 'react';
import type { Character } from '../hooks/useGameState';

interface SearchBarProps {
  characters: Character[];
  guessedCharacters: Character[];
  onGuess: (char: Character) => void;
  disabled: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ characters, guessedCharacters, onGuess, disabled }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Character[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filtered = characters.filter(c => 
        c.Name.toLowerCase().includes(value.toLowerCase()) && 
        !guessedCharacters.find(gc => gc.Name === c.Name)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (char: Character) => {
    onGuess(char);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearch} 
        disabled={disabled}
        placeholder={disabled ? "You guessed it!" : "Guess a character..."}
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map(char => (
            <li 
              key={char.Name} 
              onClick={() => handleSelect(char)}
              className="search-item"
            >
              <img src={char.Image} alt={char.Name} className="search-thumb" />
              <span className="search-name">{char.Name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

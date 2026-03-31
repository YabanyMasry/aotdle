import React from 'react';
import type { Character } from '../hooks/useGameState';
import { AttributeCell } from './AttributeCell';
import { cleanGrade, cleanValue, compareChapterOrder, mapChapterToArc } from '../utils/arcMapping';

interface GuessRowProps {
  guess: Character;
  target: Character;
}

export const GuessRow: React.FC<GuessRowProps> = ({ guess, target }) => {
  const getStatus = (val1: string, val2: string) => val1 === val2 ? 'correct' : 'incorrect';
  const chapterDirection = compareChapterOrder(guess['First Arc'], target['First Arc']);
  const firstArcStatus = chapterDirection === 'same' ? 'correct' : chapterDirection === 'unknown' ? 'incorrect' : 'partial';

  return (
    <div className="guess-row">
      <div className="guess-avatar">
        <img src={guess.Image} alt={guess.Name} />
        <div className="guess-name">{guess.Name}</div>
      </div>
      <AttributeCell label="Gender" value={cleanValue(guess.Gender)} targetValue={cleanValue(target.Gender)} status={getStatus(cleanValue(guess.Gender), cleanValue(target.Gender))} />
      <AttributeCell label="Affiliation" value={cleanValue(guess.Affiliation)} targetValue={cleanValue(target.Affiliation)} status={getStatus(cleanValue(guess.Affiliation), cleanValue(target.Affiliation))} />
      <AttributeCell label="Titan" value={cleanValue(guess.Titan)} targetValue={cleanValue(target.Titan)} status={getStatus(cleanValue(guess.Titan), cleanValue(target.Titan))} />
      <AttributeCell label="Status" value={cleanValue(guess.Status)} targetValue={cleanValue(target.Status)} status={getStatus(cleanValue(guess.Status), cleanValue(target.Status))} />
      <AttributeCell label="Grade" value={cleanGrade(guess.Grade)} targetValue={cleanGrade(target.Grade)} status={getStatus(cleanGrade(guess.Grade), cleanGrade(target.Grade))} />
      <AttributeCell label="Residence" value={cleanValue(guess['Residence/Birthplace'])} targetValue={cleanValue(target['Residence/Birthplace'])} status={getStatus(cleanValue(guess['Residence/Birthplace']), cleanValue(target['Residence/Birthplace']))} />
      <AttributeCell 
        label="First Arc" 
        value={mapChapterToArc(guess['First Arc'])}
        targetValue={mapChapterToArc(target['First Arc'])}
        status={firstArcStatus as 'correct' | 'incorrect' | 'partial'}
        direction={chapterDirection === 'unknown' ? undefined : chapterDirection === 'higher' ? 'higher' : chapterDirection === 'lower' ? 'lower' : undefined}
      />
    </div>
  );
};

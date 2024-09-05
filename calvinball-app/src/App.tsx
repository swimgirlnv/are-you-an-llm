import React, { useState, useEffect } from 'react';
import { Rule, generateUniqueRule } from './rules';

const App: React.FC = () => {
  const [move, setMove] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('Make your move to start the game!');
  const [rule, setRule] = useState<Rule | null>(null);  // Store the current rule

  // Generate a new unique rule when the game starts
  useEffect(() => {
    const newRule = generateUniqueRule();
    setRule(newRule);
    console.log('Unique rule for this game:', newRule.description);  // Debugging: to see the rule in the console
  }, []);

  const handleMove = () => {
    if (rule && rule.check(move)) {
      setFeedback('You win!');
    } else {
      setFeedback('You lose. Try again.');
    }
    setMove('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Calvinball Game</h1>
      <p>{feedback}</p>
      <input
        type="text"
        value={move}
        onChange={(e) => setMove(e.target.value)}
        placeholder="Enter your move"
      />
      <button onClick={handleMove}>Submit Move</button>
    </div>
  );
};

export default App;

// Define a Rule type
export type Rule = {
    description: string;
    check: (move: string) => boolean;  // This function will check if the move satisfies the rule
  };
  
  // Create a function to randomly generate a rule
  export const generateRule = (): Rule => {
    // Create a list of possible rules
    const rules: Rule[] = [
      {
        description: 'The move must contain the word "apple"',
        check: (move: string) => move.toLowerCase().includes('apple'),
      },
      {
        description: 'The move must start with the letter "p"',
        check: (move: string) => move.toLowerCase().startsWith('p'),
      },
      {
        description: 'The move must be longer than 10 characters',
        check: (move: string) => move.length > 10,
      },
      {
        description: 'The move must contain a number',
        check: (move: string) => /\d/.test(move),  // Regex to check for numbers
      },
    ];
  
    // Randomly select a rule
    const randomIndex = Math.floor(Math.random() * rules.length);
    return rules[randomIndex];
  };
  
  export const loadPastRules = (): string[] => {
    const savedRules = localStorage.getItem('pastRules');
    return savedRules ? JSON.parse(savedRules) : [];
  };
  
  export const savePastRule = (ruleDescription: string): void => {
    const pastRules = loadPastRules();
    pastRules.push(ruleDescription);
    localStorage.setItem('pastRules', JSON.stringify(pastRules));
  };
  
  export const generateUniqueRule = (): Rule => {
    let newRule: Rule;
    const pastRules = loadPastRules();
  
    do {
      newRule = generateRule();
    } while (pastRules.includes(newRule.description));
  
    savePastRule(newRule.description);
    return newRule;
  };
  
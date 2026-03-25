const rarityMultiplier = {
  Green: 1,
  Purple: 1.5,
  Blue: 2,
  Rainbow: 3,
};

export const calculateRewards = (base, aura, days) => {
  return base * rarityMultiplier[aura] * days;
};

/**
 * 
 * @param {import('../../Character')} user 
 * @param {number} manaCost 
 * @returns {boolean} true if user has enough mana
 */
export const canUse = (user, manaCost) => {
  if (!manaCost) return true;
  if (!user.stats.mana) return false;
  return user.stats.mana >= manaCost;
};

module.exports = {
  canUse(user, manaCost) {
    if (!manaCost) return true;
    if (!user.stats.mana) return false;
    return user.stats.mana >= manaCost;
  },
};

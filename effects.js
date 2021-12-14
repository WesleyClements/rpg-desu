/**
 * @callback IOnCompletion
 */

/**
 * @typedef {object} AttributeModifier
 * @property {number} scalar - amount to multiply the attribute by
 * @property {number} addend - amount to add to the attribute
 */

/**
 * @typedef {object} CharacterAttributeModifiers
 * @property {CharacterAttributeModifiers} health - the health AttributeModifier
 * @property {CharacterAttributeModifiers} mana - the mana AttributeModifier
 * @property {CharacterAttributeModifiers} strength - the strength AttributeModifier
 * @property {CharacterAttributeModifiers} defense - the defense AttributeModifier
 */

/**
 * @typedef {object} Effect
 * @property {boolean} isNew - whether or not this effect was applied this turn
 * @property {number} duration - how long this effect lasts 
 * @property {CharacterAttributeModifiers} attributeModifiers - how to change the CharacterAttributes
 * @property {()=>{}} tick - apply effect
 * @property {()=>{}} onComplete - clean up effect
 */

export const applyEffects = (stat, value, effects) => Math.floor(
  effects
    .map(effect => effect.attributeModifiers)
    .reduce(
      (value, modifiers) => (modifiers[stat]?.scalar ?? 1) * value + (modifiers[stat]?.offset ?? 0),
      value
    )
);
export const reverseEffects = (stat, value, effects) => Math.ceil(
  [...effects]
    .reverse()
    .map(effect => effect.attributeModifiers)
    .reduce(
      (value, modifiers) => (value - (modifiers[stat]?.offset ?? 0)) / (modifiers[stat]?.scalar ?? 1),
      value
    )
);
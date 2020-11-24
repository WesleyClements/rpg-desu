const abilities = require('../abilities');

describe.each(Object.entries(abilities))('%s', (name, ability) => {
  it('has a property name which is a string', () => {
    expect(ability).toHaveProperty('name', expect.any(String));
  });
  it('has a property target which is one of `self`, `enemy`, `friendly`, and `any`', () => {
    expect(ability).toHaveProperty('target', expect.stringMatching(/self|enemy|friendly|any/));
  });
  it('has a method apply', () => {
    expect(ability).toHaveProperty('apply', expect.any(Function));
  });
});

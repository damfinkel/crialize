const { setValue, setCamelcaseKey } = require('./utils');
const { Serializer } = require('./serializer');

describe('setValue', () => {
  const someObject = {
    id: 1
  };

  const mapper = {
    id: setValue({ someKey: 100, someOtherKey: 'aString' })
  };

  const serializer = new Serializer(mapper);

  it('sets a hardcoded value as the id', () => {
    expect(serializer.serialize(someObject).id).toEqual({ someKey: 100, someOtherKey: 'aString' });
  });
});

describe('setCamelcaseKey', () => {
  const someObject = {
    snake_case_key: 1,
    other_key: 'other value'
  };

  const mapper = {
    snake_case_key: setCamelcaseKey(value => value + 100)
  };

  const serializer = new Serializer(mapper);

  it('transform key to camelcase and transforms the value with the given function', () => {
    expect(serializer.serialize(someObject).snakeCaseKey).toBe(101);
  });
});

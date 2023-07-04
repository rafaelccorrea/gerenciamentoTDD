/* eslint-disable linebreak-style */
test('Inicializando Com Jest', () => {
  let number = null;
  expect(number).toBeNull();
  number = 12;
  expect(number).not.toBeNull();
  expect(number).toEqual(12);
});

test('Trabalhando com Objetos', () => {
  const obj = {
    name: 'João',
    age: 25,
  };

  expect(obj).toHaveProperty('name');
});

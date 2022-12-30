import sum from '../sum'

it('test function sum', () => {
  const snapshot = {
    value: sum(1, 2),
  }

  expect(snapshot).toMatchSnapshot({
    value: 3,
  })
})

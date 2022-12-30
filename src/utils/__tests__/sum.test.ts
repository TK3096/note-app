import sum from '../sum'

describe('Test in utils folder', () => {
  it('sum number', () => {
    const result = sum(1, 2)

    expect(result).toEqual(3)
  })
})

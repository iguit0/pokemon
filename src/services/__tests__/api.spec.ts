import api from '../api'

describe('api', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return successfully fetching data from an API.', async () => {
    const expected = {
      status: 200,
      data: {
        results: [
          {
            name: 'Charizard',
            url: 'https://pokeapi.co/api/v2/pokemon/6/',
          },
        ],
      },
    }

    jest.spyOn(api, 'get').mockResolvedValue(expected)

    const result = await api.get('/pokemons')

    expect(result).toEqual(expected)
  })

  it('should return a wrong data fetch from an API', async () => {
    const expected = { message: 'Network Error' }

    jest.spyOn(api, 'get').mockResolvedValue(expected)

    const result = await api.get('/invalid-route')

    expect(result).toEqual(expected)
  })
})

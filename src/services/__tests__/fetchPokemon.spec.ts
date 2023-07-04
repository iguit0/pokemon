import api from '../api'
import { fetchPokemon } from '../fetchPokemon'
import { AxiosResponse } from 'axios'

jest.mock('../api', () => ({
  get: jest.fn(),
}))

describe('fetchPokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches the Pokemon data successfully', async () => {
    const pokemon = 'pikachu'
    const mockData = {
      id: 25,
      name: 'pikachu',
      types: [{ type: { name: 'electric' } }],
      weight: 60,
      height: 40,
      stats: [{ base_stat: 35, stat: { name: 'hp' } }],
    }

    ;(api.get as jest.MockedFunction<typeof api.get>).mockResolvedValueOnce({
      data: mockData,
    } as AxiosResponse)

    const { pokeData, error } = await fetchPokemon(pokemon)

    expect(api.get).toHaveBeenCalledTimes(1)
    expect(api.get).toHaveBeenCalledWith('/pokemon/pikachu')
    expect(pokeData).toEqual(mockData)
    expect(error).toBeUndefined()
  })

  it('handles error while fetching Pokemon data', async () => {
    const pokemon = 'pikachu'
    const mockError = new Error('Failed to fetch Pokemon data')

    ;(api.get as jest.MockedFunction<typeof api.get>).mockRejectedValueOnce(mockError)

    const { pokeData, error } = await fetchPokemon(pokemon)

    expect(api.get).toHaveBeenCalledTimes(1)
    expect(api.get).toHaveBeenCalledWith('/pokemon/pikachu')
    expect(pokeData).toBeNull()
    expect(error).toEqual(mockError)
  })
})

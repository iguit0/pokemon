import { renderHook, act } from '@testing-library/react-hooks'
import useFetchPokemons from '../use-fetch-pokemons'
import api from '../../services/api'

jest.mock('../../services/api', () => ({
  get: jest.fn(),
}))

describe('useFetchPokemons', () => {
  const mockPokemons = [
    { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
    { name: 'Charizard', url: 'https://pokeapi.co/api/v2/pokemon/6' },
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch pokemons and update the state', async () => {
    const mockFetch = api.get as jest.Mock

    mockFetch.mockImplementation(() =>
      Promise.resolve({
        data: {
          results: mockPokemons,
        },
      }),
    )

    const { result, waitForNextUpdate } = renderHook(() => useFetchPokemons())

    expect(result.current.loading).toBe(false)
    expect(result.current.pokemons).toEqual([])
    expect(result.current.error).toEqual({ error: false, message: '' })

    act(() => {
      result.current.fetchPokemons({ limit: 10 })
    })

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.pokemons).toEqual(mockPokemons)
    expect(result.current.error).toEqual({ error: false, message: '' })
  })

  it('should handle error if the API call fails', async () => {
    const errorMessage = 'API Error'
    const mockFetch = api.get as jest.Mock

    mockFetch.mockRejectedValueOnce(new Error(errorMessage))

    const { result, waitForNextUpdate } = renderHook(() => useFetchPokemons())

    expect(result.current.loading).toBe(false)
    expect(result.current.pokemons).toEqual([])
    expect(result.current.error).toEqual({ error: false, message: '' })

    act(() => {
      result.current.fetchPokemons({ limit: 10 })
    })

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.pokemons).toEqual([])
    expect(result.current.error).toEqual({ error: true, message: errorMessage })
  })
})

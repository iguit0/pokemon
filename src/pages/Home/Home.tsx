import { useEffect, useState } from 'react'
import { useFetchPokemons } from '../../hooks'
import { Link } from 'react-router-dom'

function Home() {
  const [limit, setLimit] = useState(10)
  const { pokemons, loading, error, fetchPokemons } = useFetchPokemons()

  useEffect(() => {
    fetchPokemons({ limit })
  }, [])

  return (
    <div>
      {error && <span>{error.message}</span>}
      {loading && <span>Loading...</span>}

      {pokemons.map((pokemon) => {
        const pokemonId = pokemon.url.split('/')[6]
        return (
          <Link key={pokemon.name} to={`pokemon/${pokemon.url.split('/')[6]}`}>
            {pokemonId} - {pokemon.name}
            <br />
          </Link>
        )
      })}
    </div>
  )
}

export default Home

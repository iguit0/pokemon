import { useEffect, useState } from 'react'
import { useFetchPokemons } from '../../hooks'

function Home() {
  const { loading, pokemons, fetchPokemons } = useFetchPokemons()
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    fetchPokemons({ limit })
  }, [limit])

  const handleChange = (event) => {
    setLimit(Number(event.target.value))
  }

  return (
    <>
      <input type='number' onChange={handleChange} placeholder='Pokemons per page' />
      <br />
      <br />

      {pokemons.map((pokemon) => (
        <p style={{ color: '#000' }} key={pokemon.name}>
          {pokemon.name}
          <br />
        </p>
      ))}
    </>
  )
}

export default Home

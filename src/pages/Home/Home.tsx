import { useCallback, useEffect, useRef, useState } from 'react'
import { SearchBar } from '../../components/SearchBar'
import { Pokemon } from '../../types/pokemon'
import { Pokedex } from '../../components/Pokedex'
import { fetchPokemonList } from '../../services/fetchPokemonList'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { PokemonModal } from '../../components/PokemonModal'

function Home() {
  const [modal, setModal] = useState(false)
  const [pokemonData, setPokemonData] = useState<Pokemon>()
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [pokemonAmount, setPokemonAmount] = useState(6)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [showPagination, setShowPagination] = useState(true)
  const searchBarRef = useRef<HTMLDivElement>(null)

  const fetchPokemonData = useCallback(async () => {
    setLoading(true)
    setPokemonList(await fetchPokemonList(1))
    setLoading(false)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      fetchPokemonData()
    }

    fetchData()
  }, [fetchPokemonData])

  useEffect(() => {
    const html = document.documentElement

    modal ? (html.style.overflow = 'hidden') : (html.style.overflow = 'initial')
  }, [modal])

  useEffect(() => {
    setError(false)
  }, [pokemonList])

  return (
    <>
      <Header />
      <SearchBar
        setPokemonList={setPokemonList}
        pokemonAmount={pokemonAmount}
        setPokemonAmount={setPokemonAmount}
        error={error}
        setError={setError}
        setLoading={setLoading}
        setPage={setPage}
        setShowPagination={setShowPagination}
        searchBarRef={searchBarRef}
        page={page}
        loading={loading}
        pokemonList={pokemonList}
      />
      <Pokedex
        setModal={setModal}
        setPokemonData={setPokemonData}
        pokemonList={pokemonList}
        setPokemonList={setPokemonList}
        pokemonAmount={pokemonAmount}
        setPokemonAmount={setPokemonAmount}
        error={error}
        loading={loading}
        setLoading={setLoading}
        page={page}
        setPage={setPage}
        showPagination={showPagination}
        setShowPagination={setShowPagination}
        searchBarRef={searchBarRef}
      />
      <Footer />
      {pokemonData && modal && <PokemonModal setModal={setModal} pokemonData={pokemonData} />}
    </>
  )
}

export default Home

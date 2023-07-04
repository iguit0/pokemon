import { fetchPokemonList } from '../../services/fetchPokemonList'
import { Pokemon } from '../../types/pokemon'
import usePagination from '@mui/material/usePagination'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import * as C from './styles'

type UsePaginationProps = {
  setPokemonList: (data: Pokemon[]) => void
  setLoading: (value: boolean) => void
  searchBarRef: React.RefObject<HTMLDivElement>
  page: number
  setPage: (value: number) => void
}

function UsePagination(props: UsePaginationProps) {
  const handleChange = async (e: React.ChangeEvent<unknown>, value: number) => {
    props.setPage(value)

    props.setLoading(true)
    props.setPokemonList(await fetchPokemonList(value))
    props.setLoading(false)

    if (props.searchBarRef.current === null) return
    window.scrollTo({
      top: props.searchBarRef.current.offsetTop - 56,
    })
  }

  const { items } = usePagination({
    count: 10,
    siblingCount: 0,
    page: props.page,
    onChange: handleChange,
  })

  return (
    <nav>
      <C.Pagination>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = <></>

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = <C.Ellipsis>...</C.Ellipsis>
          } else if (type === 'page') {
            children = (
              <C.Button {...item} selected={selected}>
                {page}
              </C.Button>
            )
          } else {
            children = (
              <C.Button {...item} navigation>
                {type === 'previous' ? <BsArrowLeft /> : <BsArrowRight />}
              </C.Button>
            )
          }

          return <li key={index}>{children}</li>
        })}
      </C.Pagination>
    </nav>
  )
}

export default UsePagination

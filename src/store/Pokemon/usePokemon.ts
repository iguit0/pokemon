import produce from 'immer'
import create from 'zustand'

export interface IUsePokemonStore {
  openedDialog: boolean
  handleCloseDialog: () => void
}

const usePokemon = create<IUsePokemonStore>((set) => {
  const setState = (callback: (store: IUsePokemonStore) => void) => set(produce(callback))

  return {
    openedDialog: false,
    handleCloseDialog: () => {
      setState((store) => {
        store.openedDialog = false
      })
    },
  }
})

export default usePokemon

import { Pokemon } from './Pokemon'

export interface DialogProps {
    isOpen: boolean
    onClose: () => void
    pokemon: Pokemon
}

export type ToastType = 'success' | 'error'

export interface ToastProps extends Pick<DialogProps, 'isOpen' | 'onClose'> {
    message: string
    type: ToastType
    duration: number
    onClose: () => void
    isOpen: boolean
}

export type ToastPosition = {
    vertical: 'top' | 'bottom'
    horizontal: 'center' | 'left' | 'right'
}

import { renderHook } from '@testing-library/react-hooks'
import useDebounce from '../use-debounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should debounce the value update', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 1000 },
    })

    expect(result.current).toBe('initial')

    rerender({ value: 'updated', delay: 1000 })

    jest.advanceTimersByTime(500)

    expect(result.current).toBe('initial')
    jest.advanceTimersByTime(500)

    expect(result.current).toBe('updated')
  })

  it('should use the default delay if not specified', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    })

    expect(result.current).toBe('initial')

    rerender({ value: 'updated' })

    jest.advanceTimersByTime(500)

    expect(result.current).toBe('updated')
  })

  it('should clear the timeout on unmount', () => {
    const { result, unmount } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 1000 },
    })

    unmount()

    jest.advanceTimersByTime(1000)
    expect(result.current).toBe('initial')
  })
})

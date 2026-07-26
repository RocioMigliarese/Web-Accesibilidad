import { useEffect, useRef } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const ref = useRef<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current = value
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return ref.current
}

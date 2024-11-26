'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import type { ReactNode } from 'react'

type ReactQueryProviderProps = {
  children: ReactNode
}

export default function ReactQueryProvider({
  children
}: ReactQueryProviderProps) {
  // Ensure a new QueryClient instance is not created on every render.
  const [queryClient] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate
        state={
          (typeof window !== 'undefined' && window.__REACT_QUERY_STATE__) ||
          null
        }
      > */}
      {children}
      {/* </Hydrate> */}
    </QueryClientProvider>
  )
}

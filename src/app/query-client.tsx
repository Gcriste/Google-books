'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import type { ReactNode } from 'react'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

type ReactQueryProviderProps = {
  children: ReactNode
}

export default function ReactQueryProvider({
  children
}: ReactQueryProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5
      }
    }
  })
  const persister = createSyncStoragePersister({
    storage: localStorage
  })
  persistQueryClient({
    queryClient,
    persister
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

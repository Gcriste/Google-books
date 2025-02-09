import { Box } from '@/components/common'
import type { Metadata } from 'next'
import Link from 'next/link'
import * as React from 'react'
import { RiAlarmWarningFill } from 'react-icons/ri'

export const metadata: Metadata = {
  title: 'Not Found'
}

const NotFound = () => {
  return (
    <main>
      <section className="bg-white">
        <Box className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
          <RiAlarmWarningFill
            size={60}
            className="drop-shadow-glow animate-flicker text-red-500"
          />
          <h1 className="mt-8 text-4xl md:text-6xl">Page Not Found</h1>
          <Link href="/">Back to home</Link>
        </Box>
      </section>
    </main>
  )
}

export default NotFound

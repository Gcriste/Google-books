'use client'

import { Suspense } from 'react'
import { Container } from '@/components/common'
import LoginForm from '@/components/auth/login-form'

/**
 * `useSearchParams` (for the `next` redirect target) requires a Suspense
 * boundary in Next 15, or the build fails while prerendering this route.
 */
const LoginPage = () => (
  <Container title="Sign in">
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  </Container>
)

export default LoginPage

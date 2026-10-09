'use client'

import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Flex, Text } from '../common'
import { signIn, signUp } from '@/lib/auth-client'

type AuthFormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const inputClass =
  'w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500'

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSignUp, setIsSignUp] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [formError, setFormError] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AuthFormValues>({
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
    // Drop fields from form state when they unmount. Without this the name
    // inputs stay registered after switching to sign-in, and their `required`
    // rules block submit on inputs the user can no longer see.
    shouldUnregister: true
  })

  const toggleMode = useCallback(() => {
    setIsSignUp(prev => !prev)
    setFormError('')
    reset()
  }, [reset])

  const onSubmit = useCallback(
    async (values: AuthFormValues) => {
      setIsPending(true)
      setFormError('')

      const firstName = values.firstName?.trim() ?? ''
      const lastName = values.lastName?.trim() ?? ''

      const { error } = isSignUp
        ? await signUp.email({
            firstName,
            lastName,
            // Better Auth's own `name` column is required, so keep it in sync
            // with the two parts rather than working around it.
            name: `${firstName} ${lastName}`,
            email: values.email,
            password: values.password
          })
        : await signIn.email({
            email: values.email,
            password: values.password
          })

      setIsPending(false)

      if (error) {
        setFormError(error.message ?? 'Something went wrong. Please try again.')
        return
      }

      // `next` is set by middleware when it bounces a signed-out visitor.
      router.push(searchParams.get('next') || '/favorites')
      router.refresh()
    },
    [isSignUp, router, searchParams]
  )

  return (
    <Flex direction="col" gap="gap-2" className="max-w-md">
      <Text variant="subheading" size="large">
        {isSignUp ? 'Create an account' : 'Welcome back'}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        {isSignUp && (
          <>
            <input
              {...register('firstName', {
                required: 'First name is required'
              })}
              className={inputClass}
              placeholder="First name"
              autoComplete="given-name"
            />
            {errors.firstName && (
              <Text variant="error">{errors.firstName.message}</Text>
            )}

            <input
              {...register('lastName', { required: 'Last name is required' })}
              className={inputClass}
              placeholder="Last name"
              autoComplete="family-name"
            />
            {errors.lastName && (
              <Text variant="error">{errors.lastName.message}</Text>
            )}
          </>
        )}

        <input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' }
          })}
          className={inputClass}
          placeholder="Email"
          type="email"
          autoComplete="email"
        />
        {errors.email && <Text variant="error">{errors.email.message}</Text>}

        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
          className={inputClass}
          placeholder="Password"
          type="password"
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
        />
        {errors.password && (
          <Text variant="error">{errors.password.message}</Text>
        )}

        {formError && <Text variant="error">{formError}</Text>}

        <Flex direction="col" gap="gap-2">
          <Button type="submit" className="min-w-40" disabled={isPending}>
            {isPending
              ? 'Please wait...'
              : isSignUp
                ? 'Create account'
                : 'Sign in'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="text-primary font-bold"
            onClick={toggleMode}
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : 'Need an account? Sign up'}
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default LoginForm

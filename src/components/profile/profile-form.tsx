'use client'

import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Divider, FormField, Text } from '../common'
import { useUpdateProfile } from '@/hooks/use-profile'
import { useUser } from '@/hooks/use-user'
import type { ProfileValues } from '@/hooks/use-profile'

const ProfileForm = () => {
  const { user, email } = useUser()
  const updateProfile = useUpdateProfile()
  const [savedMessage, setSavedMessage] = useState('')

  /**
   * Seeded through `values`, not `defaultValues`.
   *
   * The session resolves asynchronously, so on first render there is nothing to
   * seed from — `defaultValues` are read once and would leave every input
   * blank. `values` re-syncs whenever the session changes.
   */
  const currentValues: ProfileValues = useMemo(
    () => ({
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      addressLine1: user?.addressLine1 ?? '',
      addressLine2: user?.addressLine2 ?? '',
      addressCity: user?.addressCity ?? '',
      addressState: user?.addressState ?? '',
      addressPostalCode: user?.addressPostalCode ?? '',
      addressCountry: user?.addressCountry ?? ''
    }),
    [user]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm<ProfileValues>({ values: currentValues })

  const onSubmit = useCallback(
    async (values: ProfileValues) => {
      setSavedMessage('')

      const changed = Object.keys(dirtyFields) as (keyof ProfileValues)[]
      // Better Auth rejects /update-user with "No fields to update" when the
      // body is empty, so a no-op save must not reach it.
      if (changed.length === 0) {
        setSavedMessage('No changes to save.')
        return
      }

      const payload: Partial<ProfileValues> = {}
      changed.forEach(field => {
        payload[field] = values[field].trim()
      })

      await updateProfile.mutateAsync(payload)

      // Clear the dirty flags without refetching — keeps the next submit from
      // re-sending fields that already landed.
      reset(values, { keepValues: true })
      setSavedMessage('Profile saved.')
    },
    [dirtyFields, reset, updateProfile]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Text variant="subheading" size="large">
        Your details
      </Text>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <FormField
          label="First name"
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register('firstName', { required: 'First name is required' })}
        />
        <FormField
          label="Last name"
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register('lastName', { required: 'Last name is required' })}
        />
      </div>

      <div className="mt-3">
        <Text size="small">Email</Text>
        <div className="w-full p-2 border border-gray-200 rounded bg-gray-50 mt-1">
          <Text>{email ?? ''}</Text>
        </div>
        <Text variant="caption">
          Your email address can&apos;t be changed here.
        </Text>
      </div>

      <Divider />

      <Text variant="subheading" size="large">
        Mailing address
      </Text>

      <div className="grid grid-cols-6 gap-3 mt-3">
        <FormField
          label="Street address"
          autoComplete="address-line1"
          className="col-span-6"
          {...register('addressLine1')}
        />
        <FormField
          label="Apartment, suite, etc."
          autoComplete="address-line2"
          className="col-span-6"
          {...register('addressLine2')}
        />
        <FormField
          label="City"
          autoComplete="address-level2"
          className="col-span-3"
          {...register('addressCity')}
        />
        <FormField
          label="State"
          autoComplete="address-level1"
          className="col-span-1"
          {...register('addressState')}
        />
        <FormField
          label="ZIP"
          autoComplete="postal-code"
          className="col-span-2"
          {...register('addressPostalCode')}
        />
        <FormField
          label="Country"
          autoComplete="country-name"
          className="col-span-6"
          {...register('addressCountry')}
        />
      </div>

      {updateProfile.error && (
        <div className="mt-3">
          <Text variant="error">{updateProfile.error.message}</Text>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <Button type="submit" disabled={updateProfile.isPending}>
          {updateProfile.isPending ? 'Saving...' : 'Save changes'}
        </Button>
        {savedMessage && <Text variant="caption">{savedMessage}</Text>}
      </div>
    </form>
  )
}

export default ProfileForm

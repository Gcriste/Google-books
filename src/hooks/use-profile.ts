'use client'

import { useMutation } from '@tanstack/react-query'
import { updateUser } from '@/services/auth'

export type ProfileValues = {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2: string
  addressCity: string
  addressState: string
  addressPostalCode: string
  addressCountry: string
}

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: async (values: Partial<ProfileValues>) => {
      const { firstName, lastName } = values

      const { error } = await updateUser({
        ...values,
        ...(firstName !== undefined || lastName !== undefined
          ? { name: `${firstName ?? ''} ${lastName ?? ''}`.trim() }
          : {})
      })

      if (error) {
        throw new Error(error.message ?? 'Could not save your profile.')
      }
    }
  })

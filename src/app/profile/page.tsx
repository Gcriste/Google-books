'use client'

import { Container, Text } from '@/components/common'
import ProfileForm from '@/components/profile/profile-form'
import { useUser } from '@/hooks/use-user'

const ProfilePage = () => {
  const { isLoading } = useUser()

  return (
    <Container title="Profile">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <div className="w-full max-w-md flex flex-col gap-6">
          <ProfileForm />
        </div>
      )}
    </Container>
  )
}

export default ProfilePage

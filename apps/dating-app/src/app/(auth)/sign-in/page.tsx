import SignIn from '@/app/(auth)/sign-in/signIn'
import { FloatingIcons } from '@social-media/molecules'
import { GridLayout } from '@social-media/organisms'

const SignInPage = () => {
  return (
    <GridLayout
    
      leftChildren={
        <FloatingIcons
          haveContainer={false}
          items={[
            { id: 1, imageUrl: 'https://i.pravatar.cc/150?u=1', size: 'md' },
            { id: 2, imageUrl: 'https://i.pravatar.cc/150?u=1', size: 'sm' },
            { id: 3, imageUrl: 'https://i.pravatar.cc/150?u=1', size: 'lg' },
          ]}
        />
      }
      rightChildren={<SignIn />}
    />
  )
}
export default SignInPage

import { GridLayout } from '@social-media/organisms'
import SignIn from './signIn'
import LeftLayout from '@/app/(auth)/leftLayout'
const SignInPage = () => {
  return (
    <GridLayout leftChildren={<LeftLayout />} leftClassName='relative'>
      <div className='w-full h-full flex items-center justify-center'>
        <SignIn />
      </div>
    </GridLayout>
  )
}
export default SignInPage

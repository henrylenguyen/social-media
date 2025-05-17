import { GridLayout } from '@social-media/organisms'
import LeftLayout from './leftLayout'
import SignIn from './signIn'
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

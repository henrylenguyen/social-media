import LeftLayout from '@/app/(auth)/leftLayout'
import { GridLayout } from '@social-media/organisms'
import SignUp from './signUp'

const SignUpPage = () => {
  return (
    <GridLayout leftChildren={<LeftLayout />} leftClassName='relative'>
      <div className='w-full h-full flex items-center justify-center'>
        <SignUp />
      </div>
    </GridLayout>
  )
}
export default SignUpPage

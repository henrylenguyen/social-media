import { GridLayout } from '@social-media/organisms'
import ForgotPassword from './forgotPassword'
import ForgotLeftLayout from '@/app/(auth)/forgotLeftLayout'

const ForgotPasswordPage = () => {
  return (
    <GridLayout
      leftChildren={<ForgotLeftLayout />}
      leftClassName='relative'
      showDefaultLeftContent={false}
    >
      <div className='w-full h-full flex items-center justify-center'>
        <ForgotPassword />
      </div>
    </GridLayout>
  )
}

export default ForgotPasswordPage

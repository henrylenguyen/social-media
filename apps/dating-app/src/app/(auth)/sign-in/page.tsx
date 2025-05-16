import { GridLayout } from '@social-media/organisms'
import LeftLayout from './leftLayout'
import SignIn from './signIn'
const SignInPage = () => {

  return (
    <GridLayout
      leftChildren={<LeftLayout />}
      rightChildren={<SignIn />}
      leftClassName='relative'
    />
  )
}
export default SignInPage

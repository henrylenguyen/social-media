import { NumberStep } from '@social-media/atoms'

interface AuthLayoutProps {
  children: React.ReactNode
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='grid justify-center items-center w-full h-screen grid-cols-2'>
      <div className='bg-primary-gradient-to-bottom h-screen w-full flex items-center justify-center'>
        <div className='w-full grid h-full'>
          <div className='flex items-center justify-center'>
            <h1 className='text-center text-3xl font-bold text-white'>Match</h1>
          </div>
          <div>
            <NumberStep>1</NumberStep>
            {children}
          </div>
        </div>
      </div>
      <div className=''>div phải</div>
    </div>
  )
}
export default AuthLayout

import { NumberStepWithText } from '@social-media/molecules'
import { cn } from 'src/utils'
import './styles.css'
interface GridLayoutProps {
  leftChildren: React.ReactNode
  rightChildren: React.ReactNode
  leftClassName?: string
  rightClassName?: string
}
const GridLayout: React.FC<GridLayoutProps> = ({
  leftChildren,
  rightChildren,
  leftClassName,
  rightClassName,
}) => {
  return (
    <div className='grid justify-center items-center w-full h-screen grid-cols-2'>
      <div className='background-circle h-screen w-full flex items-center justify-center'>
        <div className='w-full h-full px-8 py-4'>
          <div className={cn('w-full grid gap-4 h-full p-10', leftClassName)}>
            <div className='flex flex-col gap-4 items-center justify-center'>
              <h1 className='text-center text-3xl font-bold text-white'>
                HeartLink
              </h1>
              <h4 className='text-center text-md font-semibold text-white'>
                Kết nối trái tim, tìm kiếm tình yêu
              </h4>
            </div>
            <div className='flex flex-col  gap-8 '>
              <NumberStepWithText
                step='1'
                slogan='Khám phá những người phù hợp với bạn'
              >
                Tạo hồ sơ hấp dẫn
              </NumberStepWithText>
              <NumberStepWithText
                step='2'
                slogan='Người thật, xác minh danh tính 100%'
              >
                Khám phá những người phù hợp
              </NumberStepWithText>
              <NumberStepWithText
                step='3'
                slogan='Bắt đầu những câu chuyện có ý nghĩa'
              >
                Bắt đầu cuộc trò chuyện thú vị
              </NumberStepWithText>
            </div>
            <div>{leftChildren}</div>
            {/* <div className='flex flex-col items-center text-white mt-8'>
              <button className='bg-white text-purple-900 font-semibold py-2 px-4 rounded-full flex items-center'>
                <span className='mr-2'>⭐</span> Tải ứng dụng ngay
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'w-full h-full px-10 flex flex-col justify-center items-center',
          rightClassName,
        )}
      >
        {rightChildren}
      </div>
    </div>
  )
}
export default GridLayout

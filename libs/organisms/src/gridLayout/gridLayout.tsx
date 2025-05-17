import { NumberStepWithText } from '@social-media/molecules'
import * as React from 'react'
import { cn } from 'src/utils'
import './styles.css'

/**
 * Interface mô tả các props của component GridLayout
 */
export interface IGridLayoutProps {
  /**
   * Nội dung sẽ được hiển thị ở phần bên phải của grid
   * Thường là các form, biểu mẫu hoặc nội dung chính của trang
   */
  children: React.ReactNode

  /**
   * Nội dung hiển thị ở phần bên trái của grid
   * Ví dụ: logo, hình ảnh minh họa, thông tin giới thiệu...
   */
  leftChildren?: React.ReactNode

  /**
   * Class CSS tùy chỉnh cho phần bên phải
   * Dùng để thay đổi kiểu dáng, kích thước của cột bên phải
   */
  rightClassName?: string

  /**
   * Class CSS tùy chỉnh cho phần bên trái
   * Dùng để thay đổi kiểu dáng, kích thước của cột bên trái
   */
  leftClassName?: string

  /**
   * Có hiển thị phần giới thiệu mặc định ở cột bên trái không
   * Bao gồm logo, tiêu đề và các bước
   * @default true
   */
  showDefaultLeftContent?: boolean
}

/**
 * Component hiển thị layout dạng lưới hai cột, thường được sử dụng cho trang đăng nhập, đăng ký hoặc onboarding.
 * Cột bên trái có gradient màu tím đậm, các bước hướng dẫn và branding.
 * Cột bên phải chứa nội dung chính như form, biểu mẫu.
 */
const GridLayout: React.FC<IGridLayoutProps> = ({
  leftChildren,
  rightClassName,
  leftClassName,
  children,
  showDefaultLeftContent = true,
}) => {
  return (
    <div className='grid grid-cols-2 h-screen overflow-hidden'>
      {/* Left column */}
      <div className='background-circle h-screen overflow-hidden'>
        <div className='w-full h-full px-8 py-4 overflow-auto'>
          <div className={cn('w-full grid gap-4 h-full p-10', leftClassName)}>
            {showDefaultLeftContent && (
              <>
                <div className='flex flex-col gap-4 items-center justify-center'>
                  <h1 className='text-center text-3xl font-bold text-white'>
                    HeartLink
                  </h1>
                  <h4 className='text-center text-md font-semibold text-white'>
                    Kết nối trái tim, tìm kiếm tình yêu
                  </h4>
                </div>
                <div className='flex flex-col gap-8'>
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
              </>
            )}
            {leftChildren}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className='h-screen overflow-auto'>
        <div
          className={cn(
            'w-full h-full py-4 px-10 flex flex-col justify-center items-center',
            rightClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default GridLayout

'use client'
import StepIndicator from '@social-media/atoms'
import { Header, PhoneMockupComponent } from '@social-media/molecules'
import * as React from 'react'

interface ISetUpFirstTimeComponentProps {}

const SetUpFirstTimeComponent: React.FunctionComponent<
  ISetUpFirstTimeComponentProps
> = (props) => {
  return (
    <div>
      <Header className='h-[80px]'>
        <StepIndicator
          currentStep={1}
          totalSteps={4}
          stepTexts={[
            'Thông tin cơ bản',
            'Cá tính & sở thích',
            'Thiết lập tìm kiếm',
            'Xác minh',
          ]}
          isGraduallySmaller={false}
          isCanClick={true}
          onStepChange={() => {
            console.log('onStepChange')
          }}
          indicatorStyle='primary'
          textColor='#000000'
          spacing='lg'
          size='md'
          lineColor='#cccccc'
          disabledStepColor='#cccccc'
          previousStepColor='#cccccc'
          stepColor='#ffffff'
          noPreviousStepBlur
        />
      </Header>
      <main className='grid grid-cols-3 container mx-auto p-4 gap-10'>
        <div className='flex flex-col items-center'>
          <h3 className='text-lg font-semibold'>Xem trước hồ sơ</h3>
          <p className='text-sm text-gray-500'>
            Đây là cách mà hồ sơ của bạn sẽ hiển thị với người khác
          </p>
          <PhoneMockupComponent />
        </div>
        <div className='col-span-2 border-l p-l-10 border-solid flex flex-col gap-4'>
          <h1 className='text-xl font-semibold '>Bước 1: Tạo Hồ Sơ Của Bạn</h1>
          <p className='text-md text-gray-500'>
            Hãy cung cấp những thông tin cơ bản và hình ảnh để bắt đầu.
          </p>
        </div>
      </main>
    </div>
  )
}

export default SetUpFirstTimeComponent

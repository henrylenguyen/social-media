'use client'
import StepIndicator from '@social-media/atoms'
import { Header } from '@social-media/molecules'
import * as React from 'react'

interface ISetUpFirstTimeComponentProps {}

const SetUpFirstTimeComponent: React.FunctionComponent<
  ISetUpFirstTimeComponentProps
> = (props) => {
  const [currentStep, setCurrentStep] = React.useState(1)

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
    console.log('Step changed to:', step)
  }

  return (
    <div>
      <Header className='h-[80px]'>
        <StepIndicator
          currentStep={currentStep}
          totalSteps={6}
          stepTexts={[
            'Thông tin cơ bản',
            'Giới thiệu',
            'Sở thích',
            'Mục tiêu',
            'Thiết lập',
            'Xác minh',
          ]}
          isGraduallySmaller={false}
          isCanClick={true}
          onStepChange={handleStepChange}
          indicatorStyle='primary'
          textColor='#000000'
          spacing='md'
          size='md'
          lineColor="#cccccc"
          disabledStepColor='#cccccc'
          previousStepColor='#cccccc'
          stepColor="#ffffff"
          noPreviousStepBlur
        />
      </Header>

      {/* Add content based on current step */}
      <div className='container mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>
          {currentStep === 1 && 'Thông tin cơ bản'}
          {currentStep === 2 && 'Giới thiệu'}
          {currentStep === 3 && 'Sở thích'}
          {currentStep === 4 && 'Mục tiêu'}
          {currentStep === 5 && 'Thiết lập'}
          {currentStep === 6 && 'Xác minh'}
        </h2>

        {/* Add your step content here */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          {currentStep === 1 && (
            <div>
              <p>Vui lòng điền thông tin cơ bản của bạn</p>
              {/* Form fields for basic info */}
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <p>Tạo phần giới thiệu hấp dẫn về bản thân</p>
              {/* Form fields for introduction */}
            </div>
          )}
          {/* Add content for other steps as needed */}
        </div>

        {/* Navigation buttons */}
        <div className='flex justify-between mt-6'>
          <button
            className='px-4 py-2 bg-gray-200 rounded-md'
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Quay lại
          </button>
          <button
            className='px-4 py-2 bg-primary text-white rounded-md'
            onClick={() => currentStep < 6 && setCurrentStep(currentStep + 1)}
          >
            {currentStep === 6 ? 'Hoàn tất' : 'Tiếp tục'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SetUpFirstTimeComponent

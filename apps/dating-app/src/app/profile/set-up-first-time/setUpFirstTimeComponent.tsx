"use client"
import StepIndicator, { NumberStep } from '@social-media/atoms'
import { Header } from '@social-media/molecules'
import * as React from 'react'

interface ISetUpFirstTimeComponentProps {}

const SetUpFirstTimeComponent: React.FunctionComponent<
  ISetUpFirstTimeComponentProps
> = (props) => {
  return (
    <div>
      <Header>
        <StepIndicator
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
          isCanClick
          onStepChange={(step: any) => {
            console.log('Step changed to:', step)
          }}
          
        />
      </Header>
    </div>
  )
}

export default SetUpFirstTimeComponent

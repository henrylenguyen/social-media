
"use client"
import {
  Button,
  Countdown,
  CountdownTimer,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@social-media/atoms'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@social-media/molecules'
import * as React from 'react'
import { cn } from 'src/utils'
import useAuthOTP from './useAuthOTP'

interface IOTPComponentProps {
  className?: string
}

const AuthOTPComponent: React.FC<IOTPComponentProps> = React.memo(
  ({ className }) => {
    const {
      isCountdownFinished,
      isResendCountdownFinished,
      handleResendOTP,
      handleCountdownFinish,
      handleResendCountdownFinish,
    } = useAuthOTP()

    return (
      <div
        className={cn(
          'w-full max-w-md flex flex-col justify-center',
          className,
        )}
        data-testid='authOTP'
      >
        <Card>
          <CardHeader className='text-center items-center'>
            {!isCountdownFinished && (
              <CountdownTimer
                onFinish={handleCountdownFinish}
                size={50}
                strokeWidth={2}
                timerEnd='2025-05-29T08:19:59.061Z'
                timeZoneOffset={7} // Múi giờ Việt Nam (GMT+7)
              />
            )}
            <CardTitle>Xác thực OTP</CardTitle>
            <CardDescription>
              {isCountdownFinished
                ? 'Mã OTP đã hết hạn, vui lòng yêu cầu mã mới'
                : 'Vui lòng nhập mã OTP đã gửi đến email của bạn'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col items-center justify-center'>
              <div className='space-y-4'>
                <div className='flex gap-2'>
                  <InputOTP maxLength={6} disabled={isCountdownFinished}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col items-center justify-center'>
            {isCountdownFinished ? (
              <div className='flex items-center gap-2'>
                <Button
                  onClick={handleResendOTP}
                  className='bg-primary hover:bg-primary/90 text-white'
                >
                  Gửi lại mã
                </Button>
              </div>
            ) : (
              <div className='flex items-center gap-2 flex-col'>
                <span className='text-sm text-gray-500'>
                  Bạn chưa nhận được mã?
                </span>
                {isResendCountdownFinished ? (
                  <Button
                    variant='ghost'
                    className='text-primary hover:text-primary/90'
                    onClick={handleResendOTP}
                  >
                    Thử lại
                  </Button>
                ) : (
                  <div className='text-sm text-gray-500'>
                    <span>Thử lại sau: </span>
                    <Countdown
                      timerEnd='2025-05-29T13:19:59.061Z'
                      timeZoneOffset={7}
                      onFinish={handleResendCountdownFinish}
                    />
                  </div>
                )}
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    )
  },
)

export default AuthOTPComponent

'use client'
import { Button, Input, cn } from '@social-media/atoms'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@social-media/molecules'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@social-media/organisms'
import Link from 'next/link'
import * as React from 'react'
import useForgotPassword from './useForgotPassword'

export interface IForgotPasswordProps {
  className?: string
}

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = ({
  className,
}) => {
  const { form, onSubmit, handleTryAgain } = useForgotPassword()

  return (
    <div
      className={cn('w-full max-w-md flex flex-col justify-center', className)}
    >
      {!form.formState.isSubmitSuccessful ? (
        <Card>
          <CardHeader className='text-center'>
            <CardTitle>Quên mật khẩu</CardTitle>
            <CardDescription>
              Vui lòng nhập địa chỉ email của bạn để nhận hướng dẫn đặt lại mật
              khẩu
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Nhập địa chỉ email của bạn'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full bg-red-400 hover:bg-red-500 text-white'
                >
                  Gửi liên kết đặt lại mật khẩu
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className='flex justify-center'>
            <p className='text-gray-600 text-sm'>
              Bạn đã nhớ mật khẩu?{' '}
              <Link
                href='/sign-in'
                className='text-red-400 hover:text-red-500 font-medium'
              >
                Đăng nhập ngay
              </Link>
            </p>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className='pt-6 text-center'>
            <div className='mb-5 flex justify-center'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5 13L9 17L19 7'
                    stroke='#10B981'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
            <CardTitle className='mb-3'>Kiểm tra email của bạn</CardTitle>
            <p className='text-gray-600 mb-6 leading-6'>
              Chúng tôi đã gửi mã xác thực đến{' '}
              <strong>{form.getValues('email')}</strong>. Vui lòng kiểm tra hộp
              thư của bạn.
            </p>
            <p className='text-gray-500 text-sm mb-5'>
              Không nhận được email? Kiểm tra thư mục spam hoặc
            </p>
            <Button
              type='button'
              onClick={handleTryAgain}
              className='bg-transparent hover:bg-gray-50 text-red-400 border border-red-400 border-solid'
            >
              Thử lại
            </Button>
          </CardContent>

          <CardFooter className='flex justify-center'>
            <Link
              href='/sign-in'
              className='text-gray-500 hover:text-gray-700 text-sm'
            >
              Quay lại đăng nhập
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default ForgotPassword


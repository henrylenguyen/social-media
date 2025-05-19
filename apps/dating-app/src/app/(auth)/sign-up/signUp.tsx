'use client'
import { Button, Checkbox, cn, Input } from '@social-media/atoms'
import {
  Card,
  CardContent,
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
  PasswordInput,
} from '@social-media/organisms'
import Link from 'next/link'
import * as React from 'react'
import useSignUp from './useSignUp'

interface ISignUpProps {
  className?: string
}

const SignUp: React.FunctionComponent<ISignUpProps> = ({ className }) => {
  const { form, onSubmit } = useSignUp()

  return (
    <div
      className={cn('w-full max-w-md flex flex-col justify-center', className)}
    >
      <Card>
        <CardHeader className='text-center'>
          <CardTitle>Đăng Ký</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='********'
                        requirements={{
                          minLength: 6,
                        }}
                        requirementLabels={[
                          'Tối thiểu 6 ký tự',
                          'Ít nhất 1 chữ cái viết hoa',
                          'Ít nhất 1 chữ cái viết thường',
                          'Ít nhất 1 số',
                          'Ít nhất 1 ký tự đặc biệt',
                        ]}
                        onStrengthChange={(strength) => {
                          console.log('strength:', strength)
                        }}
                        showStrengthIndicator={true}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='********'
                        showStrengthIndicator={false}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and conditions */}
              <div className='flex items-start space-x-2 pt-2'>
                <FormField
                  control={form.control}
                  name='terms'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 p-0'>
                      <FormControl>
                        <Checkbox
                          id='terms'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='leading-none'>
                        <label
                          className='text-xs text-gray-600 cursor-pointer'
                          htmlFor='terms'
                        >
                          Tôi đồng ý với{' '}
                          <Link
                            href='/terms'
                            className='text-red-400 hover:text-red-500 font-medium'
                          >
                            Điều khoản dịch vụ
                          </Link>{' '}
                          và{' '}
                          <Link
                            href='/privacy'
                            className='text-red-400 hover:text-red-500 font-medium'
                          >
                            Chính sách bảo mật
                          </Link>
                        </label>
                        <FormMessage className='mt-1' />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type='submit'
                className='w-full bg-red-400 hover:bg-red-500 text-white'
              >
                Đăng ký
              </Button>
            </form>
          </Form>

          {/* Social login options */}
          <div className='mt-4'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center mt-2'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-xs'>
                <span className='px-2 bg-white text-gray-500'>
                  Hoặc đăng ký với
                </span>
              </div>
            </div>

            <div className='mt-4 grid grid-cols-3 gap-2'>
              <button
                type='button'
                className='w-full py-1.5 px-2 border border-solid border-gray-300 rounded-md shadow-sm bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
              >
                Google
              </button>
              <button
                type='button'
                className='w-full py-1.5 px-2 border border-solid border-gray-300 rounded-md shadow-sm bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
              >
                Facebook
              </button>
              <button
                type='button'
                className='w-full py-1.5 px-2 border border-solid border-gray-300 rounded-md shadow-sm bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
              >
                Apple
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className='flex justify-center'>
          <p className='text-gray-600 text-xs'>
            Đã có tài khoản?{' '}
            <Link
              href='/sign-in'
              className='text-red-400 hover:text-red-500 font-medium'
            >
              Đăng nhập ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp

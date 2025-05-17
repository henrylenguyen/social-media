'use client'
import { Button, Checkbox, cn, Input } from '@social-media/atoms'
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
import useSignUp from './useSignUp'
interface ISignUpProps {
  className?: string
}

const SignUp: React.FunctionComponent<ISignUpProps> = ({ className }) => {
  const { form, onSubmit } = useSignUp()
  return (
    <div
      className={cn(
        'w-full h-full flex flex-col items-center justify-center gap-4',
        className,
      )}
    >
      <div className='w-full max-w-lg mx-auto  p-10  space-y-8 grid border border-border rounded-lg shadow-sm bg-white'>
        <div>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-800'>Đăng Ký</h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                      <Input
                        placeholder='********'
                        type='password'
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
                      <Input
                        placeholder='********'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col space-y-2'>
                <p className='text-sm text-gray-600'>Mật khẩu phải có: </p>
                <ul className='list-disc list-inside text-sm text-gray-600'>
                  <li>Tối thiểu 6 ký tự</li>
                  <li>Tối đa 20 ký tự</li>
                  <li>Ít nhất 1 chữ cái viết hoa</li>
                  <li>Ít nhất 1 chữ cái viết thường</li>
                  <li>Ít nhất 1 số</li>
                  <li>Ít nhất 1 ký tự đặc biệt</li>
                </ul>
              </div>
              {/* ============== Điều khoản dịch vụ ===================*/}
              <div>
                <FormField
                  control={form.control}
                  name='terms'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          id='terms'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <label className='ml-2 text-sm text-gray-600' htmlFor='terms'>
                  Tôi đồng ý với
                  <Link
                    href='/terms'
                    className='text-red-400 hover:text-red-500 font-medium'
                  >
                    Điều khoản dịch vụ
                  </Link>
                  và
                  <Link
                    href='/privacy'
                    className='text-red-400 hover:text-red-500 font-medium'
                  >
                    Chính sách bảo mật
                  </Link>
                </label>
              </div>
              <Button
                type='submit'
                className='w-full bg-red-400 hover:bg-red-500 text-white'
              >
                Đăng ký
              </Button>
            </form>
          </Form>
          {/* ============== Đăng ký với mạng xã hội ===================*/}
          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center mt-2'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>
                  Hoặc đăng ký với
                </span>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-3 gap-3'>
              <button
                type='button'
                className='w-full py-2 px-4 border border-solid border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
              >
                Google
              </button>
              <button
                type='button'
                className='w-full py-2 px-4 border border-solid border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
              >
                Facebook
              </button>
              <button
                type='button'
                className='w-full py-2 px-4 border border-solid border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
              >
                Apple
              </button>
            </div>
          </div>

          {/* ============== Đã có tài khoản? ===================*/}
          <div className='mt-6 text-center text-sm'>
            <p className='text-gray-600'>
              Đã có tài khoản?
              <Link
                href='/sign-in'
                className='text-red-400 hover:text-red-500 font-medium'
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Language Selector */}
      <div className='flex items-center justify-end w-full mt-6'>
        <button className='flex items-center px-3 py-2 text-sm text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50'>
          <span className='mr-2'>🌐</span>
          <span>Tiếng Việt</span>
        </button>
      </div>
    </div>
  )
}

export default SignUp

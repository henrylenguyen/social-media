'use client'
import { Button, cn, Input } from '@social-media/atoms'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@social-media/organisms'
import * as React from 'react'
import useSignIn from './useSignIn'

export interface ISignInProps {
  className?: string
}

const SignIn: React.FunctionComponent<ISignInProps> = ({ className }) => {
  const { form, onSubmit } = useSignIn()

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
            <h1 className='text-3xl font-bold text-gray-800'>Đăng nhập</h1>
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

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                <div className='text-sm'>
                  <a href='#' className='text-red-400 hover:text-red-500'>
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <Button
                type='submit'
                className='w-full bg-red-400 hover:bg-red-500 text-white'
              >
                Đăng nhập
              </Button>
            </form>
          </Form>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center mt-2'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>
                  Hoặc đăng nhập với
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

          <div className='mt-6 text-center text-sm'>
            <p className='text-gray-600'>
              Chưa có tài khoản?{' '}
              <a
                href='#'
                className='text-red-400 hover:text-red-500 font-medium'
              >
                Đăng ký ngay
              </a>
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

export default SignIn

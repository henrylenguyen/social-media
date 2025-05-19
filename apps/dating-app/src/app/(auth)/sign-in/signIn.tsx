'use client'
import { Button, cn, Input } from '@social-media/atoms'
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
} from '@social-media/organisms'
import Link from 'next/link'
import * as React from 'react'
import useSignIn from './useSignIn'

export interface ISignInProps {
  className?: string
}

const SignIn: React.FunctionComponent<ISignInProps> = ({ className }) => {
  const { form, onSubmit } = useSignIn()

  return (
    <div
      className={cn('w-full max-w-md flex flex-col justify-center', className)}
    >
      <Card>
        <CardHeader className='text-center'>
          <CardTitle>Đăng nhập</CardTitle>
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
                    className='ml-2 block text-xs text-gray-700'
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                <div className='text-xs'>
                  <Link
                    href='/forgot-password'
                    className='text-red-400 hover:text-red-500'
                  >
                    Quên mật khẩu?
                  </Link>
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

          <div className='mt-4'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center mt-2'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-xs'>
                <span className='px-2 bg-white text-gray-500'>
                  Hoặc đăng nhập với
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
            Chưa có tài khoản?{' '}
            <Link
              href='/sign-up'
              className='text-red-400 hover:text-red-500 font-medium'
            >
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn


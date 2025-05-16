"use client"
import { Button, Input } from '@social-media/atoms'
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default SignIn

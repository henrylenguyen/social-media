'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z
  .object({
    email: z.string().nonempty('Email không được để trống'),
    password: z.string().nonempty('Mật khẩu không được để trống'),
    rememberMe: z.boolean().optional(),
  })
  .required()

const useSignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  // 3. Return the form and submit handler.
  return {
    form,
    onSubmit,
  }
}

export default useSignIn

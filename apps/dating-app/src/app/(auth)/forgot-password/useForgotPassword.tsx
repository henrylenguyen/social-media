'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z
  .object({
    email: z
      .string()
      .nonempty('Email không được để trống')
      .email('Email không hợp lệ'),
  })
  .required()

const useForgotPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  const handleTryAgain = () => {
    console.log('Try Again clicked')
  }

  return {
    form,
    onSubmit,
    handleTryAgain,
  }
}

export default useForgotPassword

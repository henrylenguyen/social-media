'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Define interface for the form data
interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

// Define the Zod schema
const formSchema: z.ZodType<SignUpFormData> = z
  .object({
    email: z
      .string()
      .nonempty('Email không được để trống')
      .email('Email không hợp lệ'),
    password: z
      .string()
      .nonempty('Mật khẩu không được để trống')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(20, 'Mật khẩu không được quá 20 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Mật khẩu phải có ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt',
      ),
    confirmPassword: z
      .string()
      .nonempty('Nhập lại mật khẩu không được để trống'),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Bạn phải đồng ý với điều khoản dịch vụ',
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  })

const useSignUp = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  // 2. Define a submit handler.
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

export default useSignUp

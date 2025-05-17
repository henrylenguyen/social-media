'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLayoutEffect, useState } from 'react'
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
    password: z.string().nonempty('Mật khẩu không được để trống'),
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
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })
  const { watch, setError, clearErrors } = form

  // Sử dụng useLayoutEffect để theo dõi sự thay đổi của password, vì useLayoutEffect sẽ tối ưu hơn 
  useLayoutEffect(() => {
    const password = watch('password')
    const length = password.length >= 6
    const uppercase = /[A-Z]/.test(password)
    const lowercase = /[a-z]/.test(password)
    const number = /\d/.test(password)
    const specialChar = /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?\\~`]/.test(password)
    setPasswordStrength({
      length,
      uppercase,
      lowercase,
      number,
      specialChar,
    })
    if (!length || !uppercase || !lowercase || !number || !specialChar) {
      setError('password', {
        type: 'manual',
        message: 'Mật khẩu chưa đúng định dạng yêu cầu!',
      })
    } else {
      clearErrors('password')
    }
    return () => {
      setPasswordStrength({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
      })
    }
  }, [clearErrors, setError, watch])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return {
    form,
    onSubmit,
    passwordStrength,
  }
}

export default useSignUp

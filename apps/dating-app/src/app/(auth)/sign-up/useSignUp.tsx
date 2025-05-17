'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Define interface for the form data
interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

// Password validation requirements
const passwordRequirements = {
  minLength: 6,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?\\~`]/,
}

// Define the basic schema WITHOUT any validation messages
const formSchema = z
  .object({
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    terms: z.boolean(),
  })
  // Step 1: Email validation
  .superRefine((data, ctx) => {
    // Check if email is empty first
    if (!data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email không được để trống',
        path: ['email'],
      })
      // Don't check other fields if email is missing
      return
    }

    // Only validate email format if email is provided
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email không hợp lệ',
        path: ['email'],
      })
      // Stop here if email format is invalid
      return
    }
  })
  // Step 2: Password validation - only proceeds if email is valid
  .superRefine((data, ctx) => {
    // Skip password validation if email is not valid yet
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return
    }

    // Check if password is empty
    if (!data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu không được để trống',
        path: ['password'],
      })
      return
    }

    // Sequential password requirements validation
    if (data.password.length < passwordRequirements.minLength) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu phải có ít nhất 6 ký tự',
        path: ['password'],
      })
      return
    }

    if (!passwordRequirements.hasUppercase.test(data.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu phải có ít nhất 1 chữ cái viết hoa',
        path: ['password'],
      })
      return
    }

    if (!passwordRequirements.hasLowercase.test(data.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu phải có ít nhất 1 chữ cái viết thường',
        path: ['password'],
      })
      return
    }

    if (!passwordRequirements.hasNumber.test(data.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu phải có ít nhất 1 số',
        path: ['password'],
      })
      return
    }

    if (!passwordRequirements.hasSpecialChar.test(data.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
        path: ['password'],
      })
      return
    }
  })
  // Step 3: Confirm password - only proceeds if password is valid
  .superRefine((data, ctx) => {
    // Skip confirm password validation if email or password is not valid yet
    if (
      !data.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      !data.password ||
      data.password.length < passwordRequirements.minLength ||
      !passwordRequirements.hasUppercase.test(data.password) ||
      !passwordRequirements.hasLowercase.test(data.password) ||
      !passwordRequirements.hasNumber.test(data.password) ||
      !passwordRequirements.hasSpecialChar.test(data.password)
    ) {
      return
    }

    // Check if confirmPassword is empty
    if (!data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Nhập lại mật khẩu không được để trống',
        path: ['confirmPassword'],
      })
      return
    }

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword'],
      })
      return
    }
  })
  // Step 4: Terms checkbox - only proceeds if all other fields are valid
  .superRefine((data, ctx) => {
    // Skip terms validation if any previous field is invalid
    if (
      !data.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      !data.password ||
      data.password.length < passwordRequirements.minLength ||
      !passwordRequirements.hasUppercase.test(data.password) ||
      !passwordRequirements.hasLowercase.test(data.password) ||
      !passwordRequirements.hasNumber.test(data.password) ||
      !passwordRequirements.hasSpecialChar.test(data.password) ||
      !data.confirmPassword ||
      data.password !== data.confirmPassword
    ) {
      return
    }

    // Check if terms is not checked
    if (data.terms === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải đồng ý với điều khoản dịch vụ',
        path: ['terms'],
      })
    }
  })

const useSignUp = () => {
  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    showIndicator: false,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    mode: 'onSubmit', // Chỉ validate khi submit
    shouldFocusError: true,
  })

  const { watch, formState } = form
  const { touchedFields, dirtyFields } = formState
  const password = watch('password')

  // Update password strength when password changes
  useEffect(() => {
    // Only show indicators if password field is dirty or touched
    if (dirtyFields.password || touchedFields.password) {
      setPasswordStrength({
        length: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?\\~`]/.test(password),
        showIndicator: true,
      })
    }
  }, [password, touchedFields.password, dirtyFields.password])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values
    console.log(values)
  }

  return {
    form,
    onSubmit,
    passwordStrength,
  }
}

export default useSignUp

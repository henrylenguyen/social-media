import { useState } from 'react'

const useAuthOTP = () => {
  const [isFinished, setIsFinished] = useState(false)
  return {
    isFinished,
    setIsFinished,
  }
}

export default useAuthOTP

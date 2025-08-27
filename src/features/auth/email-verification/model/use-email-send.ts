import { useState } from 'react'

export interface UseEmailSendOptions {
  onSendCode?: ((email: string) => Promise<void>) | undefined
}

export const useEmailSend = ({ onSendCode }: UseEmailSendOptions = {}) => {
  const [isSending, setIsSending] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)

  const sendCode = async (email: string) => {
    if (!onSendCode || !email) return
    setIsSending(true)
    try {
      await onSendCode(email)
      setIsCodeSent(true)
    } finally {
      setIsSending(false)
    }
  }

  const getButtonText = () => {
    if (isSending) return 'Sending...'
    if (isCodeSent) return 'Sent'
    return 'Send'
  }

  return {
    isSending,
    isCodeSent,
    sendCode,
    getButtonText,
    resetCodeSent: () => setIsCodeSent(false),
  }
}

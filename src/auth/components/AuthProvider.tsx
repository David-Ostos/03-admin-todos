'use client'

import { SessionProvider } from "next-auth/react"

interface Props{
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AuthProvider = ({children, ...rest }:Props) => {

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

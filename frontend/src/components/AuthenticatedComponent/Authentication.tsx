import React from 'react'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'

export function Authenticate ({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    
      <Component {...pageProps}></Component>
    </SessionProvider>
  )
}

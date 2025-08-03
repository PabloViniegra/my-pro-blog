'use client'

import { SignIn } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'

export default function SignInPage() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <SignIn
        appearance={{
          variables: {
            fontFamily: 'var(--font-sans)',
            fontFamilyButtons: 'var(--font-mono)',
            fontWeight: { normal: 'normal', medium: 'normal', bold: 'normal' },
            colorPrimary: 'var(--primary)',
            colorPrimaryForeground: 'var(--primary-foreground)'
          },
          theme: shadcn
        }}
        signUpUrl='/signup'
        fallbackRedirectUrl='/'
      />
    </div>
  )
}

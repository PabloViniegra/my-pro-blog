'use client'

import { SignUp } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <SignUp
        appearance={{
          variables: {
            fontFamily: 'var(--font-sans)',
            fontFamilyButtons: 'var(--font-mono)',
            fontWeight: { normal: 'normal', medium: 'normal', bold: 'normal' },
            colorPrimary: 'var(--primary)',
            colorPrimaryForeground: 'var(--primary-foreground)'
          },
          theme: shadcn,
          elements: {
            card: 'bg-background text-foreground border border-border shadow-sm',
            headerTitle: 'text-foreground font-heading text-2xl font-bold',
            headerSubtitle: 'text-muted-foreground text-sm',
            socialButtonsBlockButton:
              'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            dividerLine: 'bg-border',
            dividerText: 'text-muted-foreground',
            formFieldLabel: 'text-foreground text-sm font-medium',
            formFieldInput:
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            formButtonPrimary:
              'bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
            footerActionText: 'text-muted-foreground text-sm',
            footerActionLink: 'text-primary hover:underline',
            formFieldWarningText: 'text-destructive text-sm',
            formFieldSuccessText: 'text-green-600 text-sm',
            otpCodeFieldInput: 'h-10 w-10 text-center text-lg font-mono',
            otpCodeFieldInputs: 'flex gap-2',
            otpCodeFieldResendButton: 'text-primary hover:underline text-sm',
            otpCodeFieldResendButtonText: 'text-muted-foreground text-sm',
            otpCodeFieldErrorText: 'text-destructive text-sm',
            otpCodeFieldSuccessText: 'text-green-600 text-sm',
            formHeaderTitle: 'text-2xl font-bold tracking-tight',
            formHeaderSubtitle: 'text-sm text-muted-foreground',
            formFieldAction: 'text-sm text-muted-foreground hover:text-primary',
            footerActionLink__signIn: 'text-primary hover:underline',
            footerActionText__signIn: 'text-muted-foreground',
            formResendCodeLink: 'text-primary hover:underline',
            identityPreviewEditButton: 'text-primary hover:text-primary/80',
            badge: 'bg-secondary text-secondary-foreground',
            footerAction: 'mt-6 text-center text-sm'
          }
        }}
        fallbackRedirectUrl="/"
        signInUrl="/signin"
      />
    </div>
  )
}

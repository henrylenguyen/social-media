import '@social-media/styles'

export const metadata = {
  title: 'Welcome to dating-app',
  description: 'Generated by create-nx-workspace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}

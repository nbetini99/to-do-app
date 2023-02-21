import Aside from './aside'
import './globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <head />
      <body className='h-full'>
        <div className='w-full flex h-full'>
          <div className='h-full bg-slate-50 w-72'>
            <Aside />
          </div>
          <div className='flex-1'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

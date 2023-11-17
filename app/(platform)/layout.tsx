import { FC } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

interface LayoutProps {children: React.ReactNode}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
)}

export default Layout
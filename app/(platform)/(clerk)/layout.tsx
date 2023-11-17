import { FC, ReactNode } from 'react'

interface LayoutProps {children: ReactNode}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <div className='h-full flex items-center justify-center'>
      {children}
    </div>
)}

export default Layout
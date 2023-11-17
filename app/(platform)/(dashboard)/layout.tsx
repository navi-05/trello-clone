import { FC } from 'react'

import Navbar from './_components/Navbar'

interface LayoutProps {children: React.ReactNode}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <div className='h-full'>
      <Navbar />
      {children}
    </div>
)}
    
export default Layout
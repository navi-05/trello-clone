import { FC } from 'react'

import { OrgControl } from './_components/org-control'

interface LayoutProps {children: React.ReactNode}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
)}

export default Layout
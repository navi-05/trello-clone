'use client'

import { Menu } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import Sidebar from './Sidebar'

interface MobileSidebarProps {}

const MobileSidebar: FC<MobileSidebarProps> = ({}) => {

  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const onOpen = useMobileSidebar((state) => state.onOpen)
  const onClose = useMobileSidebar((state) => state.onClose)
  const isOpen = useMobileSidebar((state) => state.isOpen)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if(!isMounted) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        className='block md:hidden mr-2'
        variant="ghost"
        size="sm"
      >
        <Menu className='h-4 w-4' />
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent
          side='left'
          className='p-2 pt-10'
        >
          <Sidebar
            storageKey='t-sidebar-mobile-state'
          />
        </SheetContent>
      </Sheet>
    </>
  )}

export default MobileSidebar
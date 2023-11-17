'use client'

import { FC } from 'react'
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';

import { NavItem, organization } from './NavItem';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';


interface SidebarProps {
  storageKey?: string;
}

const Sidebar: FC<SidebarProps> = ({ storageKey = "t-sidebar-state" }) => {

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

  const { 
    organization: activeOrganization,
    isLoaded: isLoadedOrg
  } = useOrganization()

  const { 
    userMemberships,
    isLoaded: isLoadedOrgList
  } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  })

  const defaultAccordianValue: string[] = 
    Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      if(expanded[key]) {
        acc.push(key)
      }
      return acc;
  }, [])

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id]
    }))
  }

  if(!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
      <div className='flex items-center justify-between mb-2'>
        <Skeleton className="h-10 w-[50%]" />
        <Skeleton className='h-10 w-10 ' />
      </div>
      <div className='space-y-2'>
        <NavItem.Skeleton />
        <NavItem.Skeleton />
        <NavItem.Skeleton />
      </div>
      </>
    )
  }

  return (
    <>
      <div className='font-medium text-xs flex items-center mb-1'>
        <span className='pl-4'>
          Workspaces
        </span>
        <Button 
          size='icon'
          type='button'
          className='ml-auto'
          variant='ghost'
          asChild
        >
          <Link href="/select-org">
            <Plus
              className='h-4 w-4'
            />
          </Link>
        </Button>
      </div>

      <Accordion
        type='multiple'
        defaultValue={defaultAccordianValue}
        className='space-y-2'
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem 
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
)}

export default Sidebar
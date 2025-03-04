"use client"
import { OrganizationSwitcher, SignedIn, useOrganization, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function OrgSwitch() {
    const {isLoaded} = useOrganization();
    const {isLoaded: isUserLoaded} = useUser();
    const pathname = usePathname();

    if(!isLoaded || !isUserLoaded){
        return null;
    }
  return (
    <div className='border border-gray-300 py-2 px-2 rounded-xl'>
      <SignedIn>
        <OrganizationSwitcher 
        hidePersonal
        afterCreateOrganizationUrl="/organization/:slug"
        afterSelectOrganizationUrl="/organization/:slug"
        createOrganizationMode={
            pathname === "/onboarding" ? "navigation" : "modal"
        }
        createOrganizationUrl="/onboarding"
        appearance={{
            elements:{
                organizationSwitcherTrigger:"border border-gray-300 rounded-md px-5 py-5",
                organizationSwitcherTriggerIcon:"text-white"
            }
        }}
        />
      </SignedIn>
    </div>
  )
}

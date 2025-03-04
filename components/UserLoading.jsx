"use client"
import { useOrganizationList, useUser } from '@clerk/nextjs'
import React from 'react'
import { PropagateLoader } from 'react-spinners';

export default function UserLoading() {
  const {isLoaded} = useOrganizationList();
  const {isLoaded:isUserLoaded} = useUser();
  if(!isLoaded || !isUserLoaded) {
    return <PropagateLoader className='mb-4' color='#36d7b7' width={"100%"} />
  }
  return null;
}

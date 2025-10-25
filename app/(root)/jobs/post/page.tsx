import JobForm from '@/components/forms/JobForm'
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Post a Job | Dev Overflow',
  description: 'Post your job opening and find the perfect candidate for your team.'
}

const Page = async () => {
  const { userId } = await auth();

  if(!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Post a Job</h1>
      <div className='mt-9'>
        <JobForm mongoUserId={JSON.stringify(mongoUser._id)}/>
      </div>
    </div>
  )
}

export default Page

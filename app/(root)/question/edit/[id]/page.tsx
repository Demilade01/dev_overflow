import Questions from '@/components/forms/Questions'
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs/server'
import { useParams } from 'next/navigation';
import React from 'react'

const Page = async ({ params }: ParamsProps) => {
  const { userId } = await auth();

  if(!userId) return null;

  const mongoUser = await getUserById({ userId })
  const result = await getQuestionById({ questionId: params.id})

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Edit Question</h1>

      <div className='mt-9'>
        <Questions
          type='Edit'
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  )
}

export default Page
import { getUserAnswers, getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'
import QuestionCard from '../cards/QuestionCard';
import AnswerCard from '../cards/AnswerCard';

interface Props extends SearchParamsProps {
  clerkId?: string | null;
  userId: string;
}
const AnswersTab = async ({ searchParams, clerkId, userId }: Props ) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  })

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  )
}

export default AnswersTab
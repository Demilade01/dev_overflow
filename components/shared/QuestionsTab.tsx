import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'
import QuestionCard from '../cards/QuestionCard';
import Pagination from './Pagination';

interface Props extends SearchParamsProps {
  clerkId?: string | undefined;
  userId: string;
}

const QuestionsTab = async ({ searchParams, clerkId, userId  }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  })

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
       />
      ))}

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextQuestions}
        />
      </div>
    </>

  )
}

export default QuestionsTab
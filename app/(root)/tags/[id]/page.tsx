import QuestionCard from '@/components/cards/QuestionCard';
import NoResult from '@/components/shared/NoResult';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { IQuestion } from '@/database/question.model';
import { getQuestionsByTagId } from '@/lib/actions/tag.actions';
import { URLProps } from '@/types';
import React from 'react'

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>{result.tagTitle}</h1>

      <div className='mt-11 w-full'>
        <LocalSearchbar
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search tag questions'
          otherClasses='flex-1'
        />
      </div>

      <div className='mt-10 flex w-full flex-col gap-6'>
        {/* looping through questions */}
        { result.questions.length > 0 ?
          result.questions.map((question: IQuestion) => (
             <QuestionCard
              // @ts-ignore
              key={question._id} // @ts-ignore
              _id={question._id}// @ts-ignore
              title={question.title} // @ts-ignore
              tags={question.tags}// @ts-ignore
              author={question.author} // @ts-ignore
              upvotes={question.upvotes} // @ts-ignore
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
             />
         ))
         : <NoResult
            title='There’s no saved question to show'
            description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. your query could be the next big thing others learn from. Get involved! 💡'
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        }
      </div>
    </>
  )
}

export default Page
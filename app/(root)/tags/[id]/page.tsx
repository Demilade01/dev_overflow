import QuestionCard from '@/components/cards/QuestionCard';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { getQuestionsByTagId } from '@/lib/actions/tag.actions';
import { URLProps } from '@/types';
import React from 'react'
interface IQuestion {
  _id: string;
  title: string;
  tags: { _id: string, name: string }[];
  author: { _id: string; name: string; picture: string };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tags | Dev Overflow',
}

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>{result.tagTitle}</h1>

      <div className='mt-11 w-full'>
        <LocalSearchbar
          route={`/tags/${params.id}`}
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
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              // @ts-ignore
              author={question.author}
              upvotes={question.upvotes}
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

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  )
}

export default Page
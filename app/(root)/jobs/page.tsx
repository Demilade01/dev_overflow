import JobCard from '@/components/cards/JobCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { Button } from '@/components/ui/button'
import { JobFilters } from '@/constants/filter'
import { getJobs } from '@/lib/actions/job.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs/server'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jobs | Dev Overflow',
  description: 'Find your next career opportunity in tech. Browse developer jobs, internships, and freelance positions from top companies worldwide.'
}

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = await auth()

  const result = await getJobs({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1
  })

  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Jobs</h1>

        <Link href='/jobs/post' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
            Post a Job
          </Button>
        </Link>
      </div>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchbar
          route='/jobs'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for jobs, companies, or locations'
          otherClasses='flex-1'
        />

        <Filter
          filters={JobFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className='mt-10 flex w-full flex-col gap-6'>
        {result.jobs.length > 0 ? (
          result.jobs.map((job) => (
            <JobCard
              key={job._id}
              clerkId={userId || undefined}
              _id={job._id}
              title={job.title}
              company={job.company}
              companyLogo={job.companyLogo}
              location={job.location}
              type={job.type}
              salary={job.salary}
              description={job.description}
              requirements={job.requirements}
              benefits={job.benefits}
              tags={job.tags}
              author={job.author}
              applicants={job.applicants}
              views={job.views}
              createdAt={job.createdAt}
              applicationDeadline={job.applicationDeadline}
            />
          ))
        ) : (
          <NoResult
            title='No jobs found'
            description='Be the first to post a job opportunity! 🚀 Share your opening and help developers find their next career move. Get started! 💼'
            link="/jobs/post"
            linkTitle="Post a Job"
          />
        )}
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

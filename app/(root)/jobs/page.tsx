import JobCard from '@/components/cards/JobCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { Button } from '@/components/ui/button'
import { JobFilters } from '@/constants/filter'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs/server'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jobs | Dev Overflow',
  description: 'Find your next career opportunity in tech. Browse developer jobs, internships, and freelance positions from top companies worldwide.'
}

// Mock data for demonstration - in a real app, this would come from a database
const mockJobs = [
  {
    _id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    companyLogo: '/assets/images/default-logo.svg',
    location: 'San Francisco, CA',
    type: 'full-time' as const,
    salary: '$120k - $150k',
    description: 'We are looking for an experienced React developer to join our growing team. You will be responsible for building user-facing features and reusable components.',
    requirements: ['5+ years React experience', 'TypeScript knowledge', 'Redux/Context API', 'Testing frameworks'],
    benefits: ['Health insurance', '401k matching', 'Remote work', 'Learning budget'],
    tags: [
      { _id: '1', name: 'React' },
      { _id: '2', name: 'TypeScript' },
      { _id: '3', name: 'JavaScript' }
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      picture: '/assets/images/avatar.svg',
      clerkId: 'user_123'
    },
    applicants: ['user1', 'user2', 'user3'],
    views: 245,
    createdAt: new Date('2024-01-15'),
    applicationDeadline: new Date('2024-02-15')
  },
  {
    _id: '2',
    title: 'Frontend Developer Intern',
    company: 'StartupXYZ',
    companyLogo: '/assets/images/default-logo.svg',
    location: 'New York, NY',
    type: 'internship' as const,
    salary: '$25/hour',
    description: 'Perfect opportunity for students or recent graduates to gain real-world experience in frontend development.',
    requirements: ['Basic HTML/CSS/JS', 'React fundamentals', 'Git knowledge'],
    benefits: ['Mentorship program', 'Flexible hours', 'Potential full-time offer'],
    tags: [
      { _id: '4', name: 'HTML' },
      { _id: '5', name: 'CSS' },
      { _id: '6', name: 'JavaScript' }
    ],
    author: {
      _id: '2',
      name: 'Jane Smith',
      picture: '/assets/images/avatar.svg',
      clerkId: 'user_456'
    },
    applicants: ['user4', 'user5'],
    views: 89,
    createdAt: new Date('2024-01-20'),
    applicationDeadline: new Date('2024-02-20')
  },
  {
    _id: '3',
    title: 'Full Stack Developer',
    company: 'RemoteTech',
    companyLogo: '/assets/images/default-logo.svg',
    location: 'Remote',
    type: 'contract' as const,
    salary: '$80 - $100/hour',
    description: 'Join our distributed team as a full-stack developer working on cutting-edge web applications.',
    requirements: ['Node.js', 'React', 'MongoDB', 'AWS', 'Docker'],
    benefits: ['Fully remote', 'Flexible schedule', 'Competitive rate'],
    tags: [
      { _id: '7', name: 'Node.js' },
      { _id: '8', name: 'MongoDB' },
      { _id: '9', name: 'AWS' }
    ],
    author: {
      _id: '3',
      name: 'Mike Johnson',
      picture: '/assets/images/avatar.svg',
      clerkId: 'user_789'
    },
    applicants: ['user6', 'user7', 'user8', 'user9'],
    views: 156,
    createdAt: new Date('2024-01-18'),
    applicationDeadline: new Date('2024-02-18')
  }
]

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = await auth()

  // In a real app, you would fetch jobs from your database
  // const result = await getJobs({
  //   searchQuery: searchParams.q,
  //   filter: searchParams.filter,
  //   page: searchParams.page ? +searchParams.page : 1
  // })

  // For now, we'll use mock data
  const result = {
    jobs: mockJobs,
    isNext: false
  }

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

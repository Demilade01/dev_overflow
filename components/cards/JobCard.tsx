import Link from 'next/link';
import React from 'react'
import { Badge } from '@/components/ui/badge';
import Metric from '../shared/Metric';
import { formatLargeNumber, getTimestamp } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';
import Image from 'next/image';

interface Props {
  clerkId?: string;
  _id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: { _id: string, name: string }[];
  author: { _id: string, name: string, picture: string, clerkId: string };
  applicants: string[];
  views: number;
  createdAt: Date;
  applicationDeadline?: Date;
}

const JobCard = ({
  clerkId,
  _id,
  title,
  company,
  companyLogo,
  location,
  type,
  salary,
  description,
  requirements,
  benefits,
  tags,
  author,
  applicants,
  views,
  createdAt,
  applicationDeadline
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  const isExpired = applicationDeadline && new Date(applicationDeadline) < new Date();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'part-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'contract': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'internship': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className='card-wrapper p-6 sm:px-8 rounded-[10px] mt-5'>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div className='flex-1'>
          <div className='flex items-center gap-3 mb-2'>
            {companyLogo && (
              <Image
                src={companyLogo}
                alt={`${company} logo`}
                width={40}
                height={40}
                className='rounded-lg object-cover'
              />
            )}
            <div>
              <h3 className='h3-semibold text-dark200_light900 line-clamp-1'>{title}</h3>
              <p className='body-regular text-dark500_light500'>{company}</p>
            </div>
          </div>

          <div className='flex items-center gap-2 mb-3'>
            <Badge className={getTypeColor(type)}>
              {type.replace('-', ' ').toUpperCase()}
            </Badge>
            {salary && (
              <Badge variant="outline" className='text-green-600 border-green-600'>
                {salary}
              </Badge>
            )}
            {isExpired && (
              <Badge variant="destructive">
                EXPIRED
              </Badge>
            )}
          </div>

          <p className='body-regular text-dark500_light500 mb-3 line-clamp-2'>
            {description}
          </p>

          <div className='flex items-center gap-4 text-sm text-dark400_light700 mb-3'>
            <span className='flex items-center gap-1'>
              <Image src="/assets/icons/location.svg" alt="location" width={16} height={16} />
              {location}
            </span>
            <span className='flex items-center gap-1'>
              <Image src="/assets/icons/calendar.svg" alt="posted" width={16} height={16} />
              {getTimestamp(createdAt)}
            </span>
            {applicationDeadline && (
              <span className='flex items-center gap-1'>
                <Image src="/assets/icons/clock.svg" alt="deadline" width={16} height={16} />
                Apply by {getTimestamp(applicationDeadline)}
              </span>
            )}
          </div>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction
              type="Job"
              itemId={JSON.stringify(_id)}
            />
          )}
        </SignedIn>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        {tags.slice(0, 4).map((tag) => (
          <Badge key={tag._id} variant="secondary" className='text-xs'>
            {tag.name}
          </Badge>
        ))}
        {tags.length > 4 && (
          <Badge variant="secondary" className='text-xs'>
            +{tags.length - 4} more
          </Badge>
        )}
      </div>

      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` | posted ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium px-2 text-dark400_light700"
        />

        <div className='flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start'>
          <Metric
            imgUrl="/assets/icons/users.svg"
            alt="Applicants"
            value={formatLargeNumber(applicants.length)}
            title="Applicants"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Views"
            value={formatLargeNumber(views)}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>

      <div className='mt-4 flex gap-2'>
        <Link
          href={`/jobs/${_id}`}
          className='flex-1 text-center py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
        >
          View Details
        </Link>
        <Link
          href={`/jobs/${_id}/apply`}
          className='flex-1 text-center py-2 px-4 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors'
        >
          Apply Now
        </Link>
      </div>
    </div>
  )
}

export default JobCard

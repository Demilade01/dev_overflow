import { formatLargeNumber } from '@/lib/utils';
import React from 'react'
import StatsCard from '../cards/StatsCard';
import { BadgeCounts } from '@/types';

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputation: number;
}

const Stats = ({ totalQuestions, totalAnswers, badges, reputation }: Props) => {
  return (
    <div className='mt-10'>
      <h4 className='h3-semibold text-dark200_light900'>Stats - {reputation}</h4>

      <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
        <div className='light-border background-light900 flex flex-wrap justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {formatLargeNumber(totalQuestions)}
            </p>
            <p className='body-medium text-dark400_light700'>Questions</p>
          </div>
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {formatLargeNumber(totalAnswers)}
            </p>
            <p className='body-medium text-dark400_light700'>Answers</p>
          </div>
        </div>

        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
        />

        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badges"
        />

        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  )
}

export default Stats
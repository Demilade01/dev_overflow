import Image from 'next/image';
import React from 'react'

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title}: StatsCardProps ) => {
  return (
    <div className='light-border background-light900 flex flex-wrap justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
      <Image
        src={imgUrl}
        alt={title}
        width={40}
        height={50}
      />
      <div>
        <p className='paragraph-semibold text-dark200_light900'>
          {value}
        </p>
        <p className='body-medium text-dark400_light700'>{title}</p>
        </div>
    </div>
  )
}

export default StatsCard
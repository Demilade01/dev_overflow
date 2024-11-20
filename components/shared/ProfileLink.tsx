import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface ProfileLinkProps {
  href?: string;
  imgUrl: string;
  title: string;
}

const ProfileLink = ({ href, imgUrl, title }: ProfileLinkProps) => {
  return (
    <div className='flex-center gap-1'>
      <Image
        src={imgUrl}
        alt="icon"
        width={20}
        height={20}
      />

      {href ? (
        <Link href={href} target='_blank' className='text-accent-blue paragraph-medium'>
          {title}
        </Link>
      ): (
        <p className='paragraph-medium text-dark400_light700'>
          {title}
        </p>
      )}
    </div>
  )
}

export default ProfileLink
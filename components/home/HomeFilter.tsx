"use client"

import { HomePageFilters } from '@/constants/filter'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState('')
  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className='mt-10 flex-wrap gap-3 md:flex md:gap-5'>
      {HomePageFilters.map((item) => (
        <Button key={item.value} className={`body-medium rounded=-lg px-6 py-3 capitalize shadow-none ${active === item.value ? 'bg-primary-100 text-primary-500 dark:text-primary-100 dark:bg-dark-300' : 'bg-light-800 text-light-500 dark:bg-dark-300 dark:hover:bg-dark-300' }`}
        onClick={() => handleTypeClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilter
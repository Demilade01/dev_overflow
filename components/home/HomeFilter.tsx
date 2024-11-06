"use client"

import { HomePageFilters } from '@/constants/filter'
import React from 'react'
import { Button } from '../ui/button'

const HomeFilter = () => {
  const active = 'recommended';

  return (
    <div className='mt-10 flex-wrap gap-3 md:flex md:gap-5'>
      {HomePageFilters.map((item) => (
        <Button key={item.value} onClick={() => {}} className={`body-medium rounded=-lg px-6 py-3 capitalize shadow-none ${active === item.value ? 'bg-primary-100 text-primary-500 dark:text-primary-100 dark:bg-dark-300' : 'bg-light-800 text-light-500 dark:bg-dark-300 dark:hover:bg-dark-300' }`}>
          {item.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilter
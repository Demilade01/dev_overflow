"use client"

import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';


interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  const searchParamss = useSearchParams();
  const router = useRouter();

  const paramfilter = searchParamss.get('filter') || '' ;

  const handleupdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParamss.toString(),
      key: 'filter',
      value
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleupdateParams}
        defaultValue={paramfilter || undefined}
      >
        <SelectTrigger className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 `}>

          <div className='line-clamp-1 flex-1 text-left'>
           <SelectValue placeholder="Select a Filter" />

          </div>
        </SelectTrigger>
        <SelectContent className='text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300'>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value} className='focus:bg-light-800 dark:focus:bg-dark-400 cursor-pointer'>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filter
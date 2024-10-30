import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { SignedOut } from '@clerk/nextjs'
import { Button } from '../ui/button'

const Navcontent = () => {
  return (
    <h1>yooo</h1>
  )
}

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt='Menu'
          width={36}
          height={36}
          className='invert-colors sm:hidden'
        />
      </SheetTrigger>
      <SheetContent side="left" className='background-light900_dark200 border-none'>
        <Link href="/" className='flex items-center gap-1'>
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt='devflow logo'
          />

          <p className='h2-bold text-dark100_light900 font-spaceGrotesk'>Dev <span className='text-primary-500'>Overflow</span></p>
        </Link>

        <div>
          <SheetClose asChild>
            <Navcontent />
          </SheetClose>

          <SignedOut>
            <div className='flex flex-col gap-3'>
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                  <span className='primary-text-gradient'>Log In</span>
                </Button>
              </Link>
            </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav